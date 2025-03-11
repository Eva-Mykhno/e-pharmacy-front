import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import s from "./AuthLinks.module.css";

const AuthLinks = ({ isModal = false }) => {
  const location = useLocation();
  const isHomeOrModal = location.pathname === "/home" || isModal;

  return (
    <ul className={s.list}>
      <li>
        <NavLink
          to="/register"
          className={clsx(s.register, { [s.desktop]: !isHomeOrModal })}>
          Register
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/login"
          className={clsx(s.login, { [s.desktop]: !isHomeOrModal })}>
          Login
        </NavLink>
      </li>
    </ul>
  );
};

export default AuthLinks;
