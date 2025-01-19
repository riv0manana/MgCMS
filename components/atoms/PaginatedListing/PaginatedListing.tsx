'use client'

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

import { Fragment, LegacyRef, ReactNode, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useInView } from 'react-intersection-observer'
import useFilters from "@/hooks/use-filters";
import { useQuery } from "@tanstack/react-query";

type RenderProps = { 
    trigger?: LegacyRef<HTMLDivElement>;
    loadMore?: () => void;
}

export type PaginatedListingProps<T> = {
    queryKey: string,
    total?: number;
    initialElements?: T[];
    limit?: number;
    infinite?: boolean;
    getElements: (query: BaseQuery) => Promise<ActionResponse<ListResponseType<T>>>;
    className?: string;
    renderItem: (element: T, index?: number) => ReactNode;
    render?: Render<Omit<PaginatedListingProps<T> & RenderProps, 'render' | 'getElements'>, ReactNode>;
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
    render,
    ...props
}: PaginatedListingProps<T>) => {
    const {
        initialElements = [],
        total = 0,
        limit: xLimit = 8,
        infinite = true,
        getElements,
        className,
        queryKey,
        renderItem,
    } = props;
    const t = useTranslations('components.atoms.PaginatedListing')

    const [elements, setElements] = useState<T[]>(initialElements);
    const [scrollTrigger, isInView] = useInView();

    const { next, filters } = useFilters({ limit: xLimit, total });

    const { refetch, isLoading: loading } = useQuery<T[]>({
        queryKey: [queryKey, JSON.stringify(filters)],
        queryFn: async () => {
            const [err, res] = await getElements(filters);
            if (err) Promise.reject(err.message)
            return res?.documents || [];
        },
        initialData: initialElements,
        maxPages: total,
        enabled: false
    })

    const hasMore = useMemo(() => elements.length < total, [elements.length, total]);

    const loadMore = async () => {
        if (hasMore) {
            const { data: res } = await refetch()
            setElements(prev => [...prev, ...(res || [])]);
        }
    }

    useEffect(() => {
        if (infinite && isInView && hasMore) {
            next();
        }
    }, [isInView, hasMore, infinite]);

    useEffect(() => {
        if (filters.offset && Number(filters.offset) > 0) {
            loadMore();
        }
    }, [filters.offset])


    if (render) return render({
        ...props,
        loadMore,
        trigger: scrollTrigger,
    });

    return (
        <>
            <div className={className}>
                {elements.map((element, idx) => (
                    <Fragment key={`paginated_${idx}_${(element as any)?.$id || Math.random() * 1000}`}>
                        {renderItem(element, idx)}
                    </Fragment>
                ))}
            </div>
            <div ref={scrollTrigger} className="flex justify-center items-center">
                {!infinite && hasMore && (
                    <Button onClick={next} disabled={loading} className="max-w-[150px]">
                        {`${t('button.label')}${loading ? ' ...' : ''}`}
                    </Button>
                )}
            </div>
        </>
    )
}

export default PaginatedListing