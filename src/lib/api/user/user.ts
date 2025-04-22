import apiClient from "@/lib/api/apiClient"

export const fetchUsers = async () => {
    const response = await apiClient.get("/users")
    return response.data
}