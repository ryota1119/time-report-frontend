import {HttpClient} from "@/lib/api/http/HttpClient";
import {Timer} from "@/types/timer";

export const fetchCurrentTimer = async (
    httpClient: HttpClient
): Promise<Timer> => {
    const res = await httpClient.get<Timer>('/timers/current');
    return res.data;
}