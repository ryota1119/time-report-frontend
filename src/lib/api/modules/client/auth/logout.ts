import {HttpClient} from "@/lib/api/http/HttpClient";

export const logout = async (httpClient: HttpClient): Promise<void> => {
    await httpClient.delete("/api/auth/logout");
}