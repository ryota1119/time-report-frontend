import {HttpClient} from "@/lib/api/http/HttpClient";
import {Timer} from "@/types/timer";

export const stopTimer = async (
    httpClient: HttpClient,
    timerID: number,
    title: string,
    memo: string,
    projectID: number
): Promise<Timer> => {
    const res = await httpClient.post<Timer>(`/api/timers/${timerID}/stop`, {
        title,
        memo,
        projectID
    });
    return res.data;
}