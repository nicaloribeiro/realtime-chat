import { createBrowserRouter } from "react-router-dom";

const signedInRouter = createBrowserRouter([
  {
    path: "/",
    element: <h1>Signed in </h1>,
  },
  {
    path: "/*",
    element: <h1>Not Found.</h1>,
  },
]);

export default signedInRouter;
