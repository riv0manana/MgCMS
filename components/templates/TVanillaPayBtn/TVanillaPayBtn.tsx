import VanillaPayBtn, { VanillaPayBtnProps } from "@/components/atoms/VanillaPayBtn/VanillaPayBtn";
import { generateVanillaPayLink } from "@/services/actions/order.action";

export type TVanillaPayBtnProps = Omit<VanillaPayBtnProps, 'url'> & {
    order: Order;
}

const TVanillaPayBtn = async ({
    order,
    ...props
}: TVanillaPayBtnProps) => {
    const [, payment] = await generateVanillaPayLink(order);
    if (!payment?.pay_mobile_url) return null;

    return (
        <VanillaPayBtn {...props} url={payment.pay_mobile_url} />
    )
}

export default TVanillaPayBtn