import clsx from "clsx";
import Logo from "../../components/Logo/Logo";
import MainContent from "../../components/MainContent/MainContent";
import s from "./RegisterPage.module.css";
import RegisterForm from "../../components/RegisterForm/REgisterForm";

const RegisterPage = () => {
  return (
    <main className={clsx(s.page, "container")}>
      <Logo />
      <div className={s.wrap}>
        <MainContent />
        <RegisterForm />
      </div>
    </main>
  );
};

export default RegisterPage;
