import {ApiError} from "@/lib/errors/ApiError";
import {cookies} from "next/headers";
import {BackendApiClient} from "@/lib/api/client/BackendApiClient";
import {User} from "@/types/user";

export const fetchUsers = async (): Promise<User[]> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if (!accessToken) {
        throw new ApiError("Access token not set", 401);
    }

    const apiClient = new BackendApiClient({ accessToken})
    const res = await apiClient.get<User[]>("/users")

    return res.data
}

export const getLoginUser = async (): Promise<User> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if (!accessToken) {
        throw new ApiError("Access token not set", 401);
    }

    const apiClient = new BackendApiClient({ accessToken})
    const res = await apiClient.get<User>("/users/me")

    return res.data
}
