import UserProfile from "./components/UserLogo";

type NavBarProps = {
  children?: React.ReactNode;
};
const NavBar = ({ children }: NavBarProps) => {
  return (
    <div className="flex items-center p-2 w-full h-12 bg-dark-secondary">
      <UserProfile />
      {children}
    </div>
  );
};

export default NavBar;
