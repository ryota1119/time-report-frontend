import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    type?: 'button' | 'submit';
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
};

export default function Button({
                                   children,
                                   type = 'button',
                                   onClick,
                                   disabled = false,
                                   className = '',
                               }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors ${className}`}
        >
            {children}
        </button>
    );
}