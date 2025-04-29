'use client'

import React, { useState } from "react";
import Button from "@/components/elements/buttons/Button";
import { Card } from "@/components/elements/card/Card";
import { CardTitle } from "@/components/elements/card/CardTitle";
import ButtonCancel from "@/components/elements/buttons/ButtonCancel";

interface ModalProps {
    children: React.ReactNode;
    buttonText: string;
    title?: string;
    isEdit?: boolean;
    onSave?: () => Promise<void>;
}

export const Modal: React.FC<ModalProps> = ({
                                                children,
                                                buttonText,
                                                title,
                                                isEdit = false,
                                                onSave,
                                            }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            if (onSave) {
                await onSave();
                closeModal();
            }
        } catch (error) {
            console.error("保存に失敗しました", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Button type="button" onClick={openModal} className="max-h-10">
                {buttonText}
            </Button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-md p-6 bg-white rounded shadow-lg">
                        {title && <CardTitle>{title}</CardTitle>}

                        {children}

                        <div className="flex justify-end gap-2 mt-6">
                            <ButtonCancel type="button" onClick={closeModal}>
                                キャンセル
                            </ButtonCancel>
                            <Button type="button" onClick={handleSave}>
                                {loading
                                    ? '登録中'
                                    : isEdit ? '更新' : '保存'
                                }
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
};
