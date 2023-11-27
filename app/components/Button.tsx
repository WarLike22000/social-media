type TButton = "button" | "submit" | "reset";

interface ButtonProps {
    disabled?: boolean;
    purple?: boolean;
    widthFull? :boolean;
    black?: boolean;
    red?: boolean;
    outline?: boolean;
    children: React.ReactNode;
    type?: TButton;
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    disabled,
    purple,
    widthFull,
    black,
    red,
    outline,
    children,
    type,
    onClick,
    className
}) => {
    return ( 
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={`py-2 px-4 text-sm outline-none text-white rounded-md shadow hover:opacity-75 transition ${widthFull && "w-full"} ${purple && "bg-purple text-white"} ${black && "bg-black text-white"} ${outline && "bg-white ring-1"} ${disabled && "opacity-75 cursor-not-allowed"} ${red && "bg-red-500 text-white focus:ring-2 ring-offset-2 ring-red-500"} ${className}`}
        >
            {children}
        </button>
     );
}
 
export default Button;