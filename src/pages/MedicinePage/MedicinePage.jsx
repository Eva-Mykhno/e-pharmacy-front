import clsx from "clsx";
import s from "./MedicinePage.module.css";
import Medicine from "../../components/Medicine/Medicine";

const MedicinePage = () => {
  return (
    <main className={clsx(s.page, "container")}>
      <Medicine />
    </main>
  );
};

export default MedicinePage;
