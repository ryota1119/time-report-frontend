import {NextRequest, NextResponse} from 'next/server';
import {SsrApiClient} from "@/lib/api/client/SsrApiClient";
import {handleApiError} from "@/lib/api/errorHandler";

export async function GET(req: NextRequest, {params}: { params: Promise<{ organizationCode: string }> }) {
    const organizationCode = (await params).organizationCode;

    const apiClient = new SsrApiClient();
    try {
        const data = await apiClient.fetchOrganizationByCode(organizationCode);
        return NextResponse.json(data);
    } catch (error) {
        const {message, statusCode} = handleApiError(error)
        if (statusCode === 404) {
            return NextResponse.json({message: '存在しません'}, {status: 404});
        }
        return NextResponse.json({message: message}, {status: statusCode});
    }
}
