import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectCartProducts } from "../../redux/carts/selectors";
import { fetchCart, updateCart } from "../../redux/carts/operations";

import s from "./Cart.module.css";
import LazyImage from "../LazyImage/LazyImage";

const sprite = "/sprite.svg";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectCartProducts);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const increment = (productId) => {
    dispatch(updateCart({ productId, quantity: 1 }));
  };

  const decrement = (productId) => {
    dispatch(updateCart({ productId, quantity: -1 }));
  };

  const remove = (productId) => {
    dispatch(updateCart({ productId, quantity: 0 }));
  };

  return (
    <section className={s.section}>
      {products.length === 0 ? (
        <p className={s.empty}>Now your cart is empty</p>
      ) : (
        <ul className={s.list}>
          {products.map((item) => (
            <li key={item.product._id || item.product} className={s.item}>
              <LazyImage src={item.photo} alt={item.name} className={s.image} />

              <div className={s.fullInfo}>
                <div className={s.info}>
                  <div className={s.texts}>
                    <h3 className={s.name}>{item.name}</h3>
                    <p className={s.text}>{item.suppliers}</p>
                  </div>
                  <p className={s.price}>৳ {item.price}</p>
                </div>

                <div className={s.wrapper}>
                  <div className={s.quantity}>
                    <button
                      onClick={() =>
                        decrement(item.product._id || item.product)
                      }
                      className={s.count}>
                      <svg className={s.icon}>
                        <use href={`${sprite}#icon-minus`} />
                      </svg>
                    </button>
                    <span className={s.number}>{item.quantity}</span>
                    <button
                      onClick={() =>
                        increment(item.product._id || item.product)
                      }
                      className={s.count}>
                      <svg className={s.icon} onClick={increment}>
                        <use href={`${sprite}#icon-plus`} />
                      </svg>
                    </button>
                  </div>
                  <button
                    onClick={() => remove(item.product._id || item.product)}
                    className={s.button}>
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Cart;
