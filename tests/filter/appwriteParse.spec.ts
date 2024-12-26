import FilterHandler from '@/lib/filters';
import { AppwriteQueryParser } from '@/services/appwrite.service';
import { Query } from 'node-appwrite';
import { describe, expect, it } from 'vitest'

describe('URL filter parser', () => {
    const filterHandler = new FilterHandler();
    let urlParams: QueryParam = {
        sortField: 'name',
        sortOrder: 'asc'
    }

    filterHandler.parseUrlParams(urlParams);

    it('Should parse sorting order and field', () => {
        expect(filterHandler.getSort()).toEqual({
            field: 'name',
            order: 'asc'
        });
    });

    filterHandler.setFilters('{"type":"AND","filters":[{"field":"name","value":"John","operator":"eq"}, {"field":"name","value":"Elen","operator":"eq"}]}');
    it('Simple AND filter', () => {
        expect(filterHandler.getFilters()).toEqual({
            type: 'AND',
            filters: [
                { field: 'name', value: 'John', operator: 'eq' },
                { field: 'name', value: 'Elen', operator: 'eq' },
            ]
        });
    });

    const filter = new FilterHandler()
    filter.setFilters('{"type":"OR","filters":[{"field":"name","value":"John","operator":"eq"}, {"field":"name","value":"Elen","operator":"eq"}]}');
    it('Simple OR filter', () => {
        expect(filter.getFilters()).toEqual({
            type: 'OR',
            filters: [
                { field: 'name', value: 'John', operator: 'eq' },
                { field: 'name', value: 'Elen', operator: 'eq' },
            ]
        });
    });

});

describe('Appwrite Query Parser', () => {
    let filterHandler = new FilterHandler();
    const urlParams = {
        sortField: 'name',
        sortOrder: 'asc'
    }
    filterHandler.parseUrlParams(urlParams);

    filterHandler.setFilters(`{
        "type":"AND",
        "filters":[
            {"field":"name","value":"John","operator":"eq"},
            {"field":"name","value":"Elen","operator":"eq"}
        ]
    }`);

    it('should be parsed to appwrite queries Simple AND filter', () => {
        const appwriteQueries = AppwriteQueryParser({
            filters: filterHandler.getFilters(),
            sort: filterHandler.getSort(),
            offset: filterHandler.getOffset(),
            limit: filterHandler.getLimit()
        });
        expect(appwriteQueries).toEqual([
            Query.equal('name', 'John'),
            Query.equal('name', 'Elen'),
            Query.orderAsc('name'),
            Query.offset(0),
            Query.limit(20)
        ]);
    });

    const filter1 = new FilterHandler();
    filter1.setFilters(`{
        "type":"OR",
        "filters":[
            {"field":"name","value":"John","operator":"eq"},
            {"field":"name","value":"Elen","operator":"eq"}
        ]
    }`);

    it('should be parsed to appwrite queries Simple OR filter', () => {
        const appwriteQueries = AppwriteQueryParser({
            filters: filter1.getFilters(),
            sort: filter1.getSort(),
            offset: filter1.getOffset(),
            limit: filter1.getLimit()
        });
        expect(appwriteQueries).toEqual([
            Query.or([
                Query.equal('name', 'John'),
                Query.equal('name', 'Elen'),
            ]),
            Query.offset(0),
            Query.limit(20)
        ]);
    });

    const filter2 = new FilterHandler();
    filter2.setFilters(`{
        "type":"OR",
        "filters":[
            {"field":"name","value":"John","operator":"eq"},
            {
                "type":"OR",
                "filters":[
                    {"field":"age","value":30,"operator":"between","value2":40},
                    {"field":"city","value":"New York","operator":"eq"}
                ]
            }
        ]
    }`);

    it('should be parsed to appwrite queries Simple OR filter with nested OR filter', () => {
        const appwriteQueries = AppwriteQueryParser({
            filters: filter2.getFilters(),
            sort: filter2.getSort(),
            offset: filter2.getOffset(),
            limit: filter2.getLimit()
        });
        expect(appwriteQueries).toEqual([
            Query.or([
                Query.equal('name', 'John'),
                Query.or([
                    Query.between('age', 30, 40),
                    Query.equal('city', 'New York'),
                ]),
            ]),
            Query.offset(0),
            Query.limit(20)
        ]);
    });

    const filter3 = new FilterHandler();
    filter3.setFilters(`{
        "type":"AND",
        "filters":[
            {"field":"name","value":"John","operator":"eq"},
            {
                "type":"OR",
                "filters":[
                    {"field":"age","value":30,"operator":"between","value2":40},
                    {"field":"city","value":"New York","operator":"eq"}
                ]
            }
        ]
    }`);

    it('should be parsed to appwrite queries Simple AND filter with nested OR filter', () => {
        const appwriteQueries = AppwriteQueryParser({
            filters: filter3.getFilters(),
            sort: filter3.getSort(),
            offset: filter3.getOffset(),
            limit: filter3.getLimit()
        });
        expect(appwriteQueries).toEqual([
            Query.equal('name', 'John'),
            Query.or([
                Query.between('age', 30, 40),
                Query.equal('city', 'New York'),
            ]),
            Query.offset(0),
            Query.limit(20)
        ]);
    });


    const searchFilter = new FilterHandler();
    searchFilter.parseUrlParams({
        sortField: '$createdAt',
        sortOrder: 'desc',
        limit: '4',
        filters: JSON.stringify({
            filters: [
                { field: 'productx', value: 'Assiette', operator: 'search' }
            ]
        })
    });
    it('should parse appwrite search filter', () => {
        const appwriteQueries = AppwriteQueryParser({
            filters: searchFilter.getFilters(),
            sort: searchFilter.getSort(),
            offset: searchFilter.getOffset(),
            limit: searchFilter.getLimit()
        });
        console.log(appwriteQueries)
        expect((appwriteQueries)).toEqual([
            Query.search('productx', 'Assiette'),
            Query.orderDesc('$createdAt'),
            Query.offset(0),
            Query.limit(4),
        ]);
    });

});
