import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import s from "./AuthLinks.module.css";

const AuthLinks = ({ isModal = false, onClose }) => {
  const location = useLocation();
  const isHomeOrModal = location.pathname === "/home" || isModal;

  return (
    <ul className={s.list}>
      <li>
        <NavLink
          to="/register"
          onClick={onClose}
          className={clsx(s.register, { [s.desktop]: !isHomeOrModal })}>
          Register
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/login"
          onClick={onClose}
          className={clsx(s.login, { [s.desktop]: !isHomeOrModal })}>
          Login
        </NavLink>
      </li>
    </ul>
  );
};

export default AuthLinks;
