'use client'

import {useCallback, useState} from "react";
import {Customer} from "@/types/customer";
import {Card} from "@/components/elements/card/Card";
import CustomerEditModalForm from "@/app/customers/CustomerEditModalForm";

interface Props {
    initialCustomers: Customer[];
}

export default function CustomerList({ initialCustomers }: Props) {
    const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

    const handleSave = useCallback((newCustomer: Customer) => {
        setCustomers((prev) => [...prev, newCustomer]);
    }, [])

    return (
        <div className="space-y-4">
            {customers ? (
                customers.map((customer) => (
                    <Card key={customer.id} className="flex justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">{customer.name}</h2>
                            <p>単価: ¥{customer.unitPrice}</p>
                            <p>契約開始日: {customer.startDate}</p>
                            <p>契約終了日: {customer.endDate}</p>
                        </div>
                        <CustomerEditModalForm onSave={handleSave}/>
                    </Card>
                ))
            ) : (
                <p>登録がありません</p>
            )}
        </div>
    )
}