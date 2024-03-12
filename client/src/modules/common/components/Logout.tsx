import { useDispatch } from "react-redux";
import { logout } from "../store/reducers/user/user-reducer";
import { AppDispatch } from "../store";
import { MdLogout } from "react-icons/md";

const Logout = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button
      className="text-dark-bg items-center justify-center flex w-full"
      onClick={() => handleLogout()}
    >
      <MdLogout size={24} />
      Logout
    </button>
  );
};

export default Logout;
