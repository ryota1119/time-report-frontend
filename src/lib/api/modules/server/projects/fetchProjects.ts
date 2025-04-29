import {HttpClient} from "@/lib/api/http/HttpClient";
import {Project} from "@/types/project";

export const fetchProjects = async (
    httpClient: HttpClient,
): Promise<Project[]> => {
    const res = await httpClient.get<Project[]>("/projects")
    return res.data;
}