import {CrsApiClient} from "@/lib/api/client/CrsApiClient";

export const logout = async () => {
    const apiClient = new CrsApiClient()
    return await apiClient.delete("/api/auth/logout");
}
