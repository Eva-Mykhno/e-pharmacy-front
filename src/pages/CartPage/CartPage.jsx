import clsx from "clsx";
import s from "./CartPage.module.css";
import Cart from "../../components/Cart/Cart";
// import { useDispatch } from "react-redux";
// import { fetchUser } from "../../redux/auth/operations";
// import { useEffect } from "react";
// import CartForm from "../../components/CartForm/CartForm";

const CartPage = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchUser());
  // }, [dispatch]);

  return (
    <main className={clsx(s.page, "container")}>
      {/* <CartForm /> */}
      <Cart />
    </main>
  );
};

export default CartPage;
