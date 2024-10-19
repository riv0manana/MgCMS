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


import ColoredCardContainer from "@/components/atoms/ColoredCardContainer";
import TPayRefForm from "@/components/templates/TPayRefForm";
import TRecommendedProduct from "@/components/templates/TRecommandedProduct";
import { getAppConfig } from "@/services/actions/config.action";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export const revalidate = 86400;

export async function generateMetadata() {
  const t = await getTranslations('Public.Tracking');
  const [, appConfig] = await getAppConfig();

  return {
    title: t('ogTitle', { storeName: appConfig?.storeName }),
    description: t('pageDescription'),
    openGraph: {
      type: "website",
      url: `https://${appConfig?.webDomain}/tracking`,
      title: t('ogTitle', { storeName: appConfig?.storeName }),
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
    keywords: t('keywords').split(', '),
  } as Metadata
}

export default function TrackingCheckPage() {
  const t = useTranslations('Public.Tracking.content')
  return (
    <>
      <ColoredCardContainer
        title={t('title')}
        footer={(
          <p className="text-center text-sm w-full text-gray-600">
            {t('phrase')}
          </p>
        )}
      >
        <ColoredCardContainer.Content>
          <TPayRefForm />
        </ColoredCardContainer.Content>
      </ColoredCardContainer>
      <TRecommendedProduct />
    </>
  );
}
