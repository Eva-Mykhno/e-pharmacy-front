// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import {
//   selectIsLoading,
//   selectIsLoggedIn,
//   selectIsRefreshing,
// } from "../redux/auth/selectors";
// import Loader from "../components/Loader/Loader";

// const PrivateRoute = ({ children }) => {
//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   const isRefreshing = useSelector(selectIsRefreshing);
//   const isLoading = useSelector(selectIsLoading);

//   console.log("PrivateRoute -> isLoggedIn:", isLoggedIn);
//   console.log("PrivateRoute -> isRefreshing:", isRefreshing);
//   console.log("PrivateRoute -> isLoading:", isLoading);

//   if (isRefreshing || isLoading) {
//     return <Loader />;
//   }

//   if (!isLoggedIn) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default PrivateRoute;
