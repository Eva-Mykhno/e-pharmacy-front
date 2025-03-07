import { useState } from "react";
import clsx from "clsx";
import Description from "../Description/Description";
import ProductReviews from "../ProductReviews/ProductReviews";
import s from "./TabsContainer.module.css";

const TabsContainer = () => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className={s.wrapper}>
      <div className={s.buttons}>
        <button
          className={clsx(s.button, {
            [s.active]: activeTab === "description",
          })}
          type="button"
          onClick={() => setActiveTab("description")}>
          Description
        </button>
        <button
          className={clsx(s.button, { [s.active]: activeTab === "reviews" })}
          type="button"
          onClick={() => setActiveTab("reviews")}>
          Reviews
        </button>
      </div>

      {activeTab === "description" ? <Description /> : <ProductReviews />}
    </div>
  );
};

export default TabsContainer;
