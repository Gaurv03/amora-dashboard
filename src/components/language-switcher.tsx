import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
    const { i18n, t } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const currentLanguage = i18n.language.startsWith('sv') ? 'sv' : i18n.language.startsWith('pl') ? 'pl' : 'en';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Globe className="h-4 w-4" />
                    <span className="sr-only">{t('language.selectLanguage')}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => changeLanguage('en')}
                    className={currentLanguage === 'en' ? 'bg-accent' : ''}
                >
                    {t('language.en')}
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => changeLanguage('sv')}
                    className={currentLanguage === 'sv' ? 'bg-accent' : ''}
                >
                    {t('language.sv')}
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => changeLanguage('pl')}
                    className={currentLanguage === 'pl' ? 'bg-accent' : ''}
                >
                    {t('language.pl')}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
