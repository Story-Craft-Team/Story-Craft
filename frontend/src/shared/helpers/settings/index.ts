import { useStore } from "@/shared/stores";
/*
    An add-on in the form of a useSettingsChange custom hook that allows you to use the useStore hook inside the ThemeChange and LanguageChange
*/
export const useSettingsChange = () => {
    const setLanguage = useStore(state => state.setLanguage) //getting a setLanguage custom hook into the store
    const setTheme = useStore(state => state.setTheme) //getting a setTheme custom hook into the store

    /*
        The function change theme in storage.
        The function accepts the following parameters:
        @e - properties of the target object
    */
    function ThemeChange(value: string) {
        setTheme(value as 'light' | 'dark') //definition the changed theme based on the value of the target object (select)
    }

    /*
        The function change language in storage and set it in localStorage.
        The function accepts the following parameters:
        @e - properties of the target object
    */
    function LanguageChange(value: string){
        setLanguage(value) //definition the changed theme based on the value of the target object (select)
    }
    
    return {ThemeChange, LanguageChange}
};
