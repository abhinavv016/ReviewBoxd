interface ButtonProps{
    variant: "primary" | "secondary",
    text: string;
    onClick: () => void
    href?: any
}
const variantClasses = {
    "primary" : "bg-[#04AB1D] hover:bg-[#008814] text-white w-[196px] h-[42px]",
    "secondary": "bg-[#04AB1D] hover:bg-[#008814] text-white w-[196px] h-[42px] "
}
const defaultSyles = " cursor-pointer font-extrabold rounded-sm";

export default function Button({variant, text, onClick} : ButtonProps){
    return <button
    onClick={onClick}
    className={
        variantClasses[variant] + " " + defaultSyles}>
            {text}
    </button>
}