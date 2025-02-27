// import { Outlet } from "react-router-dom";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Header from "../Header/Header";
// import { refresh } from "../../redux/auth/operations";
// import {
//   selectIsRefreshing,
//   selectIsLoggedIn,
//   selectUser,
// } from "../../redux/auth/selectors";
// import Footer from "../Footer/Footer";

// const Layout = () => {
//   const dispatch = useDispatch();
//   const isRefreshing = useSelector(selectIsRefreshing);
//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   const user = useSelector(selectUser);

//   useEffect(() => {
//     if (!isRefreshing && !isLoggedIn && user?.token) {
//       dispatch(refresh());
//     }
//   }, [dispatch, isRefreshing, isLoggedIn, user?.token]);

//   return (
//     <div className="container">
//       <Header />
//       <Footer />
//       <Outlet />
//     </div>
//   );
// };

// export default Layout;

import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Header from "../Header/Header";
import { refresh } from "../../redux/auth/operations";
import {
  selectIsRefreshing,
  selectIsLoggedIn,
  selectAccessToken,
} from "../../redux/auth/selectors";
import Footer from "../Footer/Footer";

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
    <div className="container">
      <Header />
      <Footer />
      <Outlet />
    </div>
  );
};

export default Layout;
