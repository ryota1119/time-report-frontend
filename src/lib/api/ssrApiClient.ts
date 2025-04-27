import axios, {AxiosInstance} from 'axios'

type Options = {
    accessToken?: string
}

export const createSsrApiClient = (options?: Options): AxiosInstance => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }

    if (options?.accessToken) {
        headers['Authorization'] = `Bearer ${options.accessToken}`
    }

    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1',
        headers: headers,
    })
}