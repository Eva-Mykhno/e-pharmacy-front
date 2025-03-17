import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import LazyImage from "../LazyImage/LazyImage";
import TabsContainer from "../TabsContainer/TabsContainer";
import Modal from "../Modal/Modal";
import LoginPop from "../LoginPop/LoginPop";
import RegisterPop from "../RegisterPop/RegisterPop";
import { fetchProductById } from "../../redux/products/operations";
import { updateCart } from "../../redux/carts/operations";
import {
  selectProductById,
  selectIsLoading,
} from "../../redux/products/selectors";
import { selectUser } from "../../redux/auth/selectors";
import s from "./ProductOverview.module.css";

const sprite = "/sprite.svg";

const success = (message) => toast.success(message);
const error = (message) => toast.error(message);

const ProductOverview = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProductById);
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);

  const [count, setCount] = useState(1);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [pendingAddToCart, setPendingAddToCart] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user && pendingAddToCart) {
      dispatch(updateCart({ productId: product._id, quantity: count }));
      success("The product added to cart!");
      setPendingAddToCart(false);
    }
  }, [user, pendingAddToCart, dispatch, product, count]);

  if (isLoading) return <Loader />;

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  const handleClick = async () => {
    if (!user) {
      setIsLoginModalOpen(true);
      setPendingAddToCart(true);
      return;
    }
    try {
      dispatch(updateCart({ productId: product._id, quantity: count }));
      success("Product added to cart!");
    } catch {
      error("Failed to add product to cart");
    }
  };

  return (
    <div className={s.section}>
      <Toaster position="top-center" reverseOrder={true} />
      <section className={s.block}>
        <LazyImage src={product.photo} alt={product.name} className={s.image} />

        <div className={s.info}>
          <div className={s.wrap}>
            <h2 className={s.title}>{product.name}</h2>
            <p className={s.supplier}>{product.suppliers}</p>
            <p className={s.title}>৳{product.price}</p>
          </div>

          <p className={s.suppl}>{product.suppliers}</p>

          <div className={s.wrapper}>
            <div className={s.count}>
              <svg className={s.icon} onClick={decrement}>
                <use href={`${sprite}#icon-minus`} />
              </svg>
              <span className={s.number}>{count}</span>
              <svg className={s.icon} onClick={increment}>
                <use href={`${sprite}#icon-plus`} />
              </svg>
            </div>
            <button className={s.button} type="button" onClick={handleClick}>
              Add to Cart
            </button>
          </div>
        </div>
      </section>
      <TabsContainer />

      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}>
        <LoginPop
          onClose={() => setIsLoginModalOpen(false)}
          setIsRegisterModalOpen={setIsRegisterModalOpen}
        />
      </Modal>

      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}>
        <RegisterPop
          onClose={() => setIsRegisterModalOpen(false)}
          setIsLoginModalOpen={setIsLoginModalOpen}
        />
      </Modal>
    </div>
  );
};

export default ProductOverview;
