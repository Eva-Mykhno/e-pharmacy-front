import clsx from "clsx";
import s from "./HomePage.module.css";
import MainBanner from "../../components/MainBanner/MainBanner";
import PromoBanners from "../../components/PromoBanners/PromoBanners";

const HomePage = () => {
  return (
    <main className={clsx(s.page, "container")}>
      <MainBanner />
      <PromoBanners />
    </main>
  );
};

export default HomePage;
