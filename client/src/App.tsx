import { useSelector } from "react-redux";
import { RootState } from "./modules/common/store/reducers";
import { SignedInRoutes, SignedOutRoutes } from "./modules/common/routes";
import { UserInitialState } from "./modules/common/store/reducers/user/user-types";
import { useLayoutEffect, useState } from "react";
import { AppDispatch } from "./modules/common/store";
import { useDispatch } from "react-redux";
import { getUserInLocalStorage } from "./modules/common/store/reducers/user/user-reducer";
import { Spin } from "antd";

const App = () => {
  const [retrievingUser, setRetrievingUser] = useState(false);
  const user = useSelector<RootState, UserInitialState>((state) => state.user);
  const dispatch: AppDispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getUserInLocalStorage());
    setRetrievingUser(true);
  }, [dispatch]);

  if (retrievingUser === false)
    return (
      <div className="w-screen flex justify-center">
        <Spin className="self-center" size="large" />
      </div>
    );

  return user.user.accessToken ? <SignedInRoutes /> : <SignedOutRoutes />;
};

export default App;
