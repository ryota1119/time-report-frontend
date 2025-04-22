import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1',
    withCredentials: true,
})

export default apiClient

