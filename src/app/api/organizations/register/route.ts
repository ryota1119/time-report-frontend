import {NextRequest, NextResponse} from "next/server";
import {SsrApiClient} from "@/lib/api/client/SsrApiClient";
import {handleApiError} from "@/lib/api/errorHandler";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const {organizationCode, organizationName, userName, email, password} = body

    const apiClient = new SsrApiClient()

    try {
        const data = await apiClient.createOrganization(
            organizationCode,
            organizationName,
            userName,
            email,
            password,
        )
        const { organizationName: createdOrgName, organizationCode: createdOrgCode } = data;

        return NextResponse.json(
            { message: "組織作成成功", organizationName: createdOrgName, organizationCode: createdOrgCode },
            { status: 201 }
        );
    } catch (error) {
        const {message, statusCode} = handleApiError(error);

        return NextResponse.json({message: message}, {status: statusCode})
    }
}