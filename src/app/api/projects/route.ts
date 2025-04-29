import {NextRequest, NextResponse} from "next/server";
import {BackendApiClient} from "@/lib/api/client/BackendApiClient";
import {handleApiError} from "@/lib/api/errorHandler";
import {Project} from "@/types/project";

export async function GET(req: NextRequest) {
    const accessToken = req.cookies.get("access_token")?.value || "";

    const apiClient = new BackendApiClient({ accessToken })
    try {
        const res = await apiClient.get<Project[]>("projects")
        return NextResponse.json(res.data);
    } catch (error: unknown) {
        const { message, statusCode} = handleApiError(error)
        return NextResponse.json({message: message}, {status: statusCode})
    }
}