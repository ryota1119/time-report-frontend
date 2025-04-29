import React from 'react';

interface Option<T> {
    value: T;
    label: string;
}

interface Props<T> {
    label?: string;
    id: string;
    value: T | null;
    options: Option<T>[];
    required?: boolean;
    disabled?: boolean;
    onChange?: (value: T | null) => void;
    className?: string;
}

export const Select = <T extends string | number>({
                                                      label,
                                                      id,
                                                      value,
                                                      options,
                                                      required = false,
                                                      disabled = false,
                                                      onChange,
                                                      className = '',
                                                  }: Props<T>) => {
    return (
        <div className="flex flex-col">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <select
                id={id}
                value={value ?? ''}
                required={required}
                disabled={disabled}
                onChange={(e) => {
                    const rawValue = e.target.value;
                    if (rawValue === '') {
                        onChange?.(null);
                    } else {
                        const parsedValue = typeof options[0]?.value === 'number'
                            ? Number(rawValue) as T
                            : rawValue as T;
                        onChange?.(parsedValue);
                    }
                }}
                className={`border border-gray-300 p-2 h-10 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${className}`}
            >
                <option value="" disabled>--プロジェクトを選択--</option>
                {options.map((option) => (
                    <option key={String(option.value)} value={String(option.value)}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
