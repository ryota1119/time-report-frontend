import {BaseApiClient} from './BaseApiClient';
import {HttpClient} from "@/lib/api/http/HttpClient";
import {AuthToken} from "@/types/auth";
import {Organization} from "@/types/organization";
import {User} from "@/types/user";
import {Customer} from "@/types/customer";
import {Project} from "@/types/project";
import {Timer} from "@/types/timer";
import {login} from "@/lib/api/modules/client/auth/login";
import {logout} from "@/lib/api/modules/client/auth/logout";
import {createOrganization} from "@/lib/api/modules/client/organizations/createOrganization";
import {fetchOrganizationByCode} from "@/lib/api/modules/client/organizations/fetchOrganizationByCode";
import {fetchCurrentUser} from "@/lib/api/modules/client/users/fetchCurrentUser";
import {fetchCustomers} from "@/lib/api/modules/client/projects/fetchCustomers";
import {fetchProjects} from "@/lib/api/modules/client/customers/fetchProjects";
import {fetchCurrentTimer} from "@/lib/api/modules/client/timers/fetchCurrentTimer";
import {startTimer} from "@/lib/api/modules/client/timers/startTimer";
import {stopTimer} from "@/lib/api/modules/client/timers/stopTimer";

export class CsrApiClient extends BaseApiClient {
    private readonly httpClient: HttpClient;

    constructor() {
        super();
        this.httpClient = new HttpClient({
            baseURL: process.env.NEXT_PUBLIC_FRONT_URL || 'http://localhost:3000',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
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
