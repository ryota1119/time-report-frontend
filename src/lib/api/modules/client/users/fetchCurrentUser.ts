import { HttpClient } from "@/lib/api/http/HttpClient";
import {User} from "@/types/user";

export const fetchCurrentUser = async (httpClient: HttpClient): Promise<User> => {
    const res = await httpClient.get<User>("/api/users/me");
    return res.data;
};
