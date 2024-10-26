/*
 * Project Name: MgCMS
 * Author: Sarindramalala Rivomanana MANDANIAINA | riv0manana.dev
 * License: Creative Commons Attribution-NonCommercial (CC BY-NC)
 *          Commercial use requires a license. See LICENSE-COMMERCIAL.md for more details.
 * 
 * Description: Code first CMS for locale store
 * 
 * Copyright 2024 riv0manana.dev
 * 
 * For commercial use, please contact: contact@riv0manana.dev
 */

import CardContainer from '@/components/atoms/CardContainer/CardContainer';
import TBootstrapConfigButton from '@/components/templates/TBootstrapConfigButton/TBootstrapConfigButton';
import { getLoggedInUser } from '@/services/actions/admin.action';
import { getAppConfig } from '@/services/actions/config.action';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

export async function generateMetadata() {
    const t = await getTranslations('Authenticated.Setup');
    const [, appConfig] = await getAppConfig();

    return {
        title: t('pageTitle', { storeName: appConfig?.storeName }),
        description: t('pageDescription'),
        openGraph: {
            type: "website",
            url: `https://${appConfig?.webDomain}`,
            title: t('pageTitle', { storeName: appConfig?.storeName }),
            description: t('pageDescription'),
            siteName: appConfig?.storeName,
            images: [{
                url: `https://${appConfig?.webDomain}/og.png`,
            }],
        },
        authors: {
            name: "riv0manana | Rivomanana MANDANIAINA",
            url: "https://riv0manana.dev",
        },
    } as Metadata
}

const AdminConfigPage = async () => {
    const [error] = await getLoggedInUser();
    if (error) redirect('/dashboard');

    const t = await getTranslations('Authenticated.Setup');

    return (
        <CardContainer
            title={t('content.title')}
            subtitle={t('content.description')}
        >
            <TBootstrapConfigButton />
        </CardContainer>
    )
}

export default AdminConfigPage;