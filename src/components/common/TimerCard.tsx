'use client'

import {useState} from "react";
import {Timer} from "@/types/timer";
import {startTimer} from "@/lib/api/timer/timer";
import {useAuth} from "@/hooks/useAuth";
import Button from "@/components/ui/buttons/Button";
import {Card} from "@/components/ui/card/Card";

export default function TimerCard() {
    const {user} = useAuth()

    const [timer, setTimer] = useState<Timer>()
    const [timerLoading, setTimerLoading] = useState(false)
    const [timerTitle, setTimerTitle] = useState<string>('')
    const [timerMemo, setTimerMemo] = useState<string | null>(null)
    const [projectID, setProjectID] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleTimer = async () => {
        setTimerLoading(true)
        await startTimer(projectID, timerTitle, timerMemo)
            .then((data) => setTimer(data))
            .catch(() => setError('タイマーの開始に失敗しました'))
            .finally(() => setTimerLoading(false))
    }

    return (
        <div>
            {user && (
                <Card className="w-full  flex items-center justify-between">
                    <div>
                        <label className="block text-sm text-gray-700">タイトル</label>
                        <input
                            type="text"
                            value={timerTitle}
                            onChange={(e) => setTimerTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700">メモ</label>
                        <input
                            type="text"
                            value={timerMemo ?? ''}
                            onChange={(e) => setTimerMemo(e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700">プロジェクトID</label>
                        <input
                            type="number"
                            value={projectID ?? ''}
                            onChange={(e) => setProjectID(Number(e.target.value))}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                    </div>
                    <div className="flex">
                        <p>{timer ? timer.startAt : "00:00:00"}</p>
                        <Button
                            onClick={handleTimer}
                            disabled={timerLoading}
                            className="max-w-[150px] bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {timerLoading ? '開始中...' : 'タイマー開始'}
                        </Button>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                </Card>
            )}
        </div>
    )
}