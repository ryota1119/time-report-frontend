import {NextRequest, NextResponse} from "next/server";
import {BackendApiClient} from "@/lib/api/client/BackendApiClient";
import {TimerResponse} from "@/types/timer";
import {handleApiError} from "@/lib/api/errorHandler";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const {title, memo, projectID} = body

    const accessToken = req.cookies.get("access_token")?.value || "";

    const apiClient = new BackendApiClient({ accessToken })
    try {
        const res = await apiClient.post<TimerResponse>("timers/start", {
            title,
            memo,
            projectID,
        })
        return NextResponse.json(res.data);
    } catch (error: unknown) {
        const { message, statusCode} = handleApiError(error)
        return NextResponse.json({message: message}, {status: statusCode})
    }
}