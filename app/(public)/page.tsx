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

export const revalidate = 86400;



import TNewestProduct from "@/components/templates/TNewestProduct";
import TProductListing from "@/components/templates/TProductListing";
import TRecommendedProduct from "@/components/templates/TRecommandedProduct";
import { getAppConfig } from "@/services/actions/config.action";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations('Public.Home');
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
    keywords: t('keywords').split(', '),
  } as Metadata
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <TRecommendedProduct />
      <TNewestProduct />
      <TProductListing />
    </main>
  );
}
