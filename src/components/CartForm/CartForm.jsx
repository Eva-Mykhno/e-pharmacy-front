import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import s from "./CartForm.module.css";
import { useDispatch } from "react-redux";
import { checkoutCart } from "../../redux/carts/operations";

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

const success = () => toast.success("The order is successful!");
const error = (message) => toast.error(message);

const CartForm = () => {
  const dispatch = useDispatch();

  const initialCartValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "Cash On Delivery",
  };

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(
        checkoutCart({
          shippingInfo: {
            name: values.name,
            email: values.email,
            phone: values.phone,
            address: values.address,
          },
          paymentMethod: values.payment,
        })
      );
      success();
    } catch (err) {
      error(
        err.response?.data?.message || "Something went wrong... Try again!"
      );
    } finally {
      actions.resetForm();
    }
  };

  return (
    <section className={s.cart}>
      <h2 className={s.title}>Enter shipping info</h2>
      <p className={s.text}>
        Enter your delivery address where you get the product. You can also send
        any other location where you send the products.
      </p>
      <Toaster position="top-center" reverseOrder={true} />
      <Formik validationSchema={cartSchema} initialValues={initialCartValues}>
        <Form className={s.form}>
          <div className={s.inputs}>
            <div className={s.wrap}>
              <label>
                <p className={s.label}>Name</p>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter text"
                  className={s.input}
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className={s.error}
                />
              </label>
            </div>

            <div className={s.wrap}>
              <label>
                <p className={s.label}>Email</p>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter text"
                  className={s.input}
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={s.error}
                />
              </label>
            </div>

            <div className={s.wrap}>
              <label>
                <p className={s.label}>Phone</p>
                <Field
                  type="tel"
                  name="phone"
                  placeholder="Enter text"
                  className={s.input}
                />
                <ErrorMessage
                  name="phone"
                  component="span"
                  className={s.error}
                />
              </label>
            </div>

            <div className={s.wrap}>
              <label>
                <p className={s.label}>Address</p>
                <Field
                  type="text"
                  name="address"
                  placeholder="Enter text"
                  className={s.input}
                />
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
          <div className={s.payment}>
            <label className={s.paymentLabel}>
              <Field
                type="radio"
                name="payment"
                value="Cash On Delivery"
                className={s.radio}
              />
              <p className={s.paymentText}>Cash On Delivery</p>
            </label>
            <label className={s.paymentLabel}>
              <Field
                type="radio"
                name="payment"
                value="Bank"
                className={s.radio}
              />
              <p className={s.paymentText}>Bank</p>
            </label>
          </div>

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
