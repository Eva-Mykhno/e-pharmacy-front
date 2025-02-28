import s from "./SocialLinks.module.css";

const sprite = "/sprite.svg";

const SocialLinks = () => {
  return (
    <ul className={s.list}>
      <li className={s.item}>
        <a
          href="https://www.facebook.com/goITclub/"
          target="_blank"
          rel="noopener noreferrer">
          <div className={s.wrap}>
            <svg className={s.icon}>
              <use href={`${sprite}#icon-facebook`} />
            </svg>
          </div>
        </a>
      </li>
      <li className={s.item}>
        <a
          href="https://www.instagram.com/goitclub/"
          target="_blank"
          rel="noopener noreferrer">
          <div className={s.wrap}>
            <svg className={s.icon}>
              <use href={`${sprite}#icon-instagram`} />
            </svg>
          </div>
        </a>
      </li>
      <li className={s.item}>
        <a
          href="https://www.youtube.com/c/GoIT"
          target="_blank"
          rel="noopener noreferrer">
          <div className={s.wrap}>
            <svg className={s.icon}>
              <use href={`${sprite}#icon-youtube`} />
            </svg>
          </div>
        </a>
      </li>
    </ul>
  );
};

export default SocialLinks;
