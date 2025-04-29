interface Props {
    children?: React.ReactNode;
    className?: string;
}

export const Card: React.FC<Props> = ({ children, className }) => {
    return (
        <div className={`space-y-4 bg-white shadow-md rounded-xl p-8 border border-gray-100 ${className}`}>
            {children}
        </div>
    )
}