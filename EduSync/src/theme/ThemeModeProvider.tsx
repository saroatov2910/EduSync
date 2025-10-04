// src/theme/ThemeModeProvider.tsx
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { Mode } from "./theme";
import { buildTheme, LS_THEME_KEY } from "./theme";

type Ctx = { mode: Mode; toggleMode: () => void; setMode: (m: Mode) => void };
export const ThemeModeCtx = createContext<Ctx>({ mode: "light", toggleMode: () => { }, setMode: () => { } });

export const ThemeModeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
    const [mode, setMode] = useState<Mode>(() => (localStorage.getItem(LS_THEME_KEY) as Mode) || (prefersDark ? "dark" : "light"));

    useEffect(() => {
        if (!localStorage.getItem(LS_THEME_KEY)) {
            setMode(prefersDark ? "dark" : "light");
        }
    }, [prefersDark]);

    useEffect(() => {
        localStorage.setItem(LS_THEME_KEY, mode);
        document.documentElement.dir = "rtl";
    }, [mode]);

    const toggleMode = useCallback(() => setMode(m => (m === "light" ? "dark" : "light")), []);
    const theme = useMemo(() => buildTheme(mode), [mode]);
    const value = useMemo(() => ({ mode, toggleMode, setMode }), [mode, toggleMode]);

    return (
        <ThemeModeCtx.Provider value={value}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeModeCtx.Provider>
    );
};
