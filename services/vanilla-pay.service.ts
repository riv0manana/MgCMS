import crypto from 'crypto';
import { DateTime } from 'luxon';

const client_id = process.env.VANILLA_PAY_ID || '';
const client_secret = process.env.VANILLA_PAY_SECRET || '';
const pub_key = process.env.VANILLA_PAY_PB_KEY || '';
const prv_key = process.env.VANILLA_PAY_PRV_KEY || '';
const domain = process.env.WEBDOMAIN || '';

type PaymentData = {
    adresseip: string;
    idpanier: string;
    montant: number;
    nom?: string;
    email: string;
    reference: string;
}

type PaymentResult = {
    idpanier: string;
    montant: number;
    ref_int: string;
    resultat: 'success' | 'error';
    nom?: string;
    ref_arn: string;
}

type URL = `https://${string}`;

type PayParams = {
    site_url: URL,
    params: string;
}

export default class VanillaPay {

    static CanIUse = () => {
        return !!client_id && !!client_secret && !!pub_key && !!pub_key && !!domain;
    }
    
    private static encrypt(data: string) {
        try {
            let des_iv = Buffer.from("0000000000000000", 'hex');
            let cipher = crypto.createCipheriv('des-ede3-cbc', Buffer.from(pub_key.substring(0, 24)), des_iv);
            let encrypted = cipher.update(data);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return encrypted.toString('hex');
        } catch (e) {
            return null
        }
    }

    private static decrypt(data: string) {
        try {
            let des_iv = Buffer.from("0000000000000000", 'hex');
            let encryptedText = Buffer.from(data, 'hex');
            let decipher = crypto.createDecipheriv('des-ede3-cbc', Buffer.from(prv_key.substring(0, 24)),
                des_iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();
        } catch (e) {
            return null;
        }
    }

    private static getToken = async () => {
        try {
            if (!VanillaPay.CanIUse()) throw new Error('VanillaPay: missing env configs');

            let body = new URLSearchParams({
                client_id,
                client_secret,
                grant_type: 'client_credentials',
            });

            const res = await (await fetch('https://pro.ariarynet.com/oauth/v2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*"
                },
                body,
            })).json();

            if (!res?.access_token) throw new Error('VanillaPay: Unauthorized');
            return res.access_token as string;

        } catch {
            return null;
        }
    }

    static initPayment = async (data: PaymentData) => {
        try {
            const token = await VanillaPay.getToken();
            if (!token) throw new Error('VanillaPay: cannot get token'); 

            const params = VanillaPay.encrypt(JSON.stringify({
                unitemonetaire: 'Ar',
                date: DateTime.local().toFormat('YYYY:LL:dd HH:mm:ss'),
                ...data
            }));
            if (!params) throw new Error('VanillaPay: invalid pub key'); 

            let body: PayParams = {
                site_url: `https://${domain}`,
                params,
            };

            const res = await (await fetch('https://pro.ariarynet.com/api/paiements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': `Beader ${token}`
                },
                body: new URLSearchParams(body),
            })).text();

            if (!res) throw new Error('VanillaPay: payment initialization failed');
            const id = VanillaPay.decrypt(res);

            return {
                pay_vanilla_url: `https://moncompte.ariarynet.com/paiement/${id}`,
                pay_mobile_url: `https://moncompte.ariarynet.com/payer/${id}`
            }

        } catch {
            return null;
        }
    }

    static ValidatePayment = async (encrypted: string) => {
        try {
            const decriptedData = VanillaPay.decrypt(encrypted);
            if (!decriptedData) throw new Error('VanillaPay: private key invalid');

            const result: PaymentResult = JSON.parse(decriptedData);
            if (!result?.ref_arn || !result.ref_int) throw new Error('VanillaPay: Hack attempt !!!');

            return result;
        } catch {
            return null;
        }
    }
}