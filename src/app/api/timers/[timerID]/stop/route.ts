import {NextRequest, NextResponse} from 'next/server';
import {SsrApiClient} from "@/lib/api/client/SsrApiClient";
import {handleApiError} from "@/lib/api/errorHandler";

export async function POST(req: NextRequest, {params}: {
    params: Promise<{ timerID: number, }>
}) {
    const timerID = (await params).timerID;

    const body = await req.json()
    const {title, memo, projectID} = body

    const accessToken = req.cookies.get("access_token")?.value || "";

    const apiClient = new SsrApiClient({accessToken});
    try {
        const timer = await apiClient.stopTimer(
            timerID,
            title,
            memo,
            projectID,
        );
        return NextResponse.json(timer);
    } catch (error) {
        const {message, statusCode} = handleApiError(error);
        return NextResponse.json({message}, {status: statusCode});
    }
}
