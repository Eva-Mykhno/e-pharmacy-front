import clsx from "clsx";
import ProductOverview from "../../components/ProductsOverview/ProductOverview";
import s from "./ProductPage.module.css";

const ProductPage = () => {
  return (
    <main className={clsx(s.page, "container")}>
      <ProductOverview />
    </main>
  );
};

export default ProductPage;
