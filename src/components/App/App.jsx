import { lazy, Suspense } from "react";
import Loader from "../Loader/Loader";
import { Routes, Route } from "react-router-dom";
// import PrivateRoute from "../../routes/PrivateRoute.jsx";

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

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/medicine-store" element={<MedicineStorePage />} />
          <Route path="/medicine" element={<MedicinePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
