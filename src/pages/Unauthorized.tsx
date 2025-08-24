import { useTranslation } from 'react-i18next';
import { Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const Unauthorized = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleGoHome = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                        <Shield className="h-6 w-6 text-destructive" />
                    </div>
                    <CardTitle className="text-2xl">
                        {t('unauthorized.title', 'Access Denied')}
                    </CardTitle>
                    <CardDescription>
                        {t('unauthorized.description', 'You do not have permission to access this page.')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-center text-muted-foreground">
                        {t('unauthorized.message', 'Please contact your administrator if you believe this is an error.')}
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleGoBack} className="flex-1">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t('unauthorized.goBack', 'Go Back')}
                        </Button>
                        <Button onClick={handleGoHome} className="flex-1">
                            {t('unauthorized.goHome', 'Go Home')}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
