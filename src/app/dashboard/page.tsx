'use client'

import {Card} from "@/components/ui/card/Card";
import TimerCard from "@/components/common/TimerCard";

export default function DashboardPage() {
    return (
        <>
            <TimerCard/>
            <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
                <Card>
                    ダッシュボード：未実装
                </Card>
            </div>
        </>
    );
}
