import s from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={s.logo}>
      <picture>
        <source srcSet="/img/green-logo-1x.webp 1x, /img/green-logo-2x.webp 2x, /img/green-logo-1x.png 1x, /img/green-logo-2x.png 2x" />
        <img src="/img/green-logo-1x.png" alt="logo" className={s.image} />
      </picture>
      <h2 className={s.title}>E-Pharmacy</h2>
    </div>
  );
};

export default Logo;
