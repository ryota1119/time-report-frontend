import { BaseApiClient } from './BaseApiClient';
import { AxiosRequestConfig } from 'axios';

export class CsrApiClient extends BaseApiClient {
    constructor() {
        const config: AxiosRequestConfig = {
            baseURL: process.env.NEXT_PUBLIC_FRONT_URL || 'http://localhost:3000',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };

        super(config);
    }
}
