import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export type VanillaPayBtnProps = {
    url: string;
    className?: string;
}

const VanillaPayBtn = ({
    url,
    className
}: VanillaPayBtnProps) => {


    const t = useTranslations('components.atoms.VanillaPayBtn')
    return (
        <div className="w-full space-y-2 max-w-[300px] mx-auto">
            <div className="flex flex-col md:flex-row justify-center items-center p-5 gap-3 *:flex-1 *:w-full *:h-auto *:max-w-[150px]">
                <Image width={200} height={200} src="/assets/img/om2.png" alt="Orange Money" />
                <Image width={200} height={200}  src="/assets/img/mvola.png" alt="MVola" />
                <Image width={200} height={200}  src="/assets/img/vanilla.png" alt="Vanilla Pay" />
            </div>
            <Link href={url} aria-label="Link to payment">
                <Button className={cn("w-full", className)}>
                    {t('label')}
                </Button>
            </Link>
        </div>

    )
}

export default VanillaPayBtn