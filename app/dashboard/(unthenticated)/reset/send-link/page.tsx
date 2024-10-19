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
import { getAppConfig } from '@/services/actions/config.action';
import { CheckCircle } from 'lucide-react';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-static'

export async function generateMetadata() {
  const t = await getTranslations('Authenticated.LinkSent');
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

const AdminResetPassword = () => {
  const t = useTranslations('Authenticated.LinkSent.content')
  return (
    <CardContainer
      title={t('title')}
      className='w-full max-w-md'
    >
      <CardContainer.Content className='flex justify-center items-center flex-col gap-4'>
        <CheckCircle className='h-11 w-40 text-green-600' />
        <p>{t('phrase')}</p>
      </CardContainer.Content>
    </CardContainer>
  )
}

export default AdminResetPassword