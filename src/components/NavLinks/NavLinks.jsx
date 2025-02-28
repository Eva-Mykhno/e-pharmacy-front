import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import s from "./NavLinks.module.css";

const NavLinks = ({ variant }) => {
  const location = useLocation();

  return (
    <nav>
      <ul className={clsx(s.navList, s[variant])}>
        {[
          { to: "/home", label: "Home" },
          { to: "/medicine-store", label: "Medicine store" },
          { to: "/medicine", label: "Medicine" },
        ].map(({ to, label }) => {
          const isActive = variant === "header" && location.pathname === to;

          return (
            <li key={to}>
              <NavLink
                to={to}
                className={clsx(s.item, s[variant], { [s.active]: isActive })}>
                {label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavLinks;
