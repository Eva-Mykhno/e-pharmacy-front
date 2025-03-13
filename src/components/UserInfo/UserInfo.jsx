import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import s from "./UserInfo.module.css";
import {
  selectAccessToken,
  selectUser,
  selectUserName,
} from "../../redux/auth/selectors";
import { selectCartCount } from "../../redux/carts/selectors";
import { useEffect } from "react";
import { fetchUser } from "../../redux/auth/operations";
import { useLocation, useNavigate } from "react-router-dom";

const sprite = "/sprite.svg";

const UserInfo = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectUserName);
  const accessToken = useSelector(selectAccessToken);
  const user = useSelector(selectUser);
  const cartCount = useSelector(selectCartCount);

  const location = useLocation();
  const isHome = location.pathname === "/home";

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken && !user) {
      dispatch(fetchUser());
    }
  }, [dispatch, accessToken, user]);

  if (!name) {
    return <div>Name not found</div>;
  }

  const firstLetter = name.charAt(0).toUpperCase();

  const handleClick = () => {
    navigate("/cart");
  };

  return (
    <div className={clsx(s.wrapper, { [s.home]: isHome })}>
      <div className={s.back} onClick={handleClick}>
        <svg className={s.cart}>
          <use href={`${sprite}#icon-cart`} />
        </svg>
        {cartCount > 0 ? (
          <span className={s.badge}>{cartCount}</span>
        ) : (
          <span className={s.badge}>0</span>
        )}
      </div>

      <p className={s.letter}>{firstLetter}</p>
    </div>
  );
};

export default UserInfo;
