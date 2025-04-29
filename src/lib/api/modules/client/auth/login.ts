import {HttpClient} from "@/lib/api/http/HttpClient";
import {AuthToken} from "@/types/auth";

export const login = async (
    httpClient: HttpClient,
    organizationCode: string,
    email: string,
    password: string
): Promise<AuthToken> => {
    const res = await httpClient.post<AuthToken>("/api/auth/login", {
        organizationCode,
        email,
        password,
    });
    return res.data;
}