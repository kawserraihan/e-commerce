'use client';

import React from 'react';

interface CartItemProps {
    item: {
        id: string;
        name: string;
        price: number;
        quantity: number;
    };
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    return (
        <li
            style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
            }}
        >
            <div style={{ flex: 2 }}>
                <strong>{item.name}</strong>
            </div>
            <div style={{ flex: 1 }}>${item.price}</div>
            <div style={{ flex: 1 }}>
                <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                    style={{ width: '50px' }}
                />
            </div>
            <div style={{ flex: 1 }}>
                <button onClick={() => onRemove(item.id)}>Remove</button>
            </div>
        </li>
    );
}
