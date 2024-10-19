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


import TInitPasswordResetForm from '@/components/templates/TInitPasswordResetForm/TInitPasswordResetForm';
import { getAppConfig } from '@/services/actions/config.action';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-static'

export async function generateMetadata() {
  const t = await getTranslations('Authenticated.InitReset');
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

const AdminInitResetPassword = async () => {
  return (
    <TInitPasswordResetForm />
  )
}

export default AdminInitResetPassword