import React, { createContext, useContext, useState } from 'react';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([
        { id: '1', name: 'Laptop', price: 1000, quantity: 1 },
        { id: '2', name: 'Phone', price: 500, quantity: 2 },
        { id: '3', name: 'Headphones', price: 100, quantity: 1 },
    ]); // Dummy initial state

    const addItem = (item: CartItem) => {
        setCart(prev => [...prev, item]);
    };

    const removeItem = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        setCart(prev =>
            prev.map(item => (item.id === id ? { ...item, quantity } : item))
        );
    };

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext) as CartContextType;
