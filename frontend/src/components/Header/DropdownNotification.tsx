import { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface CartItem {
  id: number;
  product: {
    product_name: string;
    product_image: string;
    price: string;
  };
  quantity: number;
}

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      setError(null);

      try {
        // Retrieve user data and access token from cookies
        const userCookie = Cookies.get("user");
        const token = Cookies.get("accessToken");

        if (!userCookie || !token) {
          throw new Error("User data or access token not found in cookies.");
        }

        const user = JSON.parse(userCookie);
        const userId = user.id;

        if (!userId) {
          throw new Error("User ID not found in the cookie.");
        }

        // Fetch cart data from the API
        const response = await fetch(
          `http://localhost:8000/api/carts/${userId}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorResponse = await response.text();
          throw new Error(`Failed to fetch cart items: ${response.statusText}`);
        }

        const data = await response.json();

        setCartItems(data.items || []);
        setTotalPrice(data.total_price || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="relative">
      {/* Cart Button */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        {/* Notification Badge */}
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
        {/* Cart Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          width="24px"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7 18c-1.104 0-2 .897-2 2s.896 2 2 2 2-.897 2-2-.896-2-2-2zm10 0c-1.104 0-2 .897-2 2s.896 2 2 2 2-.897 2-2-.896-2-2-2zM7.271 8l-.271-2h15l-1.981 8H7.271zm16.469-3H7l-1-4H2V1h5l1 4h16.469z" />
        </svg>
      </button>

      {/* Cart Dropdown */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-md rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 z-50">
          {loading ? (
            <p className="text-center p-4 text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center p-4 text-red-500">{error}</p>
          ) : cartItems.length === 0 ? (
            <p className="text-center p-4 text-gray-500">Your cart is empty.</p>
          ) : (
            <div>
              <div className="max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700"
                  >
                    <img
                      src={item.product.product_image}
                      alt={item.product.product_name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {item.product.product_name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Price: ৳{parseFloat(item.product.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-right font-semibold text-gray-900 dark:text-gray-100">
                  Total: ৳{totalPrice.toFixed(2)}
                </p>
                <div className="flex justify-between mt-3">
                  <a
                    href={`${process.env.NEXT_PUBLIC_BASE}/cart`}
                    className="px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                  >
                    Update Cart
                  </a>
                  <a
                    href={`${process.env.NEXT_PUBLIC_BASE}/cart/checkout`}
                    className="px-4 py-2 bg-primary rounded-md text-sm font-semibold text-white hover:bg-primary-dark"
                  >
                    Checkout
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownNotification;
