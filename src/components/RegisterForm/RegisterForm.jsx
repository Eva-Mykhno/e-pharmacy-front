import { ErrorMessage, Field, Form, Formik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { fetchUser, register } from "../../redux/auth/operations";
import s from "./RegisterForm.module.css";

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short name")
    .max(30, "Too long name")
    .required("Name is a required field"),
  email: Yup.string()
    .matches(
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      'Email must have a one "@" and a "."'
    )
    .required("Mail is a required field"),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, "Phone number format is invalid")
    .required("Phone is a required field"),
  password: Yup.string()
    .min(8, "Too short password")
    .max(64, "Too long password")
    .matches(
      /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/,
      "Password must have 1 number and 1 special character."
    )
    .required("Enter a valid password*"),
});

const success = () => toast.success("Registration successful!");
const error = (message) => toast.error(message);

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const initialRegisterValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };

  const handleSubmit = async (values, actions) => {
    try {
      const result = await dispatch(register(values));

      if (register.fulfilled.match(result)) {
        actions.resetForm();
        success();
        await dispatch(fetchUser());
      } else {
        actions.resetForm();
        error(result.payload?.message || "Something went wrong... Try again!");
      }
    } catch (err) {
      actions.resetForm();
      error(
        err.response?.data?.message || "Something went wrong... Try again!"
      );
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <Formik
        validationSchema={registerSchema}
        initialValues={initialRegisterValues}
        onSubmit={handleSubmit}>
        <Form className={s.form}>
          <div className={s.inputs}>
            <div className={s.wrap}>
              <Field
                type="text"
                name="name"
                placeholder="User name"
                className={s.input}
              />
              <ErrorMessage name="name" component="span" className={s.error} />
            </div>

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
                type="tel"
                name="phone"
                placeholder="Phone number"
                className={s.input}
              />
              <ErrorMessage name="phone" component="span" className={s.error} />
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
              Register
            </button>
            <NavLink to="/login" className={s.link}>
              Already have an account?
            </NavLink>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default RegisterForm;
