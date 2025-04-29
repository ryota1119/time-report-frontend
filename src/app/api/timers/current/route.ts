import {SsrApiClient} from "@/lib/api/client/SsrApiClient";
import {NextRequest, NextResponse} from "next/server";
import {handleApiError} from "@/lib/api/errorHandler";

export async function GET(req: NextRequest) {
    const accessToken = req.cookies.get("access_token")?.value || "";

    const apiClient = new SsrApiClient({ accessToken })
    try {
        const timer = await apiClient.fetchCurrentTimer()
        if (!timer) {
            return new NextResponse(null, { status: 204 });
        }
        return NextResponse.json(timer);
    } catch (error: unknown) {
        const { message, statusCode} = handleApiError(error)
        return NextResponse.json({message: message}, {status: statusCode})
    }
}