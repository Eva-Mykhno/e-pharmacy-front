import s from "./MainContent.module.css";

const MainContent = () => {
  return (
    <section className={s.info}>
      <p className={s.text}>
        Your medication, delivered Say goodbye to all{" "}
        <span className={s.span}>your healthcare</span> worries with us
      </p>
    </section>
  );
};

export default MainContent;
