interface CardProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Card = ({ children, ...props }: CardProps) => {
  return (
    <div
      {...props}
      className="bg-dark-secondary lg:p-10 p-6 rounded-md text-text-primary lg:w-2/5 w-4/5"
    >
      {children}
    </div>
  );
};

export default Card;
