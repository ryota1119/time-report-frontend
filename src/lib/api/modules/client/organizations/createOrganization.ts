import {HttpClient} from "@/lib/api/http/HttpClient";
import {Organization} from "@/types/organization";

export const createOrganization = async (
    httpClient: HttpClient,
    organizationCode: string,
    organizationName: string,
    userName: string,
    email: string,
    password: string,
): Promise<Organization> => {
    const res = await httpClient.post<Organization>("/api/organizations/register", {
        organizationCode,
        organizationName,
        userName,
        email,
        password,
    })
    return res.data;
}