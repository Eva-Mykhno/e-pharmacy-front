import s from "./Description.module.css";

const Description = () => {
  return (
    <div className={s.descr}>
      <p className={s.text}>
        Although it&rsquo;s typically considered safe, excessive consumption can
        lead to side effects. Therefore, it&rsquo;s recommended to consult a
        healthcare professional before using moringa, especially if you&rsquo;re
        pregnant, nursing, or taking other medications. This balanced approach
        allows for the benefits of moringa while recognizing the importance of
        proper usage and caution.
      </p>
      <p className={s.text}>
        Medicinal Uses: Antioxidant Properties:{" "}
        <span className={s.span}>
          Moringa is packed with antioxidants that help fight oxidative stress
          and inflammation in the body.
        </span>
      </p>

      <p className={s.text}>
        Anti-Diabetic Effects:{" "}
        <span className={s.span}>
          Some studies have shown that moringa leaves might lower blood sugar
          levels, making it a valuable supplement for managing diabetes.
        </span>
      </p>

      <p className={s.text}>
        Heart Health:{" "}
        <span className={s.span}>
          The plant has been linked to reduced cholesterol levels, which is
          vital for heart health.
        </span>
      </p>

      <p className={s.text}>
        Anti-Cancer Properties:{" "}
        <span className={s.span}>
          Certain compounds in moringa, such as niazimicin, have been found to
          suppress the growth of cancer cells in laboratory studies.
        </span>
      </p>

      <p className={s.text}>
        Immune Support:{" "}
        <span className={s.span}>
          With its high vitamin C content, moringa can boost the immune system.
        </span>
      </p>

      <p className={s.text}>
        Digestive Aid:{" "}
        <span className={s.span}>
          Moringa can help in treating digestive disorders due to its
          anti-inflammatory properties.
        </span>
      </p>
    </div>
  );
};

export default Description;
