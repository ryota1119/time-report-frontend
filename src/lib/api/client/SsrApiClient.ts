import {BaseApiClient} from "@/lib/api/client/BaseApiClient";
import {AxiosRequestConfig} from "axios";

type SsrApiClientOptions = {
    cookie?: string,
    headers?: Record<string, string>,
};

export class SsrApiClient extends BaseApiClient {
    constructor(options?: SsrApiClientOptions) {
        const defaultHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options?.cookie ? {Cookie: options.cookie} : {}),
            ...(options?.headers || {}),
        }

        const config: AxiosRequestConfig = {
            baseURL: process.env.NEXT_PUBLIC_FRONT_URL || 'http://localhost:3000',
            headers: defaultHeaders,
        }

        super(config)
    }
}