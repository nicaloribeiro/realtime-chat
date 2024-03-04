import { createBrowserRouter } from "react-router-dom";
import Login from "../../login/Login";

const signedOutRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/*",
    element: <h1>Not Found.</h1>,
  },
]);

export default signedOutRouter;
