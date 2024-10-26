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


const ProductShema: SCHEMA[] = [
    {key: 'name', type: 'string', size: 100, required: true},
    {key: 'slug', type: 'string', required: false, size: 200},
    {key: 'sku', type: 'string', required: true, size: 100},
    {key: 'description', type: 'string', size: 2000, required: true},
    {key: 'price', type: 'float', min: 0, required: true},
    {key: 'imgUrl', type: 'string', size: 1000,  required: true},
    {key: 'promoted', type: 'boolean'},
    {key: 'preparation', type: 'integer'},
    {key: 'estimation', type: 'integer', min: 15, xdefault: 30 },
]


const OrderSchema: SCHEMA[] = [
    {key: 'status', type: 'enum', possibleValues: [
        'CANCELED', 'DELIVERED', 'PENDING', 'PREPARING', 'READY', 'REFUND'
    ] as ORDER_STATUS[], xdefault: 'PENDING'},
    {key: 'details', type: 'string', size: 1000},
    {key: 'products', type: 'ref', collectionRef: 'product', cascade: 'setNull', typeRef: 'manyToMany' },
    {key: 'reduction', type: 'float', min: 0},
    {key: 'clientName', type: 'string', size: 100, required: true},
    {key: 'clientAddress', type: 'string', size: 1000, required: true},
    {key: 'clientNumber', type: 'string', size: 10, min: 10, max: 10, required: true},
    {key: 'amount', type: 'float', min: 0, required: true},
    {key: 'orderInfo', type: 'string', size: 5000, min: 2, required: true},
    {key: 'payRef', type: 'string', size: 100, min: 5},
    {key: 'datetime', type: 'integer', min: 0},
]

const AgentSchema: SCHEMA[] = [
    {key: 'name', type: "string", size: 100, required: true },
    {key: 'address', type: "string", size: 100, required: true },
    {key: 'phone', type: "string", size: 10, required: true },
    {key: 'gps_id', type: 'string', size: 100},
    {key: "position", type: 'float', isArray: true},
    {key: 'transport', type: 'enum', possibleValues: [
        'BICYCLE', 'MOTO', 'CAR', 'HEAVY'
    ], xdefault: 'MOTO'},
    {key: 'status', type: 'enum', possibleValues: [
        'BUSY', 'ON', 'OFF'
    ], xdefault: 'ON'}
]

// Collection lists
export const collections = [
    {
        key: 'product',
        schema: ProductShema,
        name: 'Products',
    },
    {
        key: 'order',
        schema: OrderSchema,
        name: 'Orders',
    },
    {
        key: 'agent',
        schema: AgentSchema,
        name: 'Agents'
    }
]