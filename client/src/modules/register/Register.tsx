import { Link, useNavigate } from "react-router-dom";
import Card from "../common/components/Card";
import { Formik } from "formik";
import { RegisterInput } from "../common/types/login-types";
import Input from "../common/components/Input";
import {
  MdOutlineLock,
  MdOutlineMailOutline,
  MdOutlinePermIdentity,
} from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../common/store";
import { register } from "../common/store/reducers/user/user-reducer";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitForm = async (data: RegisterInput) => {
    try {
      await dispatch(register(data)).unwrap();
      navigate("/");
    } catch (error) {
      toast.warning("Something went wrong. Try again later.");
    }
  };

  return (
    <Card>
      <div className="flex flex-col w-full h-auto pb-4 justify-center items-center">
        <div className="w-24 h-24 align-self-center bg-logo bg-contain" />
        <p className="text-3xl">Blabber</p>
      </div>
      <div className="w-full">
        <Formik
          initialValues={{ email: "", password: "", name: "", username: "" }}
          validate={(values: RegisterInput) => {
            const errors = {} as RegisterInput;
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
            if (values.password.length < 6) {
              errors.password = "Password must have at least 6 characters."
            }
            if (!values.name) {
              errors.name = "Name is required.";
            }
            if (!values.username) {
              errors.username = "Username is required.";
            }
            if (values.username.split("").includes(" ")) {
              errors.username = "Blank spaces not allowed.";
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
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  placeholder="Your name"
                  leftIcon={<FaRegAddressCard />}
                />
                <p className="text-xs text-warning">
                  {errors.name && touched.name && errors.name}
                </p>
              </div>
              <div className="w-full">
                <Input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={values.username}
                  placeholder="Username"
                  leftIcon={<MdOutlinePermIdentity />}
                />
                <p className="text-xs text-warning">
                  {errors.username && touched.username && errors.username}
                </p>
              </div>
              <div className="w-full">
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  placeholder="Email"
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
                  Sign Up
                </button>
              </div>
            </form>
          )}
        </Formik>
        <div className="w-full my-4 text-center">
          <p>
            Already have an account?{" "}
            <Link to="/" className="text-info hover:text-info-dark">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </Card>
  );
};
export default Register;
