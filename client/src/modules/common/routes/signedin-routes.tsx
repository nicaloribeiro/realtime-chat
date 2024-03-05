import { createBrowserRouter } from "react-router-dom";
import Logout from "../components/Logout/Logout";

const signedInRouter = createBrowserRouter([
  {
    path: "/",
    element: <Logout />,
    children: []
  },
  {
    path: "/*",
    element: <h1>Not Found.</h1>,
  },
]);

export default signedInRouter;
