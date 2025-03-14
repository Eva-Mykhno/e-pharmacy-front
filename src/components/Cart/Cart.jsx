import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectCartProducts,
  selectCartTotal,
} from "../../redux/carts/selectors";
import { fetchCart, updateCart } from "../../redux/carts/operations";

import s from "./Cart.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectCartProducts);
  const total = useSelector(selectCartTotal);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrement = (productId) => {
    dispatch(updateCart({ productId, quantity: 1 }));
  };

  const handleDecrement = (productId) => {
    dispatch(updateCart({ productId, quantity: -1 }));
  };

  const handleRemove = (productId) => {
    dispatch(updateCart({ productId, quantity: 0 }));
  };

  return (
    <section className={s.section}>
      <h2>Shopping Cart</h2>
      {products.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className={s.cartList}>
          {products.map((item) => (
            <li key={item.product._id || item.product} className={s.cartItem}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <div className={s.quantityControls}>
                <button
                  onClick={() =>
                    handleDecrement(item.product._id || item.product)
                  }>
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleIncrement(item.product._id || item.product)
                  }>
                  +
                </button>
              </div>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => handleRemove(item.product._id || item.product)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <h3>Cart Total: ${total.toFixed(2)}</h3>
    </section>
  );
};

export default Cart;
