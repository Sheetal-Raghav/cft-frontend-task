import React from 'react';


export default function Modal({ title, children, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-lg shadow p-4 w-11/12 max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button onClick={onClose} className="text-gray-600">✕</button>
                </div>
                {children}
            </div>
        </div>
    );
}