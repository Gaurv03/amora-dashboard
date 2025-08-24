import { useTranslation } from 'react-i18next';

export const useLocalization = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (language: 'en' | 'sv' | 'pl') => {
        i18n.changeLanguage(language);
    };

    const currentLanguage = i18n.language.startsWith('sv') ? 'sv' : i18n.language.startsWith('pl') ? 'pl' : 'en';

    return {
        t,
        changeLanguage,
        currentLanguage,
        isEnglish: currentLanguage === 'en',
        isSwedish: currentLanguage === 'sv',
        isPolish: currentLanguage === 'pl',
    };
};
