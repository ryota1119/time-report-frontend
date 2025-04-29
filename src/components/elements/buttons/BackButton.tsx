import React from "react";

type Props = {
    children: React.ReactNode;
    type?: 'button' | 'submit';
    onClick?: () => void;
    className?: string;
};

export default function BackButton({
                                   children,
                                   type = 'button',
                                   onClick,
                                   className = '',
                               }: Props) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`font-semibold py-2 px-4 rounded transition-colors ${className}`}
        >
            {children}
        </button>
    );
}