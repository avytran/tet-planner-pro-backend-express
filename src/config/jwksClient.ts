import jwksClient from "jwks-rsa";
import { SigningKeyCallback } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const {
    AUTH_HOST,
    AUTH_PORT,
} = process.env;

const client = jwksClient({
    jwksUri: `${AUTH_HOST}:${AUTH_PORT}/.well-known/jwks`,
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
})

export const getSigningKey = (header: any, callback: SigningKeyCallback) => {
    client.getSigningKey(header.kid, (err, key) => {
        if (err) {
            return callback(err, undefined);
        }
        callback(null, key?.getPublicKey());
    })
}