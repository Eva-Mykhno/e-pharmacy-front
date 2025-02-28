import clsx from "clsx";
import Logo from "../../components/Logo/Logo";
import MainContent from "../../components/MainContent/MainContent";
import s from "./LoginPage.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import { LogoProvider } from "../../context/LogoProvider";

const LoginPage = () => {
  return (
    <LogoProvider>
      <main className={clsx(s.page, "container")}>
        <Logo />
        <div className={s.wrap}>
          <MainContent />
          <LoginForm />
        </div>
      </main>
    </LogoProvider>
  );
};

export default LoginPage;
