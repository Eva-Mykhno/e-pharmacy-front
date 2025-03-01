import { useDispatch, useSelector } from "react-redux";
import s from "./MedicineStores.module.css";
import { useEffect, useState } from "react";
import { selectIsLoading, selectNearests } from "../../redux/nearest/selectors";
import { fetchNearests } from "../../redux/nearest/operations";
import Loader from "../Loader/Loader";

const sprite = "/sprite.svg";

const MedicineStores = () => {
  const dispatch = useDispatch();
  const nearests =
    useSelector(selectNearests) ?? "Nearest pharmacies not found";
  const isLoading = useSelector(selectIsLoading);
  const [randomNearests, setRandomNearests] = useState([]);

  const getRandomNearests = (nearests, count) => {
    if (nearests.length <= count) return nearests;
    const shuffled = [...nearests].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    dispatch(fetchNearests());
  }, [dispatch]);

  useEffect(() => {
    if (nearests.length > 0) {
      setRandomNearests(getRandomNearests(nearests, 6));
    }
  }, [nearests]);

  return (
    <section className={s.nearest}>
      <h2 className={s.title}>Your Nearest Medicine Store</h2>
      <p className={s.text}>Search for Medicine, Filter by your location</p>

      {isLoading && <Loader />}
      {!isLoading && randomNearests.length > 0 && (
        <ul className={s.list}>
          {randomNearests.map((nearest) => (
            <li key={nearest._id} className={s.item}>
              <div className={s.top}>
                <h3 className={s.name}>{nearest.name}</h3>
                <div className={s.wrapper}>
                  <p className={s.raiting}>{nearest.raiting}</p>
                  <p className={nearest.isOpen === "open" ? s.open : s.close}>
                    {nearest.isOpen}
                  </p>
                </div>
              </div>
              <div className={s.wrap}>
                <div className={s.iconAndText}>
                  <svg className={s.icon}>
                    <use href={`${sprite}#icon-map-pin`} />
                  </svg>
                  <p className={s.address}>{nearest.address}</p>
                </div>
                <div className={s.iconAndText}>
                  <svg className={s.icon}>
                    <use href={`${sprite}#icon-phone`} />
                  </svg>
                  <p className={s.address}>{nearest.phone}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MedicineStores;
