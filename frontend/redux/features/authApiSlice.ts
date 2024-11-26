import { list } from 'postcss';
import { apiSlice } from '../services/apiSlice';
import { setAuth } from './authSlice';
// import { CategoryType } from '@/types/categories';

interface User {
	first_name: string;
	last_name: string;
	email: string;
}

interface Category {
  
	id: number; 
	category_name: string;
	is_active: boolean;        // Add the active status field
  	created_at: string;        // Add the created timestamp
  	modified_at: string;
}

interface Brand {
	id: number; 
	brand_name: string;
	is_active: boolean;        // Add the active status field
  	created_at: string;        // Add the created timestamp
  	modified_at: string;
}

interface Model {
	id: number; 
	model_name: string;
	brandid: number;
	is_active: boolean;        // Add the active status field
  	created_at: string;        // Add the created timestamp
  	modified_at: string;
}

interface Color {
	id: number; 
	color_name: string;
	is_active: boolean;        // Add the active status field
  	created_at: string;        // Add the created timestamp
  	modified_at: string;
}

interface Subcategory{
	id: number; 
	categoryid: number;
	category_name: string;
	subcategory_name: string;
	is_active: boolean;        // Add the active status field
  	created_at: string;        // Add the created timestamp
  	modified_at: string;
}

interface Childcategory{
	id: number; 
	categoryid: number;
	subcategoryid: number;
	category_name: string;
	subcategory_name: string;
	childcategory_name: string;
	is_active: boolean;        // Add the active status field
  	created_at: string;        // Add the created timestamp
  	modified_at: string;
}

interface Size{
	id: number; 
	categoryid: number;
	subcategoryid: number;
    childcategoryid: number;
	category_name: string;
	subcategory_name: string;
	childcategory_name: string;
    size_name: string;
	is_active: boolean;        // Add the active status field
    created_at: string;        // Add the created timestamp
    modified_at: string;
}

interface SocialAuthArgs {
	provider: string;
	state: string;
	code: string;
}

interface CreateUserResponse {
	success: boolean;
	user: User;
}

interface Product {
	id: number;
	product_name: string;
	product_type: string;
	product_description: string;
	product_code: string;
	product_image: File | null;
	quantity: number;
	price: number;
	slug: string;
	is_active: boolean;
	created_at: string;        // Add the created timestamp
    modified_at: string;
	category: number;
	category_name: string;
	sub_category: number;
	subcategory_name: string;
	child_category: number;
	childcategory_name: string;
	brand: number;
	brand_name: string;
	model: number;
	model_name: string;
	colors: number[] | null;
	color_names: string;
	sizes: number[] | null;
	size_names: string;
	additionalImages: FileList | null;

}

interface ProductImage {
	id: number;
	additionalImages: FileList | null;
	product?: number;
	alt_text: string;
}

interface UpdateStock {
	id: number;
	quantity: number;
}

interface OrderItem {
	id: number;
	product: number;
	product_name: string;
	product_image: string | null;
	quantity: number;
	price: number;
	total_price: number;
}

interface UserOrder {
	id: number;
	user: number;
	user_name: string;
	user_phone: string;
	payment_status: string;
	amount_paid: number;
	total_amount: number;
	delivery_status: string;
	created_at: string; 
 	items: OrderItem[];
}

// Incentives - Coupon

interface Coupon {
	id: number;
	coupon: number;
    commision: number;
    minumum_amount: number;
    is_active : boolean;
    created_at : string;
    expiry_at : string | null;
    modified_at : string;

}

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		retrieveUser: builder.query<User, void>({
			query: () => '/users/me/',
		}),
		socialAuthenticate: builder.mutation<
			CreateUserResponse,
			SocialAuthArgs
		>({
			query: ({ provider, state, code }) => ({
				url: `/o/${provider}/?state=${encodeURIComponent(
					state
				)}&code=${encodeURIComponent(code)}`,
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}),
		}),
		login: builder.mutation({
			query: ({ email, password }) => ({
				url: '/jwt/create/',
				method: 'POST',
				body: { email, password },
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
		
					// Assuming data contains both access and refresh tokens
					const { access, refresh } = data;
		
					// Save tokens in localStorage
					localStorage.setItem('access', access);
					localStorage.setItem('refresh', refresh);
		
					console.log('Access token saved:', access);
					console.log('Refresh token saved:', refresh);
		
					// Dispatch to update your auth state with tokens
					dispatch(setAuth({ accessToken: access, refreshToken: refresh }));
		
					// Optionally, you might want to navigate to a protected route after login
					// For example: dispatch(push('/dashboard'));
				} catch (error) {
					console.error('Login error:', error);
					// Optionally: Dispatch an action to show an error message to the user
					// dispatch(showErrorMessage('Failed to log in. Please try again.'));
				}
			},
		}),
		register: builder.mutation({
			query: ({
				first_name,
				last_name,
				email,
				password,
				re_password,
			}) => ({
				url: '/users/',
				method: 'POST',
				body: { first_name, last_name, email, password, re_password },
			}),
		}),
		verify: builder.mutation({
			query: () => ({
				url: '/jwt/verify/',
				method: 'POST',
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/logout/',
				method: 'POST',
			}),
		}),
		activation: builder.mutation({
			query: ({ uid, token }) => ({
				url: '/users/activation/',
				method: 'POST',
				body: { uid, token },
			}),
		}),
		resetPassword: builder.mutation({
			query: email => ({
				url: '/users/reset_password/',
				method: 'POST',
				body: { email },
			}),
		}),
		resetPasswordConfirm: builder.mutation({
			query: ({ uid, token, new_password, re_new_password }) => ({
				url: '/users/reset_password_confirm/',
				method: 'POST',
				body: { uid, token, new_password, re_new_password },
			}),
		}),


// --------------------- Categories --------------------------
		getCategories: builder.query<{
			count: number;
			next: string | null;
			previous: string | null;
			results: Category[];
		  }, { page: number; page_size: number }>({
			query: ({ page, page_size }) => `/categories/?page=${page}&page_size=${page_size}`,
		  }),

			getCategoryById: builder.query<Category, number>({
				query: (id) => `categories/${id}/`, // Adjust the endpoint according to your API
			  }),
		
		addCategory: builder.mutation<Category, Partial<Category>>({
		query: (category) => ({
			url: '/categories/',
			method: 'POST',
			body: category,
		}),
		}),
		updateCategory: builder.mutation<Category,Partial<Category>>({
		query: (category) => ({
			url: `/categories/${category.id}/`,
			method: 'PUT',
			body: category
		}),
		}),
		deleteCategory: builder.mutation<{ success: boolean; id: number }, number>({
		query: (id) => ({
			url: `/categories/${id}/`,
			method: 'DELETE',
		}),
		}),

		
// --------------------- END Categories --------------------------


// --------------------- Brand --------------------------

		getBrands: builder.query<{
			count: number;
			next: string | null;
			previous: string | null;
			results: Brand[];
		}, { page: number; page_size: number }>({
			query: ({ page, page_size }) => `/brands/?page=${page}&page_size=${page_size}`,
		}),

			getBrandById: builder.query<Brand, number>({
				query: (id) => `brands/${id}/`, // Adjust the endpoint according to your API
			}),

		addBrand: builder.mutation<Brand, Partial<Brand>>({
			query: (brand) => ({
				url: '/brands/',
				method: 'POST',
				body: brand,
			}),
			}),

		updateBrand: builder.mutation<Brand,Partial<Brand>>({
			query: (brand) => ({
				url: `/brands/${brand.id}/`,
				method: 'PUT',
				body: brand
			}),
			}),

		deleteBrand: builder.mutation<{ success: boolean; id: number }, number>({
			query: (id) => ({
				url: `/brands/${id}/`,
				method: 'DELETE',
			}),
			}),

// --------------------- END Brand --------------------------

// --------------------- Model --------------------------

			getModels: builder.query<{
				count: number;
				next: string | null;
				previous: string | null;
				results: Model[];
			}, { page: number; page_size: number }>({
				query: ({ page, page_size }) => `/models/?page=${page}&page_size=${page_size}`,
			}),

				getModelById: builder.query<Model, number>({
					query: (id) => `models/${id}/`, // Adjust the endpoint according to your API
				}),

			addModel: builder.mutation<Model, Partial<Model>>({
				query: (model) => ({
					url: '/models/',
					method: 'POST',
					body: model,
				}),
				}),

			updateModel: builder.mutation<Model,Partial<Model>>({
				query: (model) => ({
					url: `/models/${model.id}/`,
					method: 'PUT',
					body: model
				}),
				}),

			deleteModel: builder.mutation<{ success: boolean; id: number }, number>({
				query: (id) => ({
					url: `/models/${id}/`,
					method: 'DELETE',
				}),
			}),

// --------------------- END Model --------------------------


// --------------------- Colors Start --------------------------

		getColors: builder.query<{
			count: number;
			next: string | null;
			previous: string | null;
			results: Color[];
		}, { page: number; page_size: number }>({
			query: ({ page, page_size }) => `/colors/?page=${page}&page_size=${page_size}`,
		}),

			getColorById: builder.query<Color, number>({
				query: (id) => `colors/${id}/`, // Adjust the endpoint according to your API
			}),

		addColor: builder.mutation<Color, Partial<Color>>({
			query: (color) => ({
				url: '/colors/',
				method: 'POST',
				body: color,
			}),
			}),

		updateColor: builder.mutation<Color,Partial<Color>>({
			query: (color) => ({
				url: `/colors/${color.id}/`,
				method: 'PUT',
				body: color
			}),
			}),

		deleteColor: builder.mutation<{ success: boolean; id: number }, number>({
			query: (id) => ({
				url: `/colors/${id}/`,
				method: 'DELETE',
			}),
			}),



// --------------------- Colors End ------------------------

// -------------------- Subcategory Start ------------------------

		getSubcategories: builder.query<{
			count: number;
			next: string | null;
			previous: string | null;
			results: Subcategory[];
		}, { page: number; page_size: number }>({
			query: ({ page, page_size }) => `/subcategories/?page=${page}&page_size=${page_size}`,
		}),

			getSubcategoryById: builder.query<Subcategory, number>({
				query: (id) => `subcategories/${id}/`, // Adjust the endpoint according to your API
			}),

		addSubcategory: builder.mutation<Subcategory, Partial<Subcategory>>({
			query: (subcategory) => ({
				url: '/subcategories/',
				method: 'POST',
				body: subcategory,
			}),
			}),

		updateSubcategory: builder.mutation<Subcategory,Partial<Subcategory>>({
			query: (subcategory) => ({
				url: `/subcategories/${subcategory.id}/`,
				method: 'PUT',
				body: subcategory
			}),
			}),

		deleteSubcategory: builder.mutation<{ success: boolean; id: number }, number>({
			query: (id) => ({
				url: `/subcategories/${id}/`,
				method: 'DELETE',
			}),
			}),


// -------------------- Subcategory End ------------------------

// -----------------Fetch subcategories by category-------------------------

		getSubcategoriesByCategory: builder.query<any[], number>({
			query: (categoryId) => `/subcategories/by-category/${categoryId}/`,
		  }),

// -------------------- Childcategory Start ---------------------------

		getChildcategories: builder.query<{
			count: number;
			next: string | null;
			previous: string | null;
			results: Childcategory[];
		}, { page: number; page_size: number }>({
			query: ({ page, page_size }) => `/childcategories/?page=${page}&page_size=${page_size}`,
		}),

			getChildcategoryById: builder.query<Childcategory, number>({
				query: (id) => `childcategories/${id}/`, // Adjust the endpoint according to your API
			}),

		addChildcategory: builder.mutation<Childcategory, Partial<Childcategory>>({
			query: (childcategory) => ({
				url: '/childcategories/',
				method: 'POST',
				body: childcategory,
			}),
			}),

		updateChildcategory: builder.mutation<Childcategory,Partial<Childcategory>>({
			query: (childcategory) => ({
				url: `/childcategories/${childcategory.id}/`,
				method: 'PUT',
				body: childcategory
			}),
			}),

		deleteChildcategory: builder.mutation<{ success: boolean; id: number }, number>({
			query: (id) => ({
				url: `/childcategories/${id}/`,
				method: 'DELETE',
			}),
			}),


//------------------------ Childcategory End ------------------------

// -----------------Fetch Childcategory by category & subcategory-------------------------

		getChildcategoryByCategorySubcategory: builder.query<any[], { categoryid: number, subcategoryid: number }>({
			query: ({ categoryid, subcategoryid }) => `childcategories/by-category/by-subcategory/${categoryid}/${subcategoryid}/`,
		}),

// ------------------------ Size -----------------------------------

		getSizes: builder.query<{
			count: number;
			next: string | null;
			previous: string | null;
			results: Size[];
		}, { page: number; page_size: number }>({
			query: ({ page, page_size }) => `/sizes/?page=${page}&page_size=${page_size}`,
		}),

			getSizeById: builder.query<Size, number>({
				query: (id) => `sizes/${id}/`, // Adjust the endpoint according to your API
			}),

		addSize: builder.mutation<Size, Partial<Size>>({
			query: (size) => ({
				url: '/sizes/',
				method: 'POST',
				body: size,
			}),
			}),

		updateSize: builder.mutation<Size, Partial<Size>>({
			query: (size) => ({
				url: `/sizes/${size.id}/`,
				method: 'PUT',
				body: size
			}),
			}),

		deleteSize: builder.mutation<{ success: boolean; id: number }, number>({
			query: (id) => ({
				url: `/sizes/${id}/`,
				method: 'DELETE',
			}),
			}),


// ----------------------------- Size End -----------------------------------

// ------------------------ Products -----------------------------------

		getProducts: builder.query<{
			count: number;
			next: string | null;
			previous: string | null;
			results: Product[];
		}, { page: number; page_size: number }>({
			query: ({ page, page_size }) => `/products/?page=${page}&page_size=${page_size}`,
		}),

			getProductById: builder.query<Product, number>({
				query: (id) => `products/${id}/`, // Adjust the endpoint according to your API
			}),

		addProduct: builder.mutation<Product, FormData>({
			query: (formData) => ({
				url: '/products/',
				method: 'POST',
				body: formData,
			}),
			}),

			updateProduct: builder.mutation<Product, { id: number; formData: FormData }>({
				query: ({ id, formData }) => ({
				  url: `/products/${id}/`,
				  method: 'PUT',
				  body: formData,
				}),
			  }),

		deleteProduct: builder.mutation<{ success: boolean; id: number }, number>({
			query: (id) => ({
				url: `/products/${id}/`,
				method: 'DELETE',
			}),
			}),


// ----------------------------- Product End -----------------------------------



// ---------------------ProductImage-related endpoints-----------------------------

    // Fetch images for a product
    getProductImages: builder.query<ProductImage[], number>({
		query: (productId) => `product-images/product/${productId}/`,
	  }),
  
	  // Add a new image to a product
	  addProductImage: builder.mutation<ProductImage, FormData>({
		query: (formData) => ({
		  url: '/product-images/',
		  method: 'POST',
		  body: formData,
		}),
	  }),
  
	  // Delete a product image
	  deleteProductImage: builder.mutation<{ success: boolean }, number>({
		query: (imageId) => ({
		  url: `/product-images/${imageId}/`,
		  method: 'DELETE',
		}),
	  }),

	  // -------------------------- END Product Images ----------------------------------

	  // ------------------------------- Stock Update -----------------------------------

	  updateProductStock: builder.mutation<{ new_stock_quantity: number }, { id: number; quantity: number }>({
		query: ({ id, quantity }) => ({
		  url: `/products/${id}/update-stock/`,
		  method: 'PATCH',
		  body: { quantity }, // Send as JSON, not FormData
		}),
	}),

	 // ------------------------------- Stock End -----------------------------------

	// ------------------------------- Order Products -----------------------------------

	getOrders: builder.query<{
		count: number;
		next: string | null;
		previous: string | null;
		results: UserOrder[];
	}, { page: number; page_size: number }>({
		query: ({ page, page_size }) => `/orders/?page=${page}&page_size=${page_size}`,
	}),

	getOrderById: builder.query<UserOrder, number>({
		query: (id) => `orders/${id}/`, // Adjust the endpoint according to your API
	}),

	addOrder: builder.mutation<UserOrder, Partial<UserOrder>>({
		query: (orderData) => ({
		  url: '/orders/',
		  method: 'POST',
		  body: orderData,
		}),
	  }),


	  //---------------------------END Orders-------------------------


	  // --------------------------------------Incentives----------------------------------


	  // --------------------- Coupons --------------------------

		getCoupons: builder.query<{
			count: number;
			next: string | null;
			previous: string | null;
			results: Coupon[];
		}, { page: number; page_size: number }>({
			query: ({ page, page_size }) => `/coupons/?page=${page}&page_size=${page_size}`,
		}),

			getCouponById: builder.query<Coupon, number>({
				query: (id) => `coupons/${id}/`, // Adjust the endpoint according to your API
			}),

		addCoupon: builder.mutation<Coupon, Partial<Coupon>>({
			query: (coupon) => ({
				url: '/coupons/',
				method: 'POST',
				body: coupon,
			}),
			}),

		updateCoupon: builder.mutation<Coupon,Partial<Coupon>>({
			query: (coupon) => ({
				url: `/coupons/${coupon.id}/`,
				method: 'PUT',
				body: coupon
			}),
			}),

		deleteCoupon: builder.mutation<{ success: boolean; id: number }, number>({
			query: (id) => ({
				url: `/coupons/${id}/`,
				method: 'DELETE',
			}),
			}),

// --------------------- END Coupon --------------------------





	}),
});

export const {
	useRetrieveUserQuery,
	useSocialAuthenticateMutation,
	useLoginMutation,
	useRegisterMutation,
	useVerifyMutation,
	useLogoutMutation,
	useActivationMutation,
	useResetPasswordMutation,
	useResetPasswordConfirmMutation,

	//Categories Queries

	useGetCategoriesQuery,
	useGetCategoryByIdQuery, 
	useAddCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,

	//Brands Queries

	useGetBrandsQuery,
	useGetBrandByIdQuery, 
	useAddBrandMutation,
	useUpdateBrandMutation,
	useDeleteBrandMutation,

	//Models Queries

	useGetModelsQuery,
	useGetModelByIdQuery, 
	useAddModelMutation,
	useUpdateModelMutation,
	useDeleteModelMutation,

	//Colors Queries

	useGetColorsQuery,
	useGetColorByIdQuery, 
	useAddColorMutation,
	useUpdateColorMutation,
	useDeleteColorMutation,

	//Subcategories Queries

	useGetSubcategoriesQuery,
	useGetSubcategoryByIdQuery, 
	useAddSubcategoryMutation,
	useUpdateSubcategoryMutation,
	useDeleteSubcategoryMutation,

	//Get Subcategory By Category

	useGetSubcategoriesByCategoryQuery,

	// Childcategory queries

	useGetChildcategoriesQuery,
	useGetChildcategoryByIdQuery, 
	useAddChildcategoryMutation,
	useUpdateChildcategoryMutation,
	useDeleteChildcategoryMutation,

	// Get Childcategories by Category & Subcategory

	useGetChildcategoryByCategorySubcategoryQuery,

	// Sizes queries

	useGetSizesQuery,
	useGetSizeByIdQuery, 
	useAddSizeMutation,
	useUpdateSizeMutation,
	useDeleteSizeMutation,

	// Product queries

	useGetProductsQuery,
	useGetProductByIdQuery, 
	useAddProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,

	// Additional Product Images queries

	useGetProductImagesQuery,
	useAddProductImageMutation,
	useDeleteProductImageMutation,

	//Update Product Stock

	useUpdateProductStockMutation,

	// Orders Queries

	useGetOrdersQuery,
	useAddOrderMutation,
	useGetOrderByIdQuery,

	// Coupond Queries

	useGetCouponsQuery,
	useGetCouponByIdQuery, 
	useAddCouponMutation,
	useUpdateCouponMutation,
	useDeleteCouponMutation,


} = authApiSlice;