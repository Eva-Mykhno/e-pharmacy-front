import { NavLink } from "react-router-dom";
import s from "./PromoBanners.module.css";

const PromoBanners = () => {
  return (
    <ol className={s.list}>
      <li className={s.item}>
        <h3 className={s.title}>Huge Sale</h3>
        <p className={s.text}>70%</p>
        <NavLink to="/medicine/discount70" className={s.link}>
          Shop now
        </NavLink>
      </li>
      <li className={s.item}>
        <h3 className={s.title}>Secure delivery</h3>
        <p className={s.text}>100%</p>
        <NavLink to="/#Features" className={s.link}>
          Read more
        </NavLink>
      </li>
      <li className={s.item}>
        <h3 className={s.title}>Huge Sale</h3>
        <p className={s.text}>35%</p>
        <NavLink to="/medicine/discount35" className={s.link}>
          Shop now
        </NavLink>
      </li>
    </ol>
  );
};

export default PromoBanners;
