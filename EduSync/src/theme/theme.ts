// src/theme/theme.ts
import type { Theme } from "@mui/material/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export type Mode = "light" | "dark";
export const LS_THEME_KEY = "ui_mode";

// צבעי מותג
const brand = {
    main: "#B8D900",  // ירוק ליים (מה-CSS הקיים שלך)
    dark: "#8AA400",
    light: "#E6F2A2",
};

export function getDesignTokens(mode: Mode) {
    const isDark = mode === "dark";

    return {
        palette: {
            mode,
            primary: {
                main: brand.main,
                dark: brand.dark,
                light: brand.light,
                contrastText: isDark ? "#0f1115" : "#1b1b1b",
            },
            secondary: {
                main: isDark ? "#90caf9" : "#2E7D32", // ירקרק עמוק משני
            },
            background: {
                default: isDark ? "#0f1115" : "#fafafa",
                paper: isDark ? "#13161c" : "#ffffff",
            },
            text: {
                primary: isDark ? "#eaeef2" : "#1b1b1b",
                secondary: isDark ? "#b8c2cc" : "#4b5563",
            },
            divider: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
            success: { main: "#4CAF50" },
            error: { main: "#e53935" },
            warning: { main: "#fb8c00" },
            info: { main: "#29b6f6" },
        },

        shape: { borderRadius: 12 },

        typography: {
            fontFamily: `"Rubik","Heebo","Assistant","Segoe UI",Arial,system-ui`,
            h4: { fontWeight: 700 },
            button: { fontWeight: 600 },
        },

        // בלי overrides מסובכים כדי להימנע מקונפליקטים טייפים
        direction: "rtl" as const,
    };
}

export function buildTheme(mode: Mode): Theme {
    return responsiveFontSizes(createTheme(getDesignTokens(mode)));
}
