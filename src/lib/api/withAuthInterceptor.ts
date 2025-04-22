import apiClient from "@/lib/api/apiClient";

let isRefreshing = false
let refreshSubscribers: (() => void)[] = []

const subscribeTokenRefresh = (cb: () => void) => {
    refreshSubscribers.push(cb)
}

const onTokenRefreshed = () => {
    refreshSubscribers.forEach((cb) => cb())
    refreshSubscribers = []
}

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh(() => {
                        resolve(apiClient(originalRequest))
                    })
                })
            }

            isRefreshing = true

            try {
                await apiClient.post('/auth/refresh-token')

                onTokenRefreshed()
                return apiClient(originalRequest)
            } catch (refreshError) {
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)

export default apiClient
