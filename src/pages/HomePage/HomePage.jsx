import clsx from "clsx";
import MainBanner from "../../components/MainBanner/MainBanner";
import PromoBanners from "../../components/PromoBanners/PromoBanners";
import MedicineStores from "../../components/MedicineStores/MedicineStores";
import AddPharmacy from "../../components/AddPharmacy/AddPharmacy";
import Features from "../../components/Features/Features";
import Reviews from "../../components/Reviews/Reviews";
import s from "./HomePage.module.css";

const HomePage = () => {
  return (
    <main className={clsx(s.page, "container")}>
      <MainBanner />
      <PromoBanners />
      <MedicineStores />
      <AddPharmacy />
      <Features id="features" />
      <Reviews />
    </main>
  );
};

export default HomePage;
