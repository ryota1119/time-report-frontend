import {cookies} from "next/headers";
import {BackendApiClient} from "@/lib/api/client/BackendApiClient";
import {Project} from "@/types/project";

export const getProjects = async (): Promise<Project[]> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if (!accessToken) {
        throw new Error('アクセストークンがありません');
    }

    const apiClient = new BackendApiClient({ accessToken })
    const res = await apiClient.get<Project[]>("/projects")

    return res.data;
}