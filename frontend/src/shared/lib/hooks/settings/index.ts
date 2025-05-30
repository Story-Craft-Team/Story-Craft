import { useSettingsStore } from "@/shared/stores";
import { type ISettings } from "@/shared/lib";

export const useSettingsChange = () => {
    const {setLanguage, setTheme} = useSettingsStore(state => state)

    function ThemeChange(value: ISettings["theme"]) {
        setTheme(value) 
    }

    function LanguageChange(value: ISettings["language"]){
        setLanguage(value)
    }

    return {ThemeChange, LanguageChange}
};
