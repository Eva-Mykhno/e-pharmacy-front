import { useDispatch, useSelector } from "react-redux";
import s from "./UserInfo.module.css";
import {
  selectAccessToken,
  selectUser,
  selectUserName,
} from "../../redux/auth/selectors";
import { useEffect } from "react";
import { fetchUser } from "../../redux/auth/operations";

const sprite = "/sprite.svg";

const UserInfo = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectUserName);
  const accessToken = useSelector(selectAccessToken);
  const user = useSelector(selectUser);

  useEffect(() => {
    console.log("useEffect triggered:", { accessToken, user });
    if (accessToken && !user) {
      dispatch(fetchUser());
    }
  }, [dispatch, accessToken, user]);

  if (!name) {
    return <div>Name not found</div>;
  }

  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div className={s.wrapper}>
      <svg className={s.cart}>
        <use href={`${sprite}#icon-cart`} />
      </svg>

      <p className={s.letter}>{firstLetter}</p>
    </div>
  );
};

export default UserInfo;
