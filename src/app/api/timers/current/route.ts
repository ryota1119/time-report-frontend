import {BackendApiClient} from "@/lib/api/client/BackendApiClient";
import {NextRequest, NextResponse} from "next/server";
import {TimerResponse} from "@/types/timer";
import {handleApiError} from "@/lib/api/errorHandler";

export async function GET(req: NextRequest) {
    const accessToken = req.cookies.get("access_token")?.value || "";

    const apiClient = new BackendApiClient({ accessToken })
    try {
        const res = await apiClient.get<TimerResponse>("timers/current")
        if (res.status === 204) {
            return new NextResponse(null, { status: 204 });
        }
        return NextResponse.json(res.data);
    } catch (error: unknown) {
        const { message, statusCode} = handleApiError(error)
        return NextResponse.json({message: message}, {status: statusCode})
    }
}