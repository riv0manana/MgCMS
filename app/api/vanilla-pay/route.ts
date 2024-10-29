import { createAdminClient, dbQuery } from "@/services/appwrite.service";
import VanillaPay from "@/services/vanilla-pay.service";
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const data = await req.text();
        const result = await VanillaPay.ValidatePayment(data);
        if (!result?.ref_arn || !result.ref_int) throw new Error('received: ' + data);

        const { database } = createAdminClient();
        const { updateQuery } = dbQuery<Order>('order', database);

        const order = await updateQuery(result.ref_int, { payRef: result.ref_arn});
        if (!order) throw new Error('Unkown order');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        return NextResponse.json({ status: 'received' }, { status: 200 });
    }
}