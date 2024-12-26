import { AppwriteQueryParser } from "@/services/appwrite.service";

class FilterHandler {
    private filters: LogicalFilter;
    private sort: Sort | null;
    private offset: number;
    private limit: number;

    constructor() {
        this.filters = { type: 'AND', filters: [] };
        this.sort = null;
        this.offset = 0;
        this.limit = 20;
    }

    addFilter(filter: Filter | LogicalFilter) {
        this.filters.filters.push(filter);
    }

    setFilters(filters: string | undefined) {
        try {
            if (!filters) throw new Error('Filters is required');
            this.filters = JSON.parse(filters);
        } catch {
            this.filters = { type: 'AND', filters: [] };
        }
    }

    resetFilters() {
        this.filters = { type: 'AND', filters: [] };
    }

    setSort(field: string, order: 'asc' | 'desc') {
        this.sort = { field, order };
    }

    setLimit(limit: number) {
        this.limit = limit;
    }

    setOffset(offset: number) {
        this.offset = offset;
    }

    parseUrlParams({ filters, sortField, sortOrder, offset, limit }: QueryParam) {

        if (filters) {
            try {
                this.filters = JSON.parse(filters);
            } catch {
                this.filters = { type: 'AND', filters: [] };
            }
        }

        if (sortField && sortOrder) {
            this.setSort(sortField, sortOrder as 'asc' | 'desc');
        }
        
        if (offset) {
            this.offset = parseInt(offset);
        }
        if (limit) {
            this.limit = parseInt(limit);
        }
    }

    stringifyFilter() {
        return new URLSearchParams({
            filters: JSON.stringify(this.filters),
            sortOrder: this.sort?.order || 'asc',
            sortField: this.sort?.field || '',
            offset: this.offset.toString(),
            limit: this.limit.toString()
        }).toString()
    }

    toJSON(): BaseQuery {
        return {
            filters: JSON.stringify(this.filters),
            sortOrder: this.sort?.order || 'asc',
            sortField: this.sort?.field || '',
            offset: this.offset.toString(),
            limit: this.limit.toString()
        }
    }

    getFilters() {
        return this.filters;
    }

    getSort() {
        return this.sort;
    }

    getOffset() {
        return this.offset;
    }

    getLimit() {
        return this.limit;
    }
}

export default FilterHandler;

type Callback = (...args: any[]) => Promise<any>;
export const createFilteredAction = <T extends Callback>(action: T) => (async (queries: QueryParam = {}) => {
  const Filter = new FilterHandler();
  Filter.parseUrlParams(queries);

  const query = AppwriteQueryParser({
    filters: Filter.getFilters(),
    offset: Filter.getOffset(),
    limit: Filter.getLimit(),
    sort: Filter.getSort()
  });
  return action(query);
}) as T;
