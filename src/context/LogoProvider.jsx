import { useState } from "react";
import { LogoContext } from "./LogoContext";

export const LogoProvider = ({ children }) => {
  const [headerLogoColor, setHeaderLogoColor] = useState("green");

  return (
    <LogoContext.Provider value={{ headerLogoColor, setHeaderLogoColor }}>
      {children}
    </LogoContext.Provider>
  );
};
