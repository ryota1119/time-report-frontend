import {User} from "@/types/user";
import {AuthToken} from "@/types/auth";
import {Organization} from "@/types/organization";
import {Customer} from "@/types/customer";
import {Project} from "@/types/project";
import {Timer} from "@/types/timer";

export abstract class BaseApiClient {
    abstract login(organizationCode: string, email: string, password: string): Promise<AuthToken>;

    abstract logout(): Promise<void>;

    abstract fetchCurrentUser(): Promise<User>;

    abstract createOrganization(organizationCode: string, organizationName: string, userName: string, email: string, password: string): Promise<Organization>;

    abstract fetchOrganizationByCode(organizationCode: string): Promise<Organization>;

    abstract fetchCustomers(): Promise<Customer[]>;

    abstract fetchProjects(): Promise<Project[]>;

    abstract fetchCurrentTimer(): Promise<Timer>

    abstract startTimer(title: string, memo: string, projectID: number): Promise<Timer>;

    abstract stopTimer(timerID: number, title: string, memo: string, projectID: number): Promise<Timer>;
}