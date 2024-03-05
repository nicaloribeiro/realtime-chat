import { Outlet } from "react-router-dom";

const SignedOutLayout = () => {
  return (
    <div className="flex flex-col w-screen h-screen lg:flex-row lg:flex bg-red-200">
      <div>a</div>
      <div className="w-full h-full px-8 pt-8 overflow-y-auto bg-fuchsia-600">
        <Outlet />
      </div>
    </div>
  );
};

export default SignedOutLayout;
