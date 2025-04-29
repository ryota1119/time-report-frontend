'use client'

import React from 'react';

interface DateInputProps {
    label?: string;
    id: string;
    value: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    onChange?: (value: string) => void;
    className?: string;
}

export const DateInput: React.FC<DateInputProps> = ({
                                                        label,
                                                        id,
                                                        value,
                                                        placeholder = '',
                                                        required = false,
                                                        disabled = false,
                                                        onChange,
                                                        className = '',
                                                    }) => {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                type="date"
                id={id}
                value={value}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.value)}
                className={`border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            />
        </div>
    );
};
