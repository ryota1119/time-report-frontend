import apiClient from "@/lib/api/apiClient";

export const fetchCustomers = async () => {
    const res = await apiClient.get('/customers')
    return res.data
}