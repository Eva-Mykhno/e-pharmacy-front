import clsx from "clsx";
import Medicine from "../../components/Medicine/Medicine";
import s from "./MedicinePage.module.css";

const MedicinePage = () => {
  return (
    <main className={clsx(s.page, "container")}>
      <Medicine />
    </main>
  );
};

export default MedicinePage;
