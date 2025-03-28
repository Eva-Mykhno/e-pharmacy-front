import s from "./MainBanner.module.css";

const MainBanner = () => {
  return (
    <section className={s.background}>
      <div className="container">
        <div className={s.hero}>
          <div className={s.info}>
            <h2 className={s.title}>Your medication delivered</h2>
            <p className={s.text}>
              Say goodbye to all your healthcare worries with us
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
