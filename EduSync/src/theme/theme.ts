// src/theme/theme.ts
import type { Theme } from "@mui/material/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export type Mode = "light" | "dark";
export const LS_THEME_KEY = "ui_mode";

export function getDesignTokens(mode: Mode) {
    return {
        palette: {
            mode,
            primary: { main: mode === "dark" ? "#90caf9" : "#1976d2" },
            secondary: { main: mode === "dark" ? "#f48fb1" : "#9c27b0" },
            background: {
                default: mode === "dark" ? "#0f1115" : "#fafafa",
                paper: mode === "dark" ? "#13161c" : "#ffffff",
            },
        },
        shape: { borderRadius: 12 },
        typography: {
            fontFamily: `"Rubik","Heebo","Assistant","Segoe UI",Arial,system-ui`,
            h4: { fontWeight: 700 },
        },
        direction: "rtl" as const,
    };
}

export function buildTheme(mode: Mode): Theme {
    return responsiveFontSizes(createTheme(getDesignTokens(mode)));
}
