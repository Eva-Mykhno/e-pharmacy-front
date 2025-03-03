import { useDispatch, useSelector } from "react-redux";
import s from "./Reviews.module.css";
import { selectIsLoading, selectReviews } from "../../redux/reviews/selectors";
import { useEffect, useState } from "react";
import { fetchReviews } from "../../redux/reviews/operations";
import Loader from "../Loader/Loader";

const Reviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews);
  const isLoading = useSelector(selectIsLoading);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const getName = (name) => {
    return name.split(" ")[0];
  };

  const getImagePath = (fullName) => {
    const firstName = getName(fullName);
    return `/img/${firstName.toLowerCase()}.jpg`;
  };

  const getReviews = () => {
    if (windowWidth < 768) return 1;
    if (windowWidth <= 1439) return 2;
    return 3;
  };

  return (
    <section className={s.section}>
      <h2 className={s.title}>Reviews</h2>
      <p className={s.text}>Search for Medicine, Filter by your location</p>

      {isLoading && <Loader />}
      {!isLoading && reviews.length > 0 && (
        <ul className={s.list}>
          {reviews.slice(0, getReviews()).map((review) => (
            <li key={review._id} className={s.item}>
              <img
                src={getImagePath(review.name)}
                alt={review.name}
                className={s.img}
              />
              <p className={s.name}>{review.name}</p>
              <p className={s.review}>{review.testimonial}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Reviews;
