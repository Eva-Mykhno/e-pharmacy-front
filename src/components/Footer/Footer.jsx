import { NavLink } from "react-router-dom";

import s from "./Footer.module.css";
import Logo from "../Logo/Logo";
import NavLinks from "../NavLinks/NavLinks";
import SocialLinks from "../SocialLinks/SocialLinks";
import FooterBottom from "../FooterBottom/FooterBottom";

const Footer = () => {
  return (
    <footer className={s.wrap}>
      <NavLink to="/home">
        <Logo color="white" />
      </NavLink>
      <p className={s.text}>
        Get the medicine to help you feel better, get back to your active life,
        and enjoy every moment.
      </p>
      <SocialLinks />
      <NavLinks variant="footer" />
      <FooterBottom />
    </footer>
  );
};

export default Footer;
