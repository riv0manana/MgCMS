'use client'

import FilterHandler from "@/lib/filters";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type FilterOptions = {
    limit?: number;
    offset?: number;
    total?: number;
}

const useFilters = ({
    limit,
    offset,
    total = 0,
}: FilterOptions) => {
    const [filters, setFilters] = useState<BaseQuery>({});

    const searchParams = useSearchParams();

    useEffect(() => {
        const filterHandler = new FilterHandler();
        filterHandler.parseUrlParams({
            filters: searchParams.get('filters') || '{}',
            sortField: searchParams.get('sortField') || undefined,
            sortOrder: searchParams.get('sortOrder') || undefined,
            offset: offset ? offset.toString() : searchParams.get('offset') || undefined,
            limit: limit ? limit.toString() : searchParams.get('limit') || undefined,
        });
        setFilters(filterHandler.toJSON());
    }, [searchParams, limit, offset, total]);

    const next = () => {
        if (filters.offset && filters.limit && Number(filters.offset) < total) {    
            setFilters((prev) => ({
                ...prev,
                offset: (Number(prev.offset || 0) + Number(prev.limit || 0)).toString(),
            }));
        }
    }

    const prev = () => {
        if (filters.offset && filters.limit && Number(filters.offset) > 0) {
            setFilters((prev) => ({
                ...prev,
                offset: (Number(prev.offset || 0) - Number(prev.limit || 0)).toString(),
            }));
        }
    }

    return {
        filters,
        next,
        prev,
    }
}


export default useFilters;