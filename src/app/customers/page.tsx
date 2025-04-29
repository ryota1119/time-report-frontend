import {cookies} from "next/headers";
import {SsrApiClient} from "@/lib/api/client/SsrApiClient";
import {Customer} from "@/types/customer";
import {handleApiError} from "@/lib/api/errorHandler";
import CustomerRegisterModalForm from "@/app/customers/CustomerRegisterModalForm";
import {User} from "@/types/user";
import CustomerList from "@/app/customers/CustomerList";

export default async function CustomersPage() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    let customers: Customer[] = [];
    const apiClient = new SsrApiClient({accessToken})
    try {
        customers = await apiClient.fetchCustomers()
    } catch (error) {
        const {message} = handleApiError(error);
        throw new Error(message);
    }

    let user: User | null = null;
    try {
        user = await apiClient.fetchCurrentUser()
    } catch (error) {
        const {message} = handleApiError(error);
        throw new Error(message);
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">クライアント</h1>
                {user.role === "admin" &&
                    <CustomerRegisterModalForm/>
                }
            </div>

            <CustomerList initialCustomers={customers}/>
        </div>
    );
}
