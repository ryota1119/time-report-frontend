import {Card} from "@/components/elements/card/Card";
import {cookies} from "next/headers";
import {SsrApiClient} from "@/lib/api/client/SsrApiClient";
import {handleApiError} from "@/lib/api/errorHandler";
import {User} from "@/types/user";
import CustomerRegisterModalForm from "@/app/customers/CustomerRegisterModalForm";
import {Project} from "@/types/project";

export default async function ProjectsPage() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    let projects: Project[] = [];
    const apiClient = new SsrApiClient({accessToken})
    try {
        projects = await apiClient.fetchProjects()
    } catch (error) {
        const {message} = handleApiError(error);
        throw new Error(message);
    }

    let user: User | null = null;
    try {
        user = await apiClient.fetchCurrentUser()
    } catch (error) {
        const {message} = handleApiError(error);
        throw new Error(message);
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">プロジェクト</h1>
                {user.role === "admin" &&
                    <CustomerRegisterModalForm/>
                }
            </div>

            <div className="space-y-4">
                {projects.map((project) => (
                    <Card key={project.id}>
                        <h2 className="text-lg font-semibold">{project.name}</h2>
                        <p>顧客: {project.customerName}</p>
                        <p>単価: ¥{project.unitPrice}</p>
                        <p>契約開始日: {project.startDate}</p>
                        <p>契約終了日: {project.endDate}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
}
