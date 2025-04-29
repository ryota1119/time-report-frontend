'use client'

import {Card} from "@/components/ui/card/Card";
import {useCallback, useEffect, useMemo, useState} from "react";
import {CsrApiClient} from "@/lib/api/client/CsrApiClient";
import {handleApiError} from "@/lib/api/errorHandler";
import {Timer} from "@/types/timer";
import {Project} from "@/types/project";
import Button from "@/components/ui/buttons/Button";
import {Input} from "@/components/ui/form/Input";
import {Select} from "@/components/ui/form/Select";

export default function TimerFormCard() {
    const [loading, setLoading] = useState<boolean>(false);
    const [timer, setTimer] = useState<Timer | null>(null);
    const [timerTitle, setTimerTitle] = useState<string>('');
    const [timerMemo, setTimerMemo] = useState<string>('');
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0); // 経過秒数

    const apiClient = useMemo(() => new CsrApiClient(), []);

    const fetchCurrentTimer = useCallback(async () => {
        setError(null);

        try {
            const res = await apiClient.get<Timer>('/api/timers/current');
            if (res.status !== 204) {
                setTimer(res.data);
                setTimerTitle(res.data.title ?? '');
                setTimerMemo(res.data.memo ?? '');
                setSelectedProjectId(res.data.projectID);
            }
        } catch (error) {
            const {message} = handleApiError(error);
            setError(message);
        }
    }, [apiClient]);

    const fetchProjects = useCallback(async () => {
        setError(null);

        try {
            const res = await apiClient.get<Project[]>('/api/projects');
            setProjects(res.data);
        } catch (error) {
            const {message} = handleApiError(error);
            setError(message);
        }
    }, [apiClient]);

    const handleTimerStart = useCallback(async () => {
        setLoading(true);
        setError(null);

        await apiClient.post<Timer>('/api/timers/start', {
            title: timerTitle,
            memo: timerMemo,
            projectID: selectedProjectId,
        })
            .then((res) => setTimer(res.data))
            .catch((error) => {
                const {message} = handleApiError(error);
                setError(message);
            })
            .finally(() => setLoading(false));
    }, [apiClient, selectedProjectId, timerMemo, timerTitle]);

    const handleTimerStop = useCallback(async () => {
        if (!timer) return;

        setLoading(true);
        setError(null);

        await apiClient.post(`/api/timers/${timer.id}/stop`)
            .then(() => {
                setTimer(null)
                setTimerTitle('');
                setTimerMemo('');
                setSelectedProjectId(null);
            })
            .catch((error) => {
                const {message} = handleApiError(error);
                setError(message);
            })
            .finally(() => setLoading(false));
    }, [apiClient, timer]);

    const padZero = (num: number) => String(num).padStart(2, '0');

    useEffect(() => {
        fetchCurrentTimer()
            .catch(() => {
            });
        fetchProjects()
            .catch(() => {
            });
    }, [fetchCurrentTimer, fetchProjects]);

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
                        options={projects.map((project) => ({
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
