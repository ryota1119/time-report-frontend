import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class HttpClient {
    private readonly client: AxiosInstance;

    constructor(config: AxiosRequestConfig) {
        this.client = axios.create(config);
    }

    get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.get<T>(url, config);
    }

    post<T = unknown, U = unknown>(url: string, data?: U, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.post<T>(url, data, config);
    }

    put<T = unknown, U = unknown>(url: string, data?: U, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.put<T>(url, data, config);
    }

    patch<T = unknown, U = unknown>(url: string, data?: U, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.patch<T>(url, data, config);
    }

    delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.delete<T>(url, config);
    }

    head<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.head<T>(url, config);
    }

    options<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.options<T>(url, config);
    }
}
