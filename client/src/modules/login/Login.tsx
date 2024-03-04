import { Formik } from "formik";
import { LoginInput } from "../common/types/login-types";
import { useDispatch } from "react-redux";
import { useLayoutEffect } from "react";
import {
  getUserInLocalStorage,
  login,
} from "../common/store/reducers/user/user-reducer";
import { AppDispatch } from "../common/store";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(getUserInLocalStorage());
  }, [dispatch]);
  console.log("login page");
  const handleSubmitForm = async (data: LoginInput) => {
    dispatch(login(data));
  };
  return (
    <div>
      <h1>Login Page</h1>
      <div className="bg-green-200">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values: LoginInput) => {
            const errors = {} as LoginInput;
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={handleSubmitForm}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Login;
