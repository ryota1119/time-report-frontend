'use client'

import {redirect} from "next/navigation";
import {useEffect, useState} from "react";
import {Project} from "@/types/project";
import {fetchProjects} from "@/lib/api/project/project";
import {isAxiosError} from "axios";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetchProjects()
            .then(res => {
                setProjects(res);
            })
            .catch((e: unknown) => {
                if (isAxiosError(e) && e.response?.status === 401) {
                    redirect('/login');
                }
                console.error(e);
            });
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">プロジェクト一覧</h1>

            <div className="space-y-4">
                {projects.map((project) => (
                    <div key={project.id} className="border p-4 rounded shadow-sm bg-white">
                        <h2 className="text-lg font-semibold">{project.name}</h2>
                        <p>顧客: {project.customerName}</p>
                        <p>単価: ¥{project.unitPrice}</p>
                        <p>契約開始日: {project.startDate}</p>
                        <p>契約終了日: {project.endDate}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
