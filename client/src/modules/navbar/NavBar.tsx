type NavBarProps = {
  children?: React.ReactNode;
};
const NavBar = ({ children }: NavBarProps) => {
  return (
    <div className="grid grid-cols-12 w-full h-12 bg-dark-secondary">
      {children}
    </div>
  );
};

export default NavBar;
