import {NextRequest, NextResponse} from 'next/server';
import {BackendApiClient} from "@/lib/api/client/BackendApiClient";
import {isAxiosError} from "axios";

export async function GET(req: NextRequest, {params}: { params: { organizationCode: string } }) {
    const {organizationCode} = params;

    const apiClient = new BackendApiClient();

    try {
        const res = await apiClient.get(`/organizations/${organizationCode}`);
        return NextResponse.json(res.data);
    } catch (e: unknown) {
        if (isAxiosError(e) && e.status === 404) {
            return NextResponse.json({message: '存在しません'}, {status: 404});
        }
        return NextResponse.json({message: '取得に失敗しました'}, {status: 500});
    }
}
