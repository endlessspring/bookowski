import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import en from "./en";
import ru from "./ru";
import rootStore from "../models/RootStore";

export const createI18n   = () => {
    i18next
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            resources: {
                en: {
                    translation: en
                },
                ru: {
                    translation: ru
                }
            },
            lng: rootStore.settingsStore.lang,
            fallbackLng: "en",

            interpolation: {
                escapeValue: false,
            },
        });

}