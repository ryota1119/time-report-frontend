'use client'

import React, {useCallback, useMemo, useState} from "react";
import {CsrApiClient} from "@/lib/api/client/CsrApiClient";
import {handleApiError} from "@/lib/api/errorHandler";
import {Input} from "@/components/elements/form/Input";
import Button from "@/components/elements/buttons/Button";
import {Card} from "@/components/elements/card/Card";
import {CardTitle} from "@/components/elements/card/CardTitle";
import ButtonCancel from "@/components/elements/buttons/ButtonCancel";

export default function CustomerRegisterModalForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [customerName, setCustomerName] = useState<string>("");
    const [customerUnitPrice, setCustomerUnitPrice] = useState<number | null>(null);
    const [customerStartDate, setCustomerStartDate] = useState<string | null>(null);
    const [customerEndDate, setCustomerEndDate] = useState<string | null>(null);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const apiClient = useMemo(() => new CsrApiClient(), []);

    const registerCustomer = useCallback(async () => {
        setError(null);

        try {
            await apiClient.post("/api/customers", {
                name: customerName,
                unitPrice: customerUnitPrice,
                startDate: customerStartDate,
                endDate: customerEndDate,
            });
        } catch (error) {
            const {message} = handleApiError(error);
            setError(message);
        }
    }, [apiClient, customerEndDate, customerName, customerStartDate, customerUnitPrice])

    const handleSave = async () => {
        setLoading(true);
        try {
            await registerCustomer();
            closeModal();
        } catch (error) {
            console.error("保存に失敗しました", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button type="button" onClick={openModal} className="max-h-10">
                新規登録
            </Button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-md p-6 bg-white rounded shadow-lg">
                        <CardTitle>顧客新規登録</CardTitle>

                        <Input<"text", false>
                            type="text"
                            id="customerName"
                            placeholder="顧客名"
                            value={customerName}
                            required
                            onChange={setCustomerName}
                        />
                        <Input<"number", true>
                            type="number"
                            id="customerUnitPrice"
                            placeholder="顧客単価"
                            value={customerUnitPrice}
                            required
                            nullable={true}
                            onChange={setCustomerUnitPrice}
                        />
                        <Input<"date", true>
                            type="date"
                            id="customerStartDate"
                            placeholder="開始日"
                            value={customerStartDate}
                            required
                            nullable={true}
                            onChange={setCustomerStartDate}
                        />
                        <Input<"date", true>
                            type="date"
                            id="customerEndDate"
                            placeholder="終了日"
                            value={customerEndDate}
                            required
                            nullable={true}
                            onChange={setCustomerEndDate}
                        />
                        {error && (
                            <div className="text-red-500 text-sm text-center">{error}</div>
                        )}

                        <div className="flex justify-end gap-2 mt-6">
                            <ButtonCancel type="button" onClick={closeModal}>
                                キャンセル
                            </ButtonCancel>
                            <Button type="button" onClick={handleSave}>
                                {loading ? '...' : '登録'}
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </>
    )
}
