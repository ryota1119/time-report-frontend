import React from 'react';

type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'date';

type ValueType<T extends InputType, N extends boolean = false> =
    T extends 'number'
        ? N extends true
            ? number | null
            : string
        : N extends true
            ? string | null
            : string

interface Props<T extends InputType, N extends boolean = false> {
    label?: string;
    type: T;
    id: string;
    value: ValueType<T, N>;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    nullable?: N;
    onChange?: (value: ValueType<T, N>) => void;
    className?: string;
}

export const Input = <T extends InputType, N extends boolean>({
                                               label,
                                               type,
                                               id,
                                               value,
                                               placeholder = '',
                                               required = false,
                                               disabled = false,
                                               nullable = false as N,
                                               onChange,
                                               className = '',
                                           }: Props<T, N>) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === 'number') {
            const inputValue = e.target.value;
            if (nullable) {
                const num = inputValue === '' ? null : Number(inputValue);
                onChange?.(num as ValueType<T, N>);
            } else {
                const num = Number(inputValue || 0); // 空の場合0にするなど適宜
                onChange?.(num as ValueType<T, N>);
            }
        } else {
            onChange?.(e.target.value as ValueType<T, N>);
        }
    };

    return (
        <div className="flex flex-col">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                value={value ?? ''}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                onChange={handleChange}
                className={`border border-gray-300 p-2 h-10 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            />
        </div>
    );
};
