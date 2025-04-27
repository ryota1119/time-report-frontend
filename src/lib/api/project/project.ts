import apiClient from "@/lib/api/apiClient";

export const fetchProjects = async () => {
    const res = await apiClient.get('/projects');
    return res.data
}