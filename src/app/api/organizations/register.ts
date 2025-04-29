import {NextRequest, NextResponse} from "next/server";
import {BackendApiClient} from "@/lib/api/client/BackendApiClient";
import {OrganizationRegisterResponse} from "@/types/organization";
import {isAxiosError} from "axios";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const {organizationCode, organizationName, userName, email, password} = body

    const apiClient = new BackendApiClient()

    try {
        const res = await apiClient.post<OrganizationRegisterResponse>("/auth/login", {
            organizationCode,
            organizationName,
            userName,
            email,
            password,
        })

        const { organizationName: createdOrgName, organizationCode: createdOrgCode } = res.data;
        return NextResponse.json(
            { message: "組織作成成功", organizationName: createdOrgName, organizationCode: createdOrgCode },
            { status: 201 }
        );
    } catch (err: unknown) {
        if (isAxiosError(err)) {
            return NextResponse.json({message: err.message}, {status: err.status})
        }
        return NextResponse.json({message: '作成に失敗しました'}, {status: 500})
    }
}