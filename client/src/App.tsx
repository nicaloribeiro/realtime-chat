import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./modules/common/store/reducers";
import { SignedInRoutes, SignedOutRoutes } from "./modules/common/routes";
import { UserInitialState } from "./modules/common/store/reducers/user/user-types";

const App = () => {
  const user = useSelector<RootState, UserInitialState>(({ user }) => user);

  return user.user.accessToken ? <SignedInRoutes /> : <SignedOutRoutes />;
};

export default App;
