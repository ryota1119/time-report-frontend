import apiClient from "@/lib/api/apiClient"
import {Timer} from "@/types/timer";

export const startTimer = async (
    projectID: number | null | undefined,
    title: string,
    memo: string | null,
): Promise<Timer> => {
    const res = await apiClient.post('/timers/start', {
        projectID: projectID,
        title: title,
        memo: memo,
    })

    const data = res.data

    return {
        id: data.id,
        title: data.title,
        memo: data.memo,
        startAt: data.startAt,
        endAt: data.endAt,
        projectID: data.projectID,
    }
}
