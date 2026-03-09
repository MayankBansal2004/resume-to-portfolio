import type { ThemeDescriptor } from "@/types/theme";
import { minimalistTheme } from "./minimalist";
import { nebulaTheme } from "./nebula";
import { auroraTheme } from "./aurora";
import { terminalTheme } from "./terminal";

/** All registered themes — add new themes here to make them available in the switcher */
export const THEMES: ThemeDescriptor[] = [
    minimalistTheme,
    nebulaTheme,
    auroraTheme,
    terminalTheme,
];

/** Look up a theme by ID, falling back to minimalist */
export function getTheme(id: string): ThemeDescriptor {
    return THEMES.find(t => t.id === id) ?? minimalistTheme;
}

export const DEFAULT_THEME_ID = "minimalist";
