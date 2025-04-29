interface Props {
    children?: React.ReactNode;
    className?: string;
}

export const CardTitle: React.FC<Props> = ({ children, className }) => {
    return (
        <h1 className={`text-2xl font-bold text-center text-gray-800 mb-6 ${className}`}>
            {children}
        </h1>
    )
}