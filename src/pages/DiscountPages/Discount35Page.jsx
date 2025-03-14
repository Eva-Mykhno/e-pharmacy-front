import clsx from "clsx";
import Discount35 from "../../components/Discount35/Discount35";
import s from "./DiscountPages.module.css";

const Discount35Page = () => {
  return (
    <main className={clsx(s.page, "container")}>
      <Discount35 />
    </main>
  );
};

export default Discount35Page;
