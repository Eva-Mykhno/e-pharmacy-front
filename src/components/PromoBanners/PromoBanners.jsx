import { NavLink } from "react-router-dom";
import s from "./PromoBanners.module.css";

const PromoBanners = () => {
  const banners = [
    {
      number: 1,
      title: "Huge Sale",
      discount: "70%",
      link: "/medicine/discount70",
      linkText: "Shop now",
    },
    {
      number: 2,
      title: "Secure delivery",
      discount: "100%",
      link: "/#Features",
      linkText: "Read more",
    },
    {
      number: 3,
      title: "Off",
      discount: "35%",
      link: "/medicine/discount35",
      linkText: "Shop now",
    },
  ];

  return (
    <ol className={s.list}>
      {banners.map(({ number, title, discount, link, linkText }) => (
        <li key={number} className={s.item}>
          <div className={s.top}>
            <span className={s.number}>{number}</span>
            <h3 className={s.title}>{title}</h3>
          </div>
          <div className={s.bottom}>
            <p className={s.text}>{discount}</p>
            <NavLink to={link} className={s.link}>
              {linkText}
            </NavLink>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default PromoBanners;
