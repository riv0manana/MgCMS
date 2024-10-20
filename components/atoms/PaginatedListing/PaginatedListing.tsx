'use client'

import { Fragment, ReactNode, useEffect, useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useInView } from 'react-intersection-observer'

export type PaginatedListingProps<T> = {
    total?: number;
    initialElements?: T[];
    limit?: number;
    infinite?: boolean;
    getElements: (query: BaseQuery) => Promise<ActionResponse<ListResponseType<T>>>;
    className?: string;
    render: (element: T, index?: number) => ReactNode;
}

/**
 * 
 * @param ititialElements   Array of T element to first render
 * @param infinite    Enable infinite scroll instead of load more button
 * @param getElements    server actions to fetch elements
 * @param render    function to render JSX node with T element as props and index
 * @returns 
 */
const PaginatedListing = <T,>({
    initialElements = [],
    total = 0,
    limit = 30,
    infinite,
    getElements,
    className,
    render,
}: PaginatedListingProps<T>) => {
    const [elements, setElements] = useState<T[]>(initialElements);
    const [loading, action] = useTransition();
    const [scrollTrigger, isInView] = useInView();

    const hasMore = useMemo(() => elements.length < total, [elements.length, total]);

    const t = useTranslations('components.atoms.PaginatedListing')

    const loadMore = () => {
        if (hasMore) {
            action(async () => {
                const [, res] = await getElements({ offset: elements.length, limit });
                if (res?.documents) {
                    setElements(prev => [...prev, ...res.documents]);
                }
            })
        }
    }

    useEffect(() => {
        if (infinite && isInView && hasMore) {
            loadMore();
        }
    }, [isInView, hasMore, infinite])

    return (
        <div className="w-full space-y-4">
            <div className={className}>
                {elements.map((element, idx) => (
                    <Fragment key={`paginated_${idx}_${(element as any)?.$id || Math.random() * 1000}`}>
                        {render(element, idx)}
                    </Fragment>
                ))}
            </div>
            <div ref={scrollTrigger} className="flex justify-center items-center">
                {!infinite && hasMore && (
                    <Button onClick={loadMore} disabled={loading} className="max-w-[150px]">
                        {`${t('button.label')}${loading ? ' ...' : ''}`}
                    </Button>
                )}
            </div>
        </div>
    )
}

export default PaginatedListing