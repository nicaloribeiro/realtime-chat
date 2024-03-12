import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppDispatch } from "../common/store";
import { useDispatch } from "react-redux";
import { socketConnect } from "../common/store/reducers/user/user-reducer";
import NavBar from "../navbar/NavBar";
import UserProfile from "../navbar/components/UserLogo";
import { useSelector } from "react-redux";
import { RootState } from "../common/store/reducers";
import { UserInitialState } from "../common/store/reducers/user/user-types";
import SearchUser from "../navbar/components/SearchUser";

const SignedInLayout = () => {
  const user = useSelector<RootState, UserInitialState>(({ user }) => user);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(socketConnect());
  }, [dispatch]);

  return (
    <div className="flex w-screen h-screen bg-dark-bg items-center justify-center relative">
      <div className="absolute top-0 w-full">
        <NavBar>
          <div className="col-span-1 col-start-1 h-12 flex items-center justify-start">
            <img src="/src/assets/logo-3.jpeg" className="h-full" />
          </div>
          <div className="col-span-6 col-start-4 flex items-center justify-center">
            <SearchUser />
          </div>
          <div className="col-span-1 flex items-center justify-end col-end-13  px-4">
            <UserProfile user={user.user.name || "?"} />
          </div>
        </NavBar>
      </div>
      <Outlet />
    </div>
  );
};

export default SignedInLayout;
