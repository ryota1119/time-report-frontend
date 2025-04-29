'use client'

import {Card} from "@/components/elements/card/Card";
import {useCallback, useEffect, useMemo, useState} from "react";
import {CsrApiClient} from "@/lib/api/client/CsrApiClient";
import {handleApiError} from "@/lib/api/errorHandler";
import {Timer} from "@/types/timer";
import {Project} from "@/types/project";
import Button from "@/components/elements/buttons/Button";
import {Input} from "@/components/elements/form/Input";
import {Select} from "@/components/elements/form/Select";

interface Props {
    projects: Project[];
}

export default function TimerFormCard(props: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [timer, setTimer] = useState<Timer | null>(null);
    const [timerTitle, setTimerTitle] = useState<string>('');
    const [timerMemo, setTimerMemo] = useState<string>('');
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0); // 経過秒数

    const apiClient = useMemo(() => new CsrApiClient(), []);

    const fetchCurrentTimer = useCallback(async () => {
        setError(null);

        try {
            const timer = await apiClient.fetchCurrentTimer();
            if (timer) {
                setTimer(timer);
                setTimerTitle(timer.title ?? '');
                setTimerMemo(timer.memo ?? '');
                setSelectedProjectId(timer.projectID);
            }
        } catch (error) {
            const {message} = handleApiError(error);
            setError(message);
        }
    }, [apiClient]);

    const handleTimerStart = useCallback(async () => {
        setLoading(true);
        setError(null);

        if (selectedProjectId === null) {
            setError('プロジェクトを洗濯してください');
            return;
        }

        try {
            const timer = await apiClient.startTimer(
                timerTitle,
                timerMemo,
                selectedProjectId,
            )
            setTimer(timer)
        } catch (error) {
            const {message} = handleApiError(error);
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [apiClient, selectedProjectId, timerMemo, timerTitle]);

    const handleTimerStop = useCallback(async () => {
        if (!timer) return;

        setLoading(true);
        setError(null);

        if (selectedProjectId === null) {
            setError('プロジェクトを洗濯してください');
            return;
        }

        try {
            await apiClient.stopTimer(
                timer.id,
                timerTitle,
                timerMemo,
                selectedProjectId,
            )
            setTimer(null)
            setTimerTitle('');
            setTimerMemo('');
            setSelectedProjectId(null);
        } catch (error) {
            const {message} = handleApiError(error);
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [apiClient, selectedProjectId, timer, timerMemo, timerTitle]);

    const padZero = (num: number) => String(num).padStart(2, '0');

    useEffect(() => {
        fetchCurrentTimer()
            .catch(() => {
            });
    }, [fetchCurrentTimer]);

    useEffect(() => {
        if (!timer) {
            setElapsedTime(0);
            return;
        }

        const start = new Date(timer.startAt).getTime();

        const intervalId = setInterval(() => {
            const now = Date.now();
            const diffSeconds = Math.floor((now - start) / 1000);
            setElapsedTime(diffSeconds);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timer]);

    return (
        <Card className="p-6 mb-6">
            <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                    <Input
                        type="text"
                        id="timerTitle"
                        placeholder="タイトル"
                        value={timerTitle}
                        required={true}
                        onChange={setTimerTitle}
                        className="w-64"
                    />
                    <Input
                        type="text"
                        id="timerMemo"
                        placeholder="メモ"
                        value={timerMemo}
                        required={true}
                        onChange={setTimerMemo}
                        className="w-64"
                    />
                    <Select<number>
                        id="project"
                        value={selectedProjectId}
                        options={props.projects.map((project) => ({
                            value: project.id,
                            label: project.name,
                        }))}
                        onChange={setSelectedProjectId}
                        disabled={loading}
                        className="min-w-64"
                    />
                </div>
                <div className="flex space-x-4">
                    {timer ? (
                        <>
                            <div className="flex items-center">
                                <p>
                                    {padZero(Math.floor(elapsedTime / 3600))}:
                                    {padZero(Math.floor((elapsedTime % 3600) / 60))}:
                                    {padZero(elapsedTime % 60)}
                                </p>
                            </div>
                            <Button
                                onClick={handleTimerStop}
                                disabled={loading}
                                className="bg-red-500 hover:bg-red-600"
                            >
                                {loading ? '停止中...' : 'タイマー停止'}
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={handleTimerStart}
                            disabled={loading}
                        >
                            {loading ? '開始中...' : 'タイマー開始'}
                        </Button>
                    )}
                </div>
            </div>
            {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
            )}
        </Card>
    );
}
