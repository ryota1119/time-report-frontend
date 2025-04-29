import {HttpClient} from "@/lib/api/http/HttpClient";
import {Customer} from "@/types/customer";

export const fetchCustomers = async (
    httpClient: HttpClient,
): Promise<Customer[]> => {
    const res = await httpClient.get<Customer[]>("/api/customers")
    return res.data;
}