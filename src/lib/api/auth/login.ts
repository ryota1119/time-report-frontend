import {CrsApiClient} from "@/lib/api/client/CrsApiClient";

export const login = async (
    orgCode: string,
    email: string,
    password: string
) => {
    const apiClient = new CrsApiClient()
    const res = await apiClient.post('/api/auth/login', {
        organizationCode: orgCode,
        email: email,
        password: password,
    });

    return res.data;
};