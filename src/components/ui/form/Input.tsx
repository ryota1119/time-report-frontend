import React from 'react'

type InputType = 'text' | 'email' | 'password' | 'number' | 'search'

interface Props {
    children?: React.ReactNode
    type: InputType
    id: string
    value: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    onChange?: (value: string) => void
    className?: string
}

export const Input: React.FC<Props> = ({
                                           children,
                                           type,
                                           id,
                                           value,
                                           placeholder = '',
                                           required = false,
                                           disabled = false,
                                           onChange,
                                           className = ''
                                       }) => {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {children}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.value)}
                className={`w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            />
        </div>
    );
};
