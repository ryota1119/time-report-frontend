import {getProjects} from "@/lib/api/project/project";
import {Card} from "@/components/ui/card/Card";

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">プロジェクト一覧</h1>

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
