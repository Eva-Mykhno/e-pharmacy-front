import clsx from "clsx";

import s from "./DiscountPages.module.css";
import Discount70 from "../../components/Discount70/Discount70";

const Discount70Page = () => {
  return (
    <main className={clsx(s.page, "container")}>
      <Discount70 />
    </main>
  );
};

export default Discount70Page;
