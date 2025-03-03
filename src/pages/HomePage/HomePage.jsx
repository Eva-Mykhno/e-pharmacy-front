import clsx from "clsx";
import s from "./HomePage.module.css";
import MainBanner from "../../components/MainBanner/MainBanner";
import PromoBanners from "../../components/PromoBanners/PromoBanners";
import MedicineStores from "../../components/MedicineStores/MedicineStores";
import AddPharmacy from "../../components/AddPharmacy/AddPharmacy";

const HomePage = () => {
  return (
    <main className={clsx(s.page, "container")}>
      <MainBanner />
      <PromoBanners />
      <MedicineStores />
      <AddPharmacy />
    </main>
  );
};

export default HomePage;
