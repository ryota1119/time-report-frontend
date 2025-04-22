import apiClient from "@/lib/api/apiClient";


export const registerOrganization = async (data: {
    organization_code: string;
    organization_name: string;
    user_name: string;
    user_email: string;
    password: string;
}) => {
    try {
        return await apiClient.post('/organizations/register', data);
    } catch (e: unknown) {
        const error = e as Error;
        throw new Error(error.message || '登録に失敗しました');
    }

};
