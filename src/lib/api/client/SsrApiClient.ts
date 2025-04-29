import {BaseApiClient} from './BaseApiClient';
import {HttpClient} from "@/lib/api/http/HttpClient";
import {AuthToken} from "@/types/auth";
import {Organization} from "@/types/organization";
import {User} from "@/types/user";
import {Customer} from "@/types/customer";
import {Project} from "@/types/project";
import {Timer} from "@/types/timer";
import {login} from "@/lib/api/modules/server/auth/login";
import {logout} from "@/lib/api/modules/server/auth/logout";
import {createOrganization} from "@/lib/api/modules/server/organizations/createOrganization";
import {fetchOrganizationByCode} from "@/lib/api/modules/server/organizations/fetchOrganizationByCode";
import {fetchCurrentUser} from "@/lib/api/modules/server/users/fetchCurrentUser";
import {fetchCustomers} from "@/lib/api/modules/server/customers/fetchCustomers";
import {fetchProjects} from "@/lib/api/modules/server/projects/fetchProjects";
import {fetchCurrentTimer} from "@/lib/api/modules/server/timers/fetchCurrentTimer";
import {startTimer} from "@/lib/api/modules/server/timers/startTimer";
import {stopTimer} from "@/lib/api/modules/server/timers/stopTimer";

type SsrApiClientOptions = {
    accessToken?: string;
};

export class SsrApiClient extends BaseApiClient {
    private readonly httpClient: HttpClient;

    constructor(options?: SsrApiClientOptions) {
        super();
        const defaultHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options?.accessToken ? {Authorization: `Bearer ${options.accessToken}`} : {}),
        };

        this.httpClient = new HttpClient({
            baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8080/api/v1',
            headers: defaultHeaders,
        })
    }

    /*　認証 */
    async login(organizationCode: string, email: string, password: string): Promise<AuthToken> {
        return await login(this.httpClient, organizationCode, email, password);
    }
    async logout(): Promise<void> {
        return await logout(this.httpClient);
    }

    /* ユーザー */
    async fetchCurrentUser(): Promise<User> {
        return await fetchCurrentUser(this.httpClient);
    }

    /* 組織 */
    async createOrganization(organizationCode: string, organizationName: string, userName: string, email: string, password: string): Promise<Organization> {
        return await createOrganization(this.httpClient, organizationCode, organizationName, userName, email, password);
    }
    async fetchOrganizationByCode(organizationCode: string): Promise<Organization> {
        return await fetchOrganizationByCode(this.httpClient, organizationCode);
    }

    /* カスタマー */
    async fetchCustomers(): Promise<Customer[]> {
        return await fetchCustomers(this.httpClient);
    }

    /* プロジェクト */
    async fetchProjects(): Promise<Project[]> {
        return await fetchProjects(this.httpClient);
    }

    /* タイマー */
    async fetchCurrentTimer(): Promise<Timer> {
        return await fetchCurrentTimer(this.httpClient);
    }
    async startTimer(title: string, memo: string, projectID: number): Promise<Timer> {
        return await startTimer(this.httpClient, title, memo, projectID);
    }
    async stopTimer(timerID: number, title: string, memo: string, projectID: number): Promise<Timer> {
        return await stopTimer(this.httpClient, timerID, title, memo, projectID);
    }
}
