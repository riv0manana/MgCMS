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



import BasicPaymentWrapper from "@/components/atoms/BasicPaymentWrapper";
import ShortOrderDetails from "@/components/atoms/ShortOrderDetails";
import ThankYouCard from "@/components/atoms/ThankYouCard";
import TBasicPayForm from "@/components/templates/TBasicPayForm";
import { getAppConfig } from "@/services/actions/config.action";
import { getOrder } from "@/services/actions/order.action"
import { Clock } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export async function generateMetadata({
    params: { id }
}: RouteQueryProps) {
    const [, order] = await getOrder(id);

    const t = await getTranslations('Public.Order');
    const [, appConfig] = await getAppConfig();

    return {
        title: t('pageTitle', { storeName: appConfig?.storeName, id: order?.$id }),
        description: t('pageDescription'),
        openGraph: {
            type: "website",
            url: `https://${appConfig?.webDomain}`,
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

const OrderResumePage = async ({
    params: {
        id
    }
}: RouteQueryProps) => {
    const [, order] = await getOrder(id);
    const [, data] = await getAppConfig();
    if (!order?.$id || !data?.paymentNumber) redirect('/');

    const t = await getTranslations('Public.Order.content')

    return (
        <ThankYouCard
            icon={<Clock className="h-10 w-10 text-main-600" />}
            title={order?.payRef
                ? t('confirmed.title')
                : t('wait.title')
            }
            subtitle={order?.payRef
                ? t('confirmed.phrase')
                : t('wait.phrase')
            }
        >
            {order.payRef
                ? <ShortOrderDetails order={order} />
                : (<BasicPaymentWrapper order={order} name={data.paymentName} phone={data.paymentNumber} >
                    <TBasicPayForm order={order} />
                </BasicPaymentWrapper>)
            }
        </ThankYouCard>
    )
}

export default OrderResumePage