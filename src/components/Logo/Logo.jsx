import clsx from "clsx";
import { useLogo } from "../../context/useLogo";
import s from "./Logo.module.css";

const Logo = ({ color }) => {
  const { headerLogoColor } = useLogo();

  const logoColor = color || headerLogoColor;

  return (
    <div className={s.logo}>
      <picture>
        <source
          srcSet={`/img/${logoColor}-logo-1x.webp 1x, /img/${logoColor}-logo-2x.webp 2x, /img/${logoColor}-logo-1x.png 1x, /img/${logoColor}-logo-2x.png 2x`}
        />
        <img
          src={`/img/${logoColor}-logo-1x.png`}
          alt="logo"
          className={s.image}
        />
      </picture>
      <h2 className={clsx(s.title, s[logoColor])}>E-Pharmacy</h2>
    </div>
  );
};

export default Logo;
