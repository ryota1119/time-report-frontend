import {HttpClient} from "@/lib/api/http/HttpClient";
import {Timer} from "@/types/timer";

export const startTimer = async (
    httpClient: HttpClient,
    title: string,
    memo: string,
    projectID: number
): Promise<Timer> => {
    const res = await httpClient.post<Timer>("/api/timers/start", {
        title,
        memo,
        projectID
    });
    return res.data;
}