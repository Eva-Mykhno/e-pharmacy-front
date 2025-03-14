import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  selectFilters,
  selectIsLoading,
  selectProducts,
} from "../../redux/products/selectors";
import { fetchProducts } from "../../redux/products/operations";
import { selectUser } from "../../redux/auth/selectors";

import Loader from "../Loader/Loader";
import LazyImage from "../LazyImage/LazyImage";
import Filters from "../Filters/Filters";
import Modal from "../Modal/Modal";
import LoginPop from "../LoginPop/LoginPop";
import RegisterPop from "../RegisterPop/RegisterPop";
import { updateCart } from "../../redux/carts/operations";
import s from "./Discount35.module.css";

const success = () => toast.success("Product added to cart!");
const error = (message) => toast.error(message);

const Discount35 = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectIsLoading);
  const filters = useSelector(selectFilters);
  const user = useSelector(selectUser);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts({ perPage: 100, page: 1 }));
  }, [dispatch, filters]);

  useEffect(() => {
    if (products.length > 0) {
      setAllProducts(products);
    }
  }, [products]);

  const handleClick = async (product) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      await dispatch(updateCart({ productId: product._id, quantity: 1 }));
      success();
    } catch {
      error();
    }
  };

  const filteredProducts = allProducts.filter(
    (product) => product.discount === "35"
  );

  return (
    <div className={s.wrapper}>
      <Toaster position="top-center" reverseOrder={true} />
      <h1 className={s.title}>Discount 35%</h1>
      <Filters />
      {isLoading && <Loader />}
      {!isLoading && (
        <div>
          <ul className={s.list}>
            {filteredProducts.map((product) => (
              <li key={product._id} className={s.item}>
                <LazyImage
                  src={product.photo}
                  alt={product.name}
                  className={s.image}
                />

                <div className={s.info}>
                  <div className={s.left}>
                    <p className={s.name}>{product.name}</p>
                    <p className={s.supplier}>{product.suppliers}</p>
                    <button
                      className={s.button}
                      onClick={() => handleClick(product)}>
                      Add to cart
                    </button>
                  </div>

                  <div className={s.right}>
                    <p className={s.price}>৳{product.price}</p>
                    <NavLink to={`/products/${product._id}`} className={s.link}>
                      Details
                    </NavLink>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

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

export default Discount35;
