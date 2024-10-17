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

import CardContainer from '@/components/atoms/CardContainer';
import TBootstrapConfigButton from '@/components/templates/TBootstrapConfigButton';
import TCreateAdminForm from '@/components/templates/TCreateAdminForm';
import { checkDBSettings, checkUserSettings, getAppConfig } from '@/services/actions/config.action';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import React from 'react'

export async function generateMetadata() {
    const t = await getTranslations('Authenticated.Setup');
    const [, appConfig] = await getAppConfig();
  
    return {
      title: t('pageTitle', { storeName: appConfig?.storeName}),
      description: t('pageDescription'),
      openGraph: {
        type: "website",
        url:  `https://${appConfig?.webDomain}`,
        title: t('pageTitle', { storeName: appConfig?.storeName}),
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

const AdminSetupPage = async () => {
    const [userError, userCheck] = await checkUserSettings();
    const [, dbCheck] = await checkDBSettings();

    if (userCheck && dbCheck) redirect('/dashboard');

    if (userError) return <TCreateAdminForm />

    const t = await getTranslations('Authenticated.Setup');

    return (
        <div className="min-h-screen bg-gradient-to-b from-second-50 to-main-50 flex items-center justify-center p-4">
            <CardContainer
                title={t('content.title')}
                subtitle={t('content.description')}
            >
                <TBootstrapConfigButton />
            </CardContainer>
            
        </div>
    )
}

export default AdminSetupPage