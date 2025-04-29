interface Props {
    children?: React.ReactNode;
    className?: string;
}

export const CardText: React.FC<Props> = ({ children, className }) => {
    return (
        <h1 className={`text-l text-center text-gray-800 mb-6 ${className}`}>
            {children}
        </h1>
    )
}