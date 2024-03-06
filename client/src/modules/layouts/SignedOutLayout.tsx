import { Outlet } from "react-router-dom";

const SignedOutLayout = () => {
  return (
    <div className="flex w-screen h-screen bg-dark-bg items-center justify-center">
      <Outlet />
    </div>
  );
};

export default SignedOutLayout;
