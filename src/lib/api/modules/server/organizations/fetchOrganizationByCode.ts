import {HttpClient} from "@/lib/api/http/HttpClient";
import {Organization} from "@/types/organization";

export const fetchOrganizationByCode = async (
    httpClient: HttpClient,
    organizationCode: string,
): Promise<Organization> => {
    const res = await httpClient.get<Organization>(`/organizations/${organizationCode}`)
    return res.data;
}