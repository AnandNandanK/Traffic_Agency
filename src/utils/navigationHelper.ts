// utils/navigationHelper.ts
import { useNavigate } from "react-router";
import { useEffect } from "react";

let navigateFn: (path: string) => void;

export const setNavigate = (navigate: (path: string) => void) => {
  navigateFn = navigate;
};

export const NavigateTo = (path: string) => {
  if (navigateFn) navigateFn(path);
  else console.error("Navigate function not set!");
};

// ✅ This component will mount *inside* router context
export const NavigationSetter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return null;
};
