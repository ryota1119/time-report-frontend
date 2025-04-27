import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class BaseApiClient {
    protected client: AxiosInstance;

    constructor(config: AxiosRequestConfig) {
        this.client = axios.create(config);
    }

    async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.get<T>(url, config);
    }

    async post<T = unknown, U = unknown>(url: string, data?: U, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.post<T>(url, data, config);
    }

    async put<T = unknown, U = unknown>(url: string, data?: U, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.put<T>(url, data, config);
    }

    async patch<T = unknown, U = unknown>(url: string, data?: U, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.patch<T>(url, data, config);
    }

    async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.delete<T>(url, config);
    }

    async head<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.head<T>(url, config);
    }

    async options<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.options<T>(url, config);
    }
}
