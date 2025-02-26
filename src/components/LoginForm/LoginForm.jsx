import { ErrorMessage, Field, Form, Formik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useEffect } from "react";
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

const LoginForm = () => {
  return (
    <Formik>
      <Form className={s.form}>
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
          <ErrorMessage name="password" component="span" className={s.error} />
        </div>
      </Form>
    </Formik>
  );
};

export default LoginForm;
