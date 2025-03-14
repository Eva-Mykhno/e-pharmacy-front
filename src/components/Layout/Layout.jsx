import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import { refresh } from "../../redux/auth/operations";
import {
  selectIsRefreshing,
  selectIsLoggedIn,
  selectAccessToken,
} from "../../redux/auth/selectors";
import Footer from "../Footer/Footer";
import { LogoProvider } from "../../context/LogoProvider";

const Layout = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectAccessToken);

  const hasRefreshed = useRef(false);

  useEffect(() => {
    if (!isRefreshing && !isLoggedIn && token && !hasRefreshed.current) {
      dispatch(refresh());
      hasRefreshed.current = true;
    }
  }, [dispatch, isRefreshing, isLoggedIn, token]);
  return (
    <LogoProvider>
      <Header />
      <Outlet />
      <Footer />
    </LogoProvider>
  );
};

export default Layout;
