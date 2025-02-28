import { useContext } from "react";
import { LogoContext } from "./LogoContext";

export const useLogo = () => useContext(LogoContext);
