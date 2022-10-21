import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en";
import ru from "./ru";

export const createI18n = () => {
    i18next
        .use(initReactI18next)
        .init({
            resources: {
                en: {
                    translation: en
                },
                ru: {
                    translation: ru
                }
            },
            lng: 'en',
            fallbackLng: "en",

            interpolation: {
                escapeValue: false,
            },
        });

}