import { RouterProvider } from "react-router-dom";
import signedInRouter from "./signedin-routes";
import signedOutRouter from "./sigendout-routes";

export const SignedInRoutes = () => {
  return <RouterProvider router={signedInRouter} />;
};
export const SignedOutRoutes = () => {
  return <RouterProvider router={signedOutRouter} />;
};
