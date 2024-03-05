import { createBrowserRouter } from "react-router-dom";
import Login from "../../login/Login";
import Register from "../../register/Register";
import SignedOutLayout from "../../layouts/SignedOutLayout";

const signedOutRouter = createBrowserRouter([
  {
    path: "/",
    element: <SignedOutLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "*",
        element: <h1>Not Found.</h1>,
      },
    ],
  },
]);

export default signedOutRouter;
