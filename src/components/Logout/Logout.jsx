import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { logout } from "../../redux/auth/operations";
import s from "./Logout.module.css";

const Logout = ({ isModal = false, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomeOrModal = location.pathname === "/home" || isModal;

  const handleClick = async () => {
    await dispatch(logout());
    navigate("/home");
    if (onClose) onClose();
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={clsx(s.button, { [s.desktop]: !isHomeOrModal })}>
      Log out
    </button>
  );
};

export default Logout;
