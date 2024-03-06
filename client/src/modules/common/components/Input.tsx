import { ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
}

const Input = ({ leftIcon, ...props }: InputProps) => {
  return (
    <div className="w-full rounded-md p-3 my-2 focus:border-highlight border border-none flex items-center justify-start bg-[#3A3D3F]">
      {leftIcon && <div className="pr-2">{leftIcon}</div>}
      <input
        {...props}
        className="w-full placeholder:italic placeholder:text-slate-400 focus:outline-none bg-transparent"
      />
    </div>
  );
};

export default Input;
