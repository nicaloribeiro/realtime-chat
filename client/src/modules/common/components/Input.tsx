import { ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  marginY?: number;
  marginX?: number;
  padding?: number;
  innerPadding?: number;
  placeholder?: string;
  rounded?: string
}

const Input = ({
  leftIcon,
  marginY = 2,
  marginX = 0,
  padding = 3,
  innerPadding = 0,
  placeholder = "",
  rounded = "md",
  ...props
}: InputProps) => {
  return (
    <div
      className={`w-full rounded-${rounded} p-${padding} my-${marginY} mx-${marginX} focus:border-highlight border border-none flex items-center justify-start bg-[#3A3D3F]`}
    >
      {leftIcon && <div className="pr-2">{leftIcon}</div>}
      <input
        {...props}
        className={`w-full placeholder:italic placeholder:text-slate-400 focus:outline-none bg-transparent p-${innerPadding}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
