import clsx from "clsx";
import s from "./Header.module.css";
import Logo from "../Logo/Logo";
import NavLinks from "../NavLinks/NavLinks";

const Header = () => {
  return (
    <header className={clsx(s.header, "container")}>
      <Logo />
      <NavLinks />
    </header>
  );
};

export default Header;
