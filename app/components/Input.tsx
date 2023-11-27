import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    label: string;
    id: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    placeholder?: any;
    className?: string
    value?: string;
    VisibilityOn?: React.ReactElement;
    VisibilityOff?: React.ReactElement;
    showPassword?: boolean;
    onClickIcon?: (value: boolean) => void;
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    register,
    errors,
    type,
    disabled,
    required,
    placeholder,
    className,
    value,
    VisibilityOn,
    VisibilityOff,
    showPassword,
    onClickIcon
}) => {
    return ( 
        <div>
            <label className="block text-white text-base mb-1" htmlFor={id}>
                {label}
            </label>
            <div className={`w-full flex items-center gap-2 border rounded-md py-2 px-3 ${errors[id] && "focus:outline-rose-600"} focus:border-purple focus:outline-2 focus:outline-offset-2 bg-[#1f1f22] text-white ${className}`}>
                <input 
                    {...register(id, { required })}
                    id={id}
                    autoComplete={id}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full ${disabled && "opacity-75 cursor-not-allowed"} bg-inherit outline-none `}
                    value={value}
                />
                {VisibilityOn && (
                    <div className="cursor-pointer" onClick={() => onClickIcon!(showPassword!)}>
                        {showPassword ? VisibilityOn : VisibilityOff}
                    </div>
                )}
            </div>
            <div className="w-full h-9 mt-2">
                {errors[id]?.message && (
                    <span className="mt-1 text-rose-600 text-xs block">
                        {errors[id]?.message as string}
                    </span>
                )}
            </div>
        </div>
     );
}
 
export default Input;