import { NavLink } from "react-router-dom";
import clsx from "clsx";
import Logo from "../Logo/Logo";
import NavLinks from "../NavLinks/NavLinks";
import SocialLinks from "../SocialLinks/SocialLinks";
import FooterBottom from "../FooterBottom/FooterBottom";
import s from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={clsx(s.footer, "container")}>
      <div className={s.wrap}>
        <div className={s.info}>
          <NavLink to="/home">
            <Logo color="white" />
          </NavLink>
          <p className={s.text}>
            Get the medicine to help you feel better, get back to your active
            life, and enjoy every moment.
          </p>
        </div>

        <div className={s.links}>
          <NavLinks variant="footer" />
          <SocialLinks />
        </div>
      </div>

      <FooterBottom />
    </footer>
  );
};

export default Footer;
