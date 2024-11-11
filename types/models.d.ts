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

declare type ActionStatusMsg = 
    | 'setting_check_failed'
    | 'seeting_bootstrap_failed'
    | 'success'
    | 'upload_error'
    | 'unknow_server_error'
    | 'user_info_error'
    | 'user_loggin_error'
    | 'user_add_error'
    | 'user_init_reset_error'
    | 'user_check_reset_error'
    | 'fraud_attempt'
    | 'product_add_error'
    | 'product_edit_error'
    | 'product_fetch_error'
    | 'product_delete_error'
    | 'order_add_error'
    | 'order_edit_error'
    | 'order_fetch_error'
    | 'order_payment_error'
    | 'order_check_ref_error'
    | 'agent_add_error'
    | 'agent_edit_error'
    | 'agent_fetch_error'
    | 'agent_delete_error'

declare type StatusCode =
    | 200
    | 400
    | 404
    | 401
    | 500;

declare type ListResponseType<T> = {
    documents: T[];
    total: number;
}

declare type ActionStatus = {
    message: ActionStatusMsg;
    statusCode: StatusCode;
    status: StatusCode;
}

declare type ActionResponse<T> = [error?: ActionStatus, data?: T];

/* DB MODEL */
declare type SCHEMA = {
    key: string;
    type:
    | 'string'
    | 'integer'
    | 'float'
    | 'boolean'
    | 'ref'
    | 'enum';
    size?: number;
    required?: boolean;
    xdefault?: string | number | boolean;
    min?: number;
    max?: number;
    isArray?: boolean;
    possibleValues?: string[];
    collectionRef?: string;
    typeRef?:
    | 'oneToOne'
    | 'manyToOne'
    | 'manyToMany'
    | 'oneToMany';
    collectionRef?: string;
    twoWay?: boolean;
    twoWayKey?: string;
    cascade?: 'restrict' | 'cascade' | 'setNull';
}

declare type AGENT_STATUS = 
    | 'BUSY'
    | 'OFF'
    | 'ON'

declare type TRANSPORT_TYPE = 
    | 'BICYCLE'
    | 'MOTO'
    | 'CAR'
    | 'HEAVY'

declare type DELIVERY_STATUS = 
    | 'assigned'
    | 'processing'
    | 'canceled'
    | 'completed'
    | 'deleted'

declare type  ORDER_STATUS =
    | 'PENDING'
    | 'PREPARING'
    | 'READY'
    | 'DELIVERED'
    | 'CANCELED'
    | 'REFUND'

declare type Product = {
    $id?: string;
    name: string;
    slug?: string;
    sku: string;
    description: string;
    price: number;
    imgUrl: string;
    promoted?: boolean;
    preparation?: number;
    estimation?: number;
}

declare type Order = {
    $id?: string;
    status?: ORDER_STATUS;
    details?: string;
    products: Product[];
    reduction?: number;
    clientName: string;
    clientNumber: string;
    clientAddress: string;
    amount: number;
    orderInfo: OrderInfo[];
    payRef?: string;
    datetime?: number;
    agent?: Agent;
}

declare type Agent = {
    $id?: string;
    name: string;
    address: string;
    phone: string;
    gps_id?: string;
    position?: number[];
    transport: TRANSPORT_TYPE;
    status?: AGENT_STATUS;
}

declare type OrderInfo = {
    product: Product;
    qte: number;
    variant?: Variant;
}

declare type Size =
    "XXS"
    | "XS"
    | "S"
    | "M"
    | "L"
    | "XL"
    | "XXL"
    | string;

declare type Color =
    "#FFF"
    | "000"
    | string;

declare type Variant = {
    size: SizeIcon;
    color: Color;
}

declare type PositionResponse = {
    name: string;
    lastUpdate: string;
    latitude: number;
    longitude: number;
    speed: number;
    address: string
}


/* Actions */

declare type UserSession = { $id: string, name: string }

declare type UploadData = {
    url: string;
    secure_url: string;
    asset_id: string;
    form: string;
    resource_type: string;
}

declare type SignInParams = {
    email: string;
    password: string;
}

declare type SignUpParams = SignInParams & {
    name: string;
}

declare type OrderParams = {
    items: OrderInfo[];
    reduction?: number;
    clientName: string;
    clientNumber: string;
    clientAddress: string;
    details?: string;
    amount: number;
}

declare type AgentFormParams = Omit<Agent, 'gps_id' | 'position' | 'status'>;

declare type ChangePasswordParams = {
    password: string;
    oldPassword: string;
}

declare type ValidateResetParams = {
    userId: string;
    secret: string;
    password: string;
}

declare type BaseQuery = {
    query?: string[],
    offset?: number;
    limit?: number;
    search?: string;
}

declare type QueryParam = {
    limit: string;
    offset: string;
    query: [operand: string, attr: string, value: string | string[]]
}

declare type RouteQueryProps = {
    params: {
        [x: string]: string;
    },
    searchParams: {
        [x: string]: string;
    }
}

/* UIs */

declare type BgVariant =
    | 'bg-slate-800'
    | 'bg-yellow-500'
    | 'bg-red-500'
    | 'bg-green-600'
    | 'bg-blue-500'
    | 'bg-gray-400'

declare type MenuLink = {
    href: string;
    label: string;
}

declare type Render<T,K> = (props: T) => K;