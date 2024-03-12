import { createBrowserRouter } from "react-router-dom";
import SignedInLayout from "../../layouts/SignedInLayout";

const signedInRouter = createBrowserRouter([
  {
    path: "/",
    element: <SignedInLayout />,
    children: [
      {
        index: true,
        element: <h1>Soon</h1>,
      },
      {
        path: "/*",
        element: <h1>Not Found.</h1>,
      },
    ],
  },
]);

export default signedInRouter;
