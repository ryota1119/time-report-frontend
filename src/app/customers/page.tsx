'use client'

import {redirect} from "next/navigation";
import {useEffect, useState} from "react";
import {Customer} from "@/types/customer";
import {isAxiosError} from "axios";
import {fetchCustomers} from "@/lib/api/customer/customers";

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        fetchCustomers()
            .then(res => {
                setCustomers(res);
            })
            .catch((e: unknown) => {
                if (isAxiosError(e) && e.response?.status === 401) {
                    redirect('/login');
                }
                console.error(e);
            });
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">顧客一覧</h1>

            <div className="space-y-4">
                {customers.map((customer) => (
                    <div key={customer.id} className="border p-4 rounded shadow-sm bg-white">
                        <h2 className="text-lg font-semibold">{customer.name}</h2>
                        <p>単価: ¥{customer.unitPrice}</p>
                        <p>契約開始日: {customer.startDate}</p>
                        <p>契約終了日: {customer.endDate}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
