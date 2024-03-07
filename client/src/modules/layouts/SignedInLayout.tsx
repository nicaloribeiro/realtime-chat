import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppDispatch } from "../common/store";
import { useDispatch } from "react-redux";
import { socketConnect } from "../common/store/reducers/user/user-reducer";

const SignedInLayout = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(socketConnect());
  }, [dispatch]);

  return (
    <div className="flex w-screen h-screen bg-dark-bg items-center justify-center">
      <Outlet />
    </div>
  );
};

export default SignedInLayout;
