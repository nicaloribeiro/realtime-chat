import { createBrowserRouter } from "react-router-dom";
import Logout from "../components/Logout";
import SignedInLayout from "../../layouts/SignedInLayout";

const signedInRouter = createBrowserRouter([
  {
    path: "/",
    element: <SignedInLayout />,
    children: [
      {
        index: true,
        element: <Logout />,
      },
      {
        path: "/*",
        element: <h1>Not Found.</h1>,
      },
    ],
  },
]);

export default signedInRouter;
