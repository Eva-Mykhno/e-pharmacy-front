import { RingLoader } from "react-spinners";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.loader}>
      <RingLoader color="#3f945f" size={100} />;
    </div>
  );
};

export default Loader;
