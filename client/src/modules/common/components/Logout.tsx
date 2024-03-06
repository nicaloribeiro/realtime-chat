import { useDispatch } from "react-redux";
import { logout } from "../store/reducers/user/user-reducer";
import { AppDispatch } from "../store";

const Logout = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button className="text-green-200" onClick={() => handleLogout()}>
      Logout
    </button>
  );
};

export default Logout;
