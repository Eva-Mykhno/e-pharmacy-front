import clsx from "clsx";
import Logo from "../../components/Logo/Logo";
import MainContent from "../../components/MainContent/MainContent";
import LoginForm from "../../components/LoginForm/LoginForm";
import { LogoProvider } from "../../context/LogoProvider";
import s from "./LoginPage.module.css";

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
