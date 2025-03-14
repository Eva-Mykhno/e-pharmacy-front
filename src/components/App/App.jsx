import { lazy, Suspense } from "react";
import Loader from "../Loader/Loader";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "../../routes/PrivateRoute.jsx";

const RegisterPage = lazy(() =>
  import("../../pages/RegisterPage/RegisterPage")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const Layout = lazy(() => import("../../components/Layout/Layout"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MedicineStorePage = lazy(() =>
  import("../../pages/MedicineStorePage/MedicineStorePage")
);
const MedicinePage = lazy(() =>
  import("../../pages/MedicinePage/MedicinePage")
);
const ProductPage = lazy(() => import("../../pages/ProductPage/ProductPage"));
const CartPage = lazy(() => import("../../pages/CartPage/CartPage.jsx"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);
const Discount35Page = lazy(() =>
  import("../../pages/DiscountPages/Discount35Page.jsx")
);
const Discount70Page = lazy(() =>
  import("../../pages/DiscountPages/Discount70Page.jsx")
);

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/medicine-store" element={<MedicineStorePage />} />
          <Route path="/medicine" element={<MedicinePage />} />
          <Route path="/medicine/discount35" element={<Discount35Page />} />
          <Route path="/medicine/discount70" element={<Discount70Page />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
