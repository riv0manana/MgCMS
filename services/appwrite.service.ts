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

import { Client, Account, Databases, Users, Query, Models, ID, Teams, Permission, Role } from "node-appwrite";

/**
 * createSessionClient
 * ___________________
 * Enable user to perform permission based actions, check for client authentication, read operations
 * @param session_key token session
 */
export function createSessionClient(session_key?: string) {
  if (!session_key?.length) throw new Error("No session");

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  client.setSession(session_key);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client)
    },
    get user() {
      return new Users(client)
    },
    get team() {
      return new Teams(client);
    }
  };
}

/**
 * createAdminClient
 * _________________
 * Use for any server/admin based operation, without all permissions involved
 */
export function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get generateId() { return ID },
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client)
    },
    get user() {
      return new Users(client)
    },
    get team() {
      return new Teams(client);
    }
  };
}


/* Appwrite collection helper*/
export const collectionQuery = (db: Databases) => {
  const DBID = process.env.APPWRITE_DATABASE_ID!;
  return {
    get queryAll() {
      return () => db.listCollections(DBID);
    },
    get newCollection() {
      return (id: string, name: string) => db.createCollection(DBID, id, name, [
        Permission.read(Role.team('admins')),
        Permission.write(Role.team('admins'))
      ])
    },
    get getAttributes() {
      return (collectionId: string) => db.listAttributes(DBID, collectionId);
    },
    get setAttributes() {
      return (collectionId: string, schema?: SCHEMA[]) => {
        const fields = schema?.map(({ key, type, min, max, xdefault, required, isArray, ...field }) => {
          switch (type) {
            case 'integer':
              return db.createIntegerAttribute(DBID, collectionId, key, !!required, min, max, xdefault as number, isArray);
            case 'float':
              return db.createFloatAttribute(DBID, collectionId, key, !!required, min, max, xdefault as number, isArray);
            case 'boolean':
              return db.createBooleanAttribute(DBID, collectionId, key, !!required, xdefault as boolean, isArray);
            case 'enum':
              return db.createEnumAttribute(DBID, collectionId, key, field.possibleValues || [], !!required, xdefault as string, isArray);
            case 'ref':
              return db.createRelationshipAttribute(DBID, collectionId, field.collectionRef!, field.typeRef as any, field.twoWay, key, field.twoWayKey, field.cascade as any);
            case 'string':
            default:
              return db.createStringAttribute(DBID, collectionId, key, field.size || 100, !!required, xdefault as string, isArray);
          }
        }).map((promise) => promise.catch(err => console.log(err?.message)))
        return fields;
      }
    }
  }
}

/**
 * Appwrite unified query helper
 * @param collectionId database collection ID
 * @param db Appwrite Databases instance, both session based or server
 */
export const dbQuery = <T>(collectionId: string, db: Databases) => {
  const DBID = process.env.APPWRITE_DATABASE_ID!;
  return {
    get generateId() { return ID },
    get permission() { return Permission },
    get role() { return Role },
    get queryBuilder() { return Query },
    get queryAll() { return (queries?: string[]) => db.listDocuments<T & Models.Document>(DBID, collectionId, queries) },
    get query() { return (id: string, queries?: string[]) => db.getDocument<T & Models.Document>(DBID, collectionId, id, queries) },
    get addQuery() {
      return (
        data: T,
        id?: string,
        permissions?: string[]
      ) => db.createDocument<T & Models.Document>(DBID, collectionId, id || ID.unique(), data as any, permissions)
    },
    get addManyQuery() {
      return (
        data: T[],
        permissions?: string[]
      ) => Promise.all(data.map(item => db.createDocument<T & Models.Document>(DBID, collectionId, ID.unique(), item as any, permissions)))
    },
    get addBatchQuery() {
      return (
        data: T[],
        permissions?: string[],
        onBatchItemError?: (id: T, msg?: string) => Promise<void>,
      ) => Promise.all(
        data.map(
          (item) => db.createDocument<T & Models.Document>(DBID, collectionId, ID.unique(), item as any, permissions)
            .catch(err => onBatchItemError?.(item, err?.message))
        )
      )
    },
    get updateQuery() {
      return (
        id: string,
        data: Partial<T>,
        permissions?: string[]
      ) => db.updateDocument<T & Models.Document>(DBID, collectionId, id, data as any, permissions)
    },
    get updateManyQuery() {
      return (
        data: Partial<T> & { $id: string }[],
        permissions?: string[]
      ) => Promise.all(data.map(item => db.updateDocument<T & Models.Document>(DBID, collectionId, item.$id, item as any, permissions)))
    },
    get deleteQuery() {
      return (
        id: string,
      ) => db.deleteDocument(DBID, collectionId, id)
    },
    get deleteManyQuery() {
      return (
        ids: string[],
      ) => Promise.all(ids.map(id => db.deleteDocument(DBID, collectionId, id)))
    },
    get batchDeleteQuery() {
      return (
        ids: string[],
        onBatchItemError?: (id: string, msg?: string) => Promise<void>
      ) => Promise.all(
        ids.map(id => db.deleteDocument(DBID, collectionId, id).catch(err => onBatchItemError?.(id, err?.message)))
      )
    }
  }
}

type AppwriteQueryParserParam = {
  filters: LogicalFilter,
  sort: Sort | null,
  offset: number,
  limit: number
};

export const AppwriteQueryParser = ({ filters, sort, offset, limit }: AppwriteQueryParserParam) => {
  const queries: string[] = [];

  const processOrFilter = (filter: LogicalFilter) => {
    const subQueries: string[] = [];
    filter.filters.forEach((filter) => {
      subQueries.push(...processFilter(filter));
    });
    return Query.or(subQueries);
  }

  const processAndFilter = (filter: Filter) => {
    switch (filter.operator) {
      case 'eq':
        return Query.equal(filter.field, filter.value);
      case 'ne':
        return Query.notEqual(filter.field, filter.value);
      case 'gt':
        return Query.greaterThan(filter.field, filter.value);
      case 'lt':
        return Query.lessThan(filter.field, filter.value);
      case 'gte':
        return Query.greaterThanEqual(filter.field, filter.value);
      case 'lte':
        return Query.lessThanEqual(filter.field, filter.value);
      case 'between':
        return Query.between(filter.field, filter.value, filter.value2 || '');
      case 'in':
        return Query.contains(filter.field, filter.value);
      case 'search':
        return Query.search(filter.field, filter.value);
    }
  }

  const processFilter = (filter: Filter | LogicalFilter) => {
    const qr: string[] = [];
    if ('operator' in filter) {
      qr.push(processAndFilter(filter));
    } else {
      qr.push(processOrFilter(filter));
    } 
    return qr;
  };

  if (filters.type === 'OR') {
    queries.push(...processFilter(filters));
  } else {
    queries.push(...(filters.filters || []).map(processFilter).flat());
  }

  if (sort?.order === 'asc') {
    queries.push(Query.orderAsc(sort.field));
  } else if (sort?.order === 'desc') {
    queries.push(Query.orderDesc(sort.field));
  }

  queries.push(Query.offset(offset));
  queries.push(Query.limit(limit));

  return queries;
}
