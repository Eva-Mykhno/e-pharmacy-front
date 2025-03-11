import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from "./CartForm.module.css";

const cartSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short name")
    .max(30, "Too long name")
    .required("Name is a required field"),
  email: Yup.string()
    .matches(
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      'Email must have a one "@" and a "."'
    )
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, "Phone number format is invalid")
    .required("Phone is a required field"),
  address: Yup.string()
    .min(3, "Too short name")
    .max(100, "Too long name")
    .required("Address is a required field"),
  payment: Yup.string().required("Payment is required"),
});

const CartForm = () => {
  const initialCartValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "Cash On Delivery",
  };

  const handleSubmit = () => {};

  return (
    <section className={s.cart}>
      <h2 className={s.title}>Enter shipping info</h2>
      <p className={s.text}>
        Enter your delivery address where you get the product. You can also send
        any other location where you send the products.
      </p>
      <Formik validationSchema={cartSchema} initialValues={initialCartValues}>
        <Form className={s.form}>
          <div className={s.inputs}>
            <div className={s.wrap}>
              <label className={s.label}>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter text"
                  className={s.input}
                />
                Name
                <ErrorMessage
                  name="name"
                  component="span"
                  className={s.error}
                />
              </label>
            </div>

            <div className={s.wrap}>
              <label className={s.label}>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter text"
                  className={s.input}
                />
                Email
                <ErrorMessage
                  name="email"
                  component="span"
                  className={s.error}
                />
              </label>
            </div>

            <div className={s.wrap}>
              <label className={s.label}>
                <Field
                  type="tel"
                  name="phone"
                  placeholder="Enter text"
                  className={s.input}
                />
                Phone
                <ErrorMessage
                  name="phone"
                  component="span"
                  className={s.error}
                />
              </label>
            </div>

            <div className={s.wrap}>
              <label className={s.label}>
                <Field
                  type="text"
                  name="address"
                  placeholder="Enter text"
                  className={s.input}
                />
                Address
                <ErrorMessage
                  name="address"
                  component="span"
                  className={s.error}
                />
              </label>
            </div>
          </div>

          <h2 className={s.title}>Payment method</h2>
          <p className={s.text}>
            You can pay us in a multiple way in our payment gateway system.
          </p>
          <label className={s.label}>
            <Field
              type="radio"
              name="payment"
              value="Cash On Delivery"
              className={s.radio}
            />
            Cash On Delivery
          </label>
          <label className={s.label}>
            <Field
              type="radio"
              name="payment"
              value="Bank"
              className={s.radio}
            />
            Bank
          </label>

          <h2 className={s.title}>Order details </h2>
          <p className={s.text}>
            Shipping and additionnal costs are calculated based on values you
            have entered.
          </p>
          <div className={s.total}>
            <p className={s.sum}>Total:</p>
            <p className={s.sum}>৳</p>
          </div>

          <button type="submit" onSubmit={handleSubmit} className={s.button}>
            Place order
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default CartForm;
