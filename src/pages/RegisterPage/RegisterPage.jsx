import clsx from "clsx";
import Logo from "../../components/Logo/Logo";
import MainContent from "../../components/MainContent/MainContent";
import RegisterForm from "../../components/RegisterForm/REgisterForm";
import s from "./RegisterPage.module.css";
import { LogoProvider } from "../../context/LogoProvider";

const RegisterPage = () => {
  return (
    <LogoProvider>
      <main className={clsx(s.page, "container")}>
        <Logo />
        <div className={s.wrap}>
          <MainContent />
          <RegisterForm />
        </div>
      </main>
    </LogoProvider>
  );
};

export default RegisterPage;
