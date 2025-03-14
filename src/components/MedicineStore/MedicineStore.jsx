import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import {
  selectCurrentPage,
  selectIsLoading,
  selectPerPage,
  selectPharmacies,
  selectTotalPages,
} from "../../redux/pharmacies/selectors";
import {
  setCurrentPage,
  setPharmaciesPerPage,
} from "../../redux/pharmacies/slice";
import { fetchPharmacies } from "../../redux/pharmacies/operations";
import s from "./MedicineStore.module.css";

const sprite = "/sprite.svg";

const MedicineStore = () => {
  const dispatch = useDispatch();
  const pharmacies = useSelector(selectPharmacies);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const perPage = useSelector(selectPerPage);

  useEffect(() => {
    const updatePharmaciesPerPage = () => {
      const width = window.innerWidth;
      let pharmaciesPerPage = 8;
      if (width >= 1440) {
        pharmaciesPerPage = 9;
      }

      if (pharmaciesPerPage !== perPage) {
        dispatch(setPharmaciesPerPage(pharmaciesPerPage));
        dispatch(setCurrentPage(1));
      }
    };

    updatePharmaciesPerPage();
    window.addEventListener("resize", updatePharmaciesPerPage);

    return () => {
      window.removeEventListener("resize", updatePharmaciesPerPage);
    };
  }, [dispatch, perPage]);

  useEffect(() => {
    dispatch(fetchPharmacies({ page: currentPage, perPage }));
  }, [dispatch, currentPage, perPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setCurrentPage(newPage));
    }
  };

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Medicine Store</h1>

      {isLoading && <Loader />}
      {!isLoading && pharmacies.length > 0 && (
        <ul className={s.list}>
          {pharmacies.map((pharmacy) => (
            <li key={pharmacy._id} className={s.item}>
              <div className={s.info}>
                <p className={s.name}>{pharmacy.name}</p>

                <div className={s.contact}>
                  <svg className={s.icon}>
                    <use href={`${sprite}#icon-map-pin`} />
                  </svg>
                  <p className={s.address}>{pharmacy.address}</p>
                </div>

                <p className={s.city}>{pharmacy.city}</p>

                <div className={s.contact}>
                  <svg className={s.icon}>
                    <use href={`${sprite}#icon-phone`} />
                  </svg>
                  <p className={s.address}>{pharmacy.phone}</p>
                </div>

                <NavLink to="/medicine" className={s.link}>
                  Visit Store
                </NavLink>
              </div>

              <div className={s.wrap}>
                <div className={s.block}>
                  <svg className={s.star}>
                    <use href={`${sprite}#icon-star`} />
                  </svg>
                  <p className={s.rating}>{pharmacy.rating}</p>
                </div>

                <p className={pharmacy.isOpen === "open" ? s.open : s.close}>
                  {pharmacy.isOpen}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default MedicineStore;
