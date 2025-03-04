import clsx from "clsx";
import s from "./MedicineStorePage.module.css";
import MedicineStore from "../../components/MedicineStore/MedicineStore";

const MedicineStorePage = () => {
  return (
    <main className={clsx(s.page, "container")}>
      <MedicineStore />
    </main>
  );
};

export default MedicineStorePage;
