import { BaseApiClient } from './BaseApiClient';
import { AxiosRequestConfig } from 'axios';

type BackendApiClientOptions = {
    accessToken?: string;
    headers?: Record<string, string>;
};

export class BackendApiClient extends BaseApiClient {
    constructor(options?: BackendApiClientOptions) {
        const defaultHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options?.accessToken ? { Authorization: `Bearer ${options.accessToken}` } : {}),
            ...(options?.headers || {}),
        };

        const config: AxiosRequestConfig = {
            baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8080/api/v1',
            headers: defaultHeaders,
        };

        super(config);
    }
}
