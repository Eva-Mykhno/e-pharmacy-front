import { ErrorMessage, Field, Form, Formik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { fetchUser, login } from "../../redux/auth/operations";
import s from "./LoginForm.module.css";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      'Email must have a one "@" and a "."'
    )
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Too short password")
    .max(64, "Too long password")
    .matches(
      /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/,
      "Password must have 1 number and 1 special character."
    )
    .required("Password is required"),
});

const success = () => toast.success("Login successful!");
const error = (message) => toast.error(message);

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  const initialLoginValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, actions) => {
    try {
      const result = await dispatch(login(values));

      if (login.fulfilled.match(result)) {
        actions.resetForm();
        success();
        await dispatch(fetchUser());
      } else {
        actions.resetForm();
        error(result.payload?.message ?? "Wrong email or password! Try again!");
      }
    } catch (err) {
      actions.resetForm();
      error(
        err.response?.data?.message ?? "Something went wrong... Try again!"
      );
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <Formik
        validationSchema={loginSchema}
        initialValues={initialLoginValues}
        onSubmit={handleSubmit}>
        <Form className={s.form}>
          <div className={s.inputs}>
            <div className={s.wrap}>
              <Field
                type="email"
                name="email"
                placeholder="Email address"
                className={s.input}
              />
              <ErrorMessage name="email" component="span" className={s.error} />
            </div>
            <div className={s.wrap}>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className={s.input}
              />
              <ErrorMessage
                name="password"
                component="span"
                className={s.error}
              />
            </div>
          </div>
          <div className={s.buttons}>
            <button type="submit" className={s.button}>
              Log In
            </button>
            <NavLink to="/register" className={s.link}>
              Don&rsquo;t have an account?
            </NavLink>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm;
