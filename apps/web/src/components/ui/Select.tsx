import { SelectHTMLAttributes, FC } from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
}

const Select: FC<SelectProps> = ({ label, className, children, ...props }) => {
    return (
        <div className="flex flex-col gap-1 text-sm w-fit">
            {label && <label className="font-medium text-[#2E2E2E]">{label}</label>}
            <select
                {...props}
                className={cn(
                    "input bg-white text-[#2E2E2E] font-medium rounded-xl",
                    "hover:bg-[#f1f5f9] focus:ring-2 focus:ring-[#A8D5BA]",
                    className
                )}
            >
                {children}
            </select>
        </div>
    );
};

export default Select;
