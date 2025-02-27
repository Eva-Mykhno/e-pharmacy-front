import s from "./FooterBottom.module.css";

const FooterBottom = () => {
  return (
    <div className={s.wrap}>
      <p className={s.text}>© E-Pharmacy 2023. All Rights Reserved</p>
      <p className={s.text}>Privacy Policy</p>
      <p className={s.text}>Terms & Conditions</p>
    </div>
  );
};

export default FooterBottom;
