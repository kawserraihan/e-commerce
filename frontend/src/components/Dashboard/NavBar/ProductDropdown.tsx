import React, { useState } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import {
    useGetCategoriesQuery,
    useGetSubcategoriesByCategoryQuery,
    useGetChildcategoryByCategorySubcategoryQuery,
} from "../../../../redux/features/authApiSlice";

const ProductDropdown = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [hoveredCategoryId, setHoveredCategoryId] = useState<number | null>(null);
    const [hoveredSubcategoryId, setHoveredSubcategoryId] = useState<number | null>(null);
    const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useGetCategoriesQuery({ page: 1, page_size: 100 });
    const { data: subcategories, isLoading: isSubcategoriesLoading } = useGetSubcategoriesByCategoryQuery(
        hoveredCategoryId ?? 0,
        { skip: !hoveredCategoryId }
    );
    const { data: childcategories, isLoading: isChildcategoriesLoading } = useGetChildcategoryByCategorySubcategoryQuery(
        { categoryid: hoveredCategoryId ?? 0, subcategoryid: hoveredSubcategoryId ?? 0 },
        { skip: !hoveredCategoryId || !hoveredSubcategoryId }
    );

    return (
        <div className="relative inline-block" onMouseLeave={() => {
            setIsDropdownVisible(false);
        }}>
            {/* Dropdown Button */}
            <button
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-md font-semibold hover:bg-emerald-600"
                onMouseEnter={() => setIsDropdownVisible(true)}
                onMouseLeave={() => {
                    setHoveredCategoryId(null);
                    setHoveredSubcategoryId(null);
                }}
            >
                <HiOutlineMenuAlt4 className="text-xl" />
                Browse All Categories
            </button>

            {/* Dropdown Menu */}
            {isDropdownVisible && (
                <ul
                    className="absolute left-0 w-64 bg-white rounded-md shadow-lg"
                    onMouseLeave={() => {
                        setHoveredCategoryId(null);
                        setHoveredSubcategoryId(null);
                    }}>
                    {/* Categories */}
                    {isCategoriesLoading ? (
                        <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">Loading categories...</li>
                    ) : categoriesError ? (
                        <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">Error loading categories</li>
                    ) : (
                        categories?.results?.map((category: any) => (
                            <li
                                key={category.id}
                                className="relative px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onMouseEnter={() => setHoveredCategoryId(category.id)}
                                onMouseLeave={() => setHoveredCategoryId(null)}
                            >
                                {category.category_name}
                                {/* Subcategories */}
                                {hoveredCategoryId === category.id && (
                                    <ul className="absolute left-65 top-0 w-64 bg-white rounded-md shadow-lg">
                                        {isSubcategoriesLoading ? (
                                            <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">Loading subcategories...</li>
                                        ) :
                                            subcategories?.map((subcategory: any) => (
                                                <li
                                                    key={subcategory.id}
                                                    className="relative px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onMouseEnter={() => setHoveredSubcategoryId(subcategory.id)}
                                                >
                                                    {subcategory.subcategory_name}
                                                    {/* Child Categories */}
                                                    {hoveredSubcategoryId === subcategory.id && (
                                                        <ul className="absolute left-65 top-0 w-64 bg-white rounded-md shadow-lg">
                                                            {isChildcategoriesLoading ? (
                                                                <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">Loading child categories...</li>
                                                            ) :
                                                                childcategories?.map((childCategory: any) => (
                                                                    <li
                                                                        key={childCategory.id}
                                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                                        {childCategory.childcategory_name}
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    )}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default ProductDropdown;
