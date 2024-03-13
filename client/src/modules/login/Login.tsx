import { Formik } from "formik";
import { LoginInput } from "../common/types/login-types";
import { useDispatch } from "react-redux";
import { login } from "../common/store/reducers/user/user-reducer";
import { AppDispatch } from "../common/store";
import Input from "../common/components/Input";
import { Link } from "react-router-dom";
import { MdOutlineMailOutline, MdOutlineLock } from "react-icons/md";
import Card from "../common/components/Card";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleSubmitForm = async (data: LoginInput) => {
    await dispatch(login(data));
  };

  return (
    <Card>
      <div className="flex flex-col w-full h-auto pb-4 justify-center items-center">
        <div className="w-24 h-24 bg-logo bg-contain" />
        <p className="text-3xl">Blabber</p>
      </div>
      <div className="flex flex-col">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values: LoginInput) => {
            const errors = {} as LoginInput;
            if (!values.email) {
              errors.email = "Email is required.";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address.";
            }
            if (!values.password) {
              errors.password = "Password is required.";
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
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="w-full">
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  placeholder="Your@email.com"
                  leftIcon={<MdOutlineMailOutline />}
                />
                <p className="text-xs text-warning">
                  {errors.email && touched.email && errors.email}
                </p>
              </div>
              <div className="w-full ">
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  placeholder="Password"
                  leftIcon={<MdOutlineLock />}
                />
                <p className="text-xs text-warning">
                  {errors.password && touched.password && errors.password}
                </p>
              </div>
              <div className="w-full my-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-success hover:bg-success-dark text-text-primary p-3 rounded-md w-full"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}
        </Formik>
        <div className="w-full my-4 flex justify-between">
          <Link
            to="/register"
            className="hover:text-info-dark lg:text-base text-xs"
          >
            Create Account
          </Link>
          <a
            className="hover:text-info-dark lg:text-base text-xs"
            onClick={() => toast("Soon!")}
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </Card>
  );
};
export default Login;
