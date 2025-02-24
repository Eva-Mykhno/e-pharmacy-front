import { RingLoader } from "react-spinners";
import s from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={s.loader}>
      <RingLoader color="#3f945f" size={100} />;
    </div>
  );
};
