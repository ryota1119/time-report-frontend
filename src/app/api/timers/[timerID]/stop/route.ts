import {NextRequest, NextResponse} from 'next/server';
import {BackendApiClient} from "@/lib/api/client/BackendApiClient";
import {handleApiError} from "@/lib/api/errorHandler";
import {TimerResponse} from "@/types/timer";

export async function POST(req: NextRequest, { params }: { params: Promise<{ timerID: string }> }) {
    const timerID = (await params).timerID;
    const accessToken = req.cookies.get("access_token")?.value || "";

    const apiClient = new BackendApiClient({accessToken});
    try {
        const res = await apiClient.post<TimerResponse>(`/timers/${timerID}/stop`);
        return NextResponse.json(res.data);
    } catch (error) {
        const {message, statusCode} = handleApiError(error);
        console.log(message, statusCode);
        return NextResponse.json({message}, {status: statusCode});
    }
}
