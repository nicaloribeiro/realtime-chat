import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { socket } from "../../../config/socket";
import { setSocketId } from "../store/reducers/user/user-reducer";
import { toast } from "react-toastify";

const SocketProvider = () => {
  const dispatch: AppDispatch = useDispatch();

  socket.on("user-connected", (data) => {
    dispatch(setSocketId(data));
  });

  socket.on("friend-connected", (data) => {
    const { name } = data;
    toast(`Your friend ${name} is online!`);
  });

  socket.on("friends-online", (data) => {
    console.log("friends online", data);
  });

  socket.on("friend-disconnected", (data) => {
    console.log("friend offline", data);
  });

  return null;
};

export default SocketProvider;
