import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../redux/products/operations";
import {
  selectProductById,
  selectIsLoading,
} from "../../redux/products/selectors";
import Loader from "../Loader/Loader";
import LazyImage from "../LazyImage/LazyImage";
import s from "./ProductOverview.module.css";
import TabsContainer from "../TabsContainer/TabsContainer";
import { selectUser } from "../../redux/auth/selectors";
import Modal from "../Modal/Modal";
import LoginPop from "../LoginPop/LoginPop";
import RegisterPop from "..//RegisterPop/RegisterPop";

const sprite = "/sprite.svg";

const ProductOverview = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProductById);
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);

  const [count, setCount] = useState(1);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (isLoading) return <Loader />;

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  const handleClick = () => {
    if (!user) {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <div className={s.section}>
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
              <p className={s.number}>{count}</p>
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
