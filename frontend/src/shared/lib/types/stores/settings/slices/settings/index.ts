import { type ISettings } from "@/shared/lib";

export type SettingsSlice = ISettings & {
    setLanguage: (language: ISettings["language"]) => void;
    setTheme: (theme: ISettings["theme"]) => void;
}