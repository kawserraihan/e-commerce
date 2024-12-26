"use client";
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function InteractiveCartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Ultra Bass Headphone",
      price: 238.85,
      image: "/images/deals.jpg",
      quantity: 1,
    },
    {
      id: 2,
      name: "Smart Bluetooth Speaker",
      price: 138.85,
      image: "/images/deals.jpg",
      quantity: 2,
    },
    {
      id: 3,
      name: "HomeSpeak 12UEA Goole",
      price: 738.85,
      image: "/images/deals.jpg",
      quantity: 1,
    },
  ]);

  const handleQuantityChange = (id, value) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + value) }
        : item
    );
    setCartItems(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const calculateTotal = () =>
    cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "2rem auto",
        padding: "0 1rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "1.75rem",
          fontWeight: "700",
          marginBottom: "1.5rem",
        }}
      >
        Your Shopping Cart
      </h1>

      {/* Empty Cart */}
      {cartItems.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            backgroundColor: "#f9fafb",
            borderRadius: "0.5rem",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{ fontSize: "1.5rem", fontWeight: "600", color: "#6b7280" }}
          >
            Your cart is empty!
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#9ca3af",
              marginBottom: "1.5rem",
            }}
          >
            Browse our store and add some items to your cart.
          </p>
          <button
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: "#10b981",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "700",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart Table */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "2rem",
              animation: "fadeIn 0.5s ease-in-out",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    padding: "1rem",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Product
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "1rem",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Price
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "1rem",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Quantity
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "1rem",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Total
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "1rem",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr
                  key={item.id}
                  style={{ animation: "fadeIn 0.5s ease-in-out" }}
                >
                  <td
                    style={{
                      padding: "1rem",
                      borderBottom: "1px solid #e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "0.375rem",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    {item.name}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "1rem",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    ${item.price.toFixed(2)}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "1rem",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        border: "1px solid #d1d5db",
                        borderRadius: "0.375rem",
                      }}
                    >
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        style={{
                          padding: "0.5rem 1rem",
                          backgroundColor: "#f9fafb",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: "600",
                          color: "#6b7280",
                        }}
                      >
                        -
                      </button>
                      <span
                        style={{ padding: "0.5rem 1rem", fontWeight: "600" }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        style={{
                          padding: "0.5rem 1rem",
                          backgroundColor: "#f9fafb",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: "600",
                          color: "#6b7280",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "1rem",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "1rem",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      style={{
                        backgroundColor: "#f43f5e",
                        color: "#fff",
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.375rem",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total and Checkout */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              animation: "fadeIn 0.5s ease-in-out",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "700",
              }}
            >
              Total: ${calculateTotal()}
            </h2>
            <button
              style={{
                padding: "0.75rem 2rem",
                backgroundColor: "#10b981",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: "700",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => ((e.target as HTMLElement).style.backgroundColor = "#059669")}
              onMouseOut={(e) => ((e.target as HTMLElement).style.backgroundColor = "#10b981")}
              
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
