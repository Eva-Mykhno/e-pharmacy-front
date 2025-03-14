import clsx from "clsx";
import MedicineStore from "../../components/MedicineStore/MedicineStore";
import s from "./MedicineStorePage.module.css";

const MedicineStorePage = () => {
  return (
    <main className={clsx(s.page, "container")}>
      <MedicineStore />
    </main>
  );
};

export default MedicineStorePage;
