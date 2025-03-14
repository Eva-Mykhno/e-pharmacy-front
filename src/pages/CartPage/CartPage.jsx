import clsx from "clsx";
import s from "./CartPage.module.css";
import Cart from "../../components/Cart/Cart";
import CartForm from "../../components/CartForm/CartForm";

const CartPage = () => {
  return (
    <main className={clsx(s.page, "container")}>
      <h2 className={s.title}>Cart</h2>
      <div className={s.wrap}>
        <CartForm />
        <Cart />
      </div>
    </main>
  );
};

export default CartPage;
