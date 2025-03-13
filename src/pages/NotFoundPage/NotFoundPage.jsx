import { NavLink } from "react-router-dom";
import s from "./NotFoundPage.module.css";
import clsx from "clsx";

const NotFoundPage = () => {
  return (
    <main className={clsx(s.page, "container")}>
      <p className={s.text}>
        Sorry... This page is not found. You can go to the Homepage.
      </p>
      <div className={s.back}>
        <NavLink to="/home">
          <p className={s.backText}>Home</p>
        </NavLink>
      </div>
    </main>
  );
};
export default NotFoundPage;
