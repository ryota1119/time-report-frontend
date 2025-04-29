export type Timer = {
    id: number
    title: string
    memo: string | null
    startAt: string
    endAt: string | null
    projectID: number
}

export type TimerRequest = {
    title: string
    memo: string
    projectID: number | null
}

export interface TimerResponse extends TimerRequest {
    id: number;
    startAt: string;
    endAt: string | null;
}

