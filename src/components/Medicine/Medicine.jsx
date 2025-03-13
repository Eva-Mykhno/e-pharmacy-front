import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  selectCurrentPage,
  selectFilters,
  selectIsLoading,
  selectPerPage,
  selectProducts,
  selectTotalPages,
} from "../../redux/products/selectors";
import { setCurrentPage, setProductsPerPage } from "../../redux/products/slice";
import { fetchProducts } from "../../redux/products/operations";
import { selectUser } from "../../redux/auth/selectors";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";
import LazyImage from "../LazyImage/LazyImage";
import Filters from "../Filters/Filters";
import Modal from "../Modal/Modal";
import LoginPop from "../LoginPop/LoginPop";
import RegisterPop from "../RegisterPop/RegisterPop";
import s from "./Medicine.module.css";
import { updateCart } from "../../redux/carts/operations";

const success = () => toast.success("Product added to cart!");
const error = (message) => toast.error(message);

const Medicine = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const perPage = useSelector(selectPerPage);
  const filters = useSelector(selectFilters);
  const user = useSelector(selectUser);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    const updateProductsPerPage = () => {
      const width = window.innerWidth;
      let productsPerPage = 8;

      if (width >= 1440) {
        productsPerPage = 12;
      } else if (width >= 768) {
        productsPerPage = 9;
      }

      if (productsPerPage !== perPage) {
        dispatch(setProductsPerPage(productsPerPage));
        dispatch(setCurrentPage(1));
      }
    };

    updateProductsPerPage();
    window.addEventListener("resize", updateProductsPerPage);

    return () => {
      window.removeEventListener("resize", updateProductsPerPage);
    };
  }, [dispatch, perPage]);

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, perPage }));
  }, [dispatch, currentPage, perPage, filters]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setCurrentPage(newPage));
    }
  };

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

  return (
    <div className={s.wrapper}>
      <Toaster position="top-center" reverseOrder={true} />
      <h1 className={s.title}>Medicine</h1>
      <Filters />
      {isLoading && <Loader />}
      {!isLoading && products.length > 0 && (
        <ul className={s.list}>
          {products.map((product) => (
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
      )}

      {products.length > 0 && products.length >= perPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
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

export default Medicine;
