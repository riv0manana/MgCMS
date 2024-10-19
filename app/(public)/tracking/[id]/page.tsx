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
import TOrderTracker from "@/components/templates/TOrderTracker";
import TRecommendedProduct from "@/components/templates/TRecommandedProduct";
import { getAppConfig } from "@/services/actions/config.action";
import { getOrder } from "@/services/actions/order.action";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params: { id }
}: RouteQueryProps) {
  const [, order] = await getOrder(id);
  const t = await getTranslations('Public.Tracking');
  const [, appConfig] = await getAppConfig();

  return {
    title: t('pageTitle', { storeName: appConfig?.storeName, id: order?.$id }),
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

export default function TrackingCheckPage({
  params: { id },
}: RouteQueryProps) {
  if (!id) redirect('/tracking');
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
          <TOrderTracker id={id} />
        </ColoredCardContainer.Content>
      </ColoredCardContainer>
      <TRecommendedProduct />
    </>

  );
}
