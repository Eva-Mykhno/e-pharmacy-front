import Logo from "../../components/Logo/Logo";
import MainContent from "../../components/MainContent/MainContent";
import s from "./RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <main className={s.page}>
      <Logo />
      <MainContent />
    </main>
  );
};

export default RegisterPage;
