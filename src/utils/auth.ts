import appConfig from "config";
import { join } from "lodash";
import { Buffer } from "buffer";
import jwtDecode from "jwt-decode";
import { SessionId } from 'model/models';

const header = JSON.stringify({
    alg: "HS256",
    typ: "JWT",
});

export const generateEncode = (body: string) => {
    const encodedHeader = Buffer.from(header).toString("base64");
    const encodedBody = Buffer.from(body).toString("base64");
    const encodedSecret = Buffer.from(appConfig.token.key).toString("base64");
    return join([encodedHeader, encodedBody, encodedSecret], ".");
};

export const decodeToken = (token: string): SessionId =>
    jwtDecode(token);
