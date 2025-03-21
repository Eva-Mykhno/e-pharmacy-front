import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import Logo from "../Logo/Logo";
import NavLinks from "../NavLinks/NavLinks";
import AuthLinks from "../AuthLinks/AuthLinks";
import ModalNav from "../ModalNav/ModalNav";
import Logout from "../Logout/Logout";
import UserInfo from "../UserInfo/UserInfo";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors";
import s from "./Header.module.css";

const sprite = "/sprite.svg";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === "/home";

  if (isRefreshing) {
    return null;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={clsx(s.wrapper, { [s.home]: isHome })}>
      <header className={clsx(s.header, { [s.home]: isHome }, "container")}>
        <NavLink to="/home">
          <Logo color={isHome ? "white" : "green"} />
        </NavLink>

        <div className={s.mobile}>
          {isLoggedIn && <UserInfo />}
          <button
            onClick={() => openModal()}
            type="button"
            className={s.button}>
            <svg className={clsx(s.menu, { [s.home]: isHome })}>
              <use href={`${sprite}#icon-menu`} />
            </svg>
          </button>

          <ModalNav isOpen={isModalOpen} onClose={closeModal}>
            <div className={s.buttons}>
              <div className={s.nav}>
                <NavLinks variant="header" onClose={closeModal} />
              </div>
              {isLoggedIn ? (
                <Logout isModal={true} onClose={closeModal} />
              ) : (
                <AuthLinks isModal={true} onClose={closeModal} />
              )}
            </div>
          </ModalNav>
        </div>

        <div className={s.desktop}>
          <NavLinks variant="header" />
          {isLoggedIn ? (
            <div className={s.info}>
              <UserInfo />
              <Logout />
            </div>
          ) : (
            <AuthLinks />
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
