import {cookies} from "next/headers";
import {BackendApiClient} from "@/lib/api/client/BackendApiClient";
import {Customer} from "@/types/customer";
import {handleApiError} from "@/lib/api/errorHandler";
import CustomerRegisterModalForm from "@/app/customers/CustomerRegisterModalForm";
import {User} from "@/types/user";
import CustomerList from "@/app/customers/CustomerList";

export default async function CustomersPage() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if (!accessToken) {
        throw new Error('アクセストークンがありません');
    }

    const apiClient = new BackendApiClient({accessToken})

    let customers: Customer[] = [];
    try {
        const res = await apiClient.get<Customer[]>("/customers")
        customers = res.data
    } catch (error) {
        const {message} = handleApiError(error);
        throw new Error(message);
    }

    let user: User | null = null;
    try {
        const res = await apiClient.get<User>("/users/me");
        user = res.data
    } catch (error) {
        const {message} = handleApiError(error);
        throw new Error(message);
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">顧客一覧</h1>
                {user.role === "admin" &&
                    <CustomerRegisterModalForm/>
                }
            </div>

            <CustomerList initialCustomers={customers} />
        </div>
    );
}
