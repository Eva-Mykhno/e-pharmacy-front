import { Field, Form, Formik } from "formik";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
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
    .required(),
  password: Yup.string()
    .min(8, "Too short password")
    .max(64, "Too long password")
    .matches(
      /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/,
      "Password must have 1 number and 1 special character."
    )
    .required("Enter a valid Password*"),
});

const RegisterForm = () => {
  const initialRegisterValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };

  return (
    <div className={s.register}>
      <div className={s.logo}>
        <picture>
          <source srcSet="/img/green-logo-1x.webp 1x, /img/green-logo-2x.webp 2x, /img/green-logo-1x.png 1x, /img/green-logo-2x.png 2x" />
          <img src="/img/green-logo-1x.png" alt="logo" className={s.image} />
        </picture>
        <p className={s.logoText}>E-Pharmacy</p>

        <picture>
          <source srcSet="/img/round-pill-1x.webp 1x, /img/round-pill--2x.webp 2x, /img/round-pill--1x.png 1x, /img/round-pill--2x.png 2x" />
          <img
            src="/img/round-pill--1x.png"
            alt="Big round pill"
            className={s.pill}
          />
        </picture>
      </div>
      <p className={s.text}>
        Your medication, delivered Say goodbye to all{" "}
        <span className={s.span}>your healthcare</span> worries with us
      </p>
      <Formik validationSchema={registerSchema}>
        <Form className={s.form}>
          <Field />
        </Form>
      </Formik>
      <NavLink className={s.link}>Already have an account?</NavLink>
    </div>
  );
};

export default RegisterForm;
