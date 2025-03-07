import { useState, useEffect } from "react";
import s from "./ProductReviews.module.css";

const sprite = "/sprite.svg";

const ProductReviews = () => {
  const [starsCount, setStarsCount] = useState(1);

  useEffect(() => {
    const updateStars = () => {
      setStarsCount(window.innerWidth >= 768 ? 5 : 1);
    };

    updateStars();
    window.addEventListener("resize", updateStars);
    return () => window.removeEventListener("resize", updateStars);
  }, []);

  const reviews = [
    {
      id: 1,
      name: "Leroy Jenkins",
      date: "2 days ago",
      img: "/img/one-1x.jpg",
      imgSrcSet:
        "/img/one-1x.webp 1x, /img/one-2x.webp 2x, /img/one-1x.jpg 1x, /img/one-2x.jpg 2x",
      rating: 4,
      text: "I’ve been using Moringa powder in my smoothies for a few weeks now. My energy levels are up, and I feel great. I followed the recommended dosage, and it seems to be a perfect addition to my daily routine. Highly recommend!",
    },
    {
      id: 2,
      name: "Leroy Jenkins",
      date: "2 days ago",
      img: "/img/two-1x.jpg",
      imgSrcSet:
        "/img/two-1x.webp 1x, /img/two-2x.webp 2x, /img/two-1x.jpg 1x, /img/two-2x.jpg 2x",
      rating: 4,
      text: "I’ve been using Moringa powder in my smoothies for a few weeks now. My energy levels are up, and I feel great. I followed the recommended dosage, and it seems to be a perfect addition to my daily routine. Highly recommend!",
    },
    {
      id: 3,
      name: "Leroy Jenkins",
      date: "2 days ago",
      img: "/img/three-1x.jpg",
      imgSrcSet:
        "/img/three-1x.webp 1x, /img/three-2x.webp 2x, /img/three-1x.jpg 1x, /img/three-2x.jpg 2x",
      rating: 4,
      text: "I’ve been using Moringa powder in my smoothies for a few weeks now. My energy levels are up, and I feel great. I followed the recommended dosage, and it seems to be a perfect addition to my daily routine. Highly recommend!",
    },
  ];

  return (
    <ul className={s.list}>
      {reviews.map(({ id, name, date, img, imgSrcSet, rating, text }) => (
        <li key={id} className={s.item}>
          <div className={s.wrapper}>
            <div className={s.photo}>
              <picture>
                <source srcSet={imgSrcSet} />
                <img src={img} alt={`${name} photo`} className={s.image} />
              </picture>
              <div className={s.info}>
                <p className={s.name}>{name}</p>
                <p className={s.date}>{date}</p>
              </div>
            </div>

            <div className={s.rating}>
              <div className={s.stars}>
                {[...Array(starsCount)].map((_, index) => (
                  <svg
                    key={index}
                    className={s.star}
                    style={{
                      fill:
                        index < rating
                          ? "var(--yellow)"
                          : "var(--border-banner)",
                    }}>
                    <use href={`${sprite}#icon-star`} />
                  </svg>
                ))}
              </div>
              <p className={s.number}>4</p>
            </div>
          </div>
          <p className={s.text}>{text}</p>
        </li>
      ))}
    </ul>
  );
};

export default ProductReviews;
