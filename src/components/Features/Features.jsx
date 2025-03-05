import s from "./Features.module.css";

const sprite = "/sprite.svg";

const Features = () => {
  return (
    <section id="features" className={s.marquee}>
      <ul className={s.list}>
        <li className={s.item}>
          <svg className={s.icon}>
            <use href={`${sprite}#icon-lightning`} />
          </svg>
          <p className={s.text}>Take user orders form online</p>
        </li>

        <li className={s.item}>
          <svg className={s.icon}>
            <use href={`${sprite}#icon-lightning`} />
          </svg>
          <p className={s.text}>Create your shop profile</p>
        </li>

        <li className={s.item}>
          <svg className={s.icon}>
            <use href={`${sprite}#icon-lightning`} />
          </svg>
          <p className={s.text}>Manage your store</p>
        </li>

        <li className={s.item}>
          <svg className={s.icon}>
            <use href={`${sprite}#icon-lightning`} />
          </svg>
          <p className={s.text}>Get more orders</p>
        </li>

        <li className={s.item}>
          <svg className={s.icon}>
            <use href={`${sprite}#icon-lightning`} />
          </svg>
          <p className={s.text}>Storage shed</p>
        </li>
      </ul>
    </section>
  );
};

export default Features;
