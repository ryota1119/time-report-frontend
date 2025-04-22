import {cookies} from "next/headers";
import {createSsrApiClient} from "@/lib/api/ssrApiClient";
import {redirect} from "next/navigation";
import {AxiosError} from "axios";

export default async function DashboardPage() {
    const cookieStr = (await cookies()).getAll().map(c => `${c.name}=${c.value}`).join('; ')
    const client = createSsrApiClient({req: {headers: {cookie: cookieStr}}})

    try {
        const res = await client.get('/projects')
        const projects = res.data
        return (
            <div>
                <h1>プロジェクト一覧</h1>
                <div>
                    <h2>プロジェクト一覧</h2>
                    <pre>{JSON.stringify(projects, null, 2)}</pre>
                </div>
            </div>
        )
    } catch (e: unknown) {
        const error = e as AxiosError;
        if (error.response?.status === 401) {
            redirect('/login')
        }
        throw e
    }
}
