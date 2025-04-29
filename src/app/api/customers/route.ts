import {NextRequest, NextResponse} from "next/server";
import {BackendApiClient} from "@/lib/api/client/BackendApiClient";
import {Customer} from "@/types/customer";
import {handleApiError} from "@/lib/api/errorHandler";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const {name, unitPrice, startDate, endDate} = body

    const accessToken = req.cookies.get("access_token")?.value || "";

    const apiClient = new BackendApiClient({ accessToken })
    try {
        const res = await apiClient.post<Customer>("/customers", {
            name,
            unitPrice,
            startDate,
            endDate,
        })
        return NextResponse.json(res.data)
    } catch (error) {
        const {message, statusCode} = handleApiError(error)
        return NextResponse.json({message: message}, {status: statusCode})
    }
}