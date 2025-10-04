// src/theme/useThemeMode.ts
import { useContext } from "react";
import { ThemeModeCtx } from "./ThemeModeProvider";

export const useThemeMode = () => useContext(ThemeModeCtx);
