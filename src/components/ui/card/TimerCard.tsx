interface Props {
    children?: React.ReactNode;
    className?: string;
}

export const TimerCard: React.FC<Props> = ({ children, className }) => {
    return (
        <div className={`space-y-4 bg-gray-50 shadow-md rounded-xl p-8 border border-gray-100 ${className}`}>
            {children}
        </div>
    )
}