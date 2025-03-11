import clsx from "clsx";
import s from "./Header.module.css";
import Logo from "../Logo/Logo";
import NavLinks from "../NavLinks/NavLinks";
import AuthLinks from "../AuthLinks/AuthLinks";
import ModalNav from "../ModalNav/ModalNav";
import Logout from "../Logout/Logout";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectIsLoading,
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors";
import UserInfo from "../UserInfo/UserInfo";
import Loader from "../Loader/Loader";

const sprite = "/sprite.svg";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoading = useSelector(selectIsLoading);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <header className={clsx(s.header, "container")}>
      <Logo />
      <div className={s.mobile}>
        {isLoading && <Loader />}
        {isLoggedIn && <UserInfo />}
        <button onClick={() => openModal()} type="button" className={s.button}>
          <svg className={s.menu}>
            <use href={`${sprite}#icon-menu`} />
          </svg>
        </button>

        <ModalNav isOpen={isModalOpen} onClose={closeModal}>
          <div className={s.buttons}>
            <div className={s.nav}>
              <NavLinks variant="header" />
            </div>
            {isLoggedIn ? (
              <Logout isModal={true} />
            ) : (
              <AuthLinks isModal={true} />
            )}
          </div>
        </ModalNav>
      </div>

      <div className={s.desktop}>
        <NavLinks variant="header" />
        {isLoggedIn ? (
          <div>
            <UserInfo />
            <Logout />
          </div>
        ) : (
          <AuthLinks />
        )}
      </div>
    </header>
  );
};

export default Header;
