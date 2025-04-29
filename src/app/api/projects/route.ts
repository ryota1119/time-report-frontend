import {NextRequest, NextResponse} from "next/server";
import {SsrApiClient} from "@/lib/api/client/SsrApiClient";
import {handleApiError} from "@/lib/api/errorHandler";

export async function GET(req: NextRequest) {
    const accessToken = req.cookies.get("access_token")?.value || "";

    const apiClient = new SsrApiClient({ accessToken })
    try {
        const projects = await apiClient.fetchProjects()
        return NextResponse.json(projects);
    } catch (error: unknown) {
        const { message, statusCode} = handleApiError(error)
        return NextResponse.json({message: message}, {status: statusCode})
    }
}