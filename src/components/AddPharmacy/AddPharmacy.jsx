import { NavLink } from "react-router-dom";
import s from "./AddPharmacy.module.css";

const AddPharmacy = () => {
  return (
    <section className={s.section}>
      <h2 className={s.title}>Add the medicines you need online now</h2>
      <p className={s.text}>
        Enjoy the convenience of having your prescriptions filled from home by
        connecting with your community pharmacy through our online platform.
      </p>
      <NavLink to="/medicine-store" className={s.link}>
        Buy medicine
      </NavLink>
    </section>
  );
};

export default AddPharmacy;
