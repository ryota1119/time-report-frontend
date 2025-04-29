import {isAxiosError} from "axios";

type HandledApiError = {
    message: string;
    statusCode: number;
}

export const handleApiError = (error: unknown): HandledApiError => {
    if (isAxiosError(error)) {
        console.log(error);
        if (!error.response) {
            return { message: 'ネットワークエラーが発生しました', statusCode: 0 };
        }

        const status = error.response.status;
        const message = error.response.data?.message || 'エラーが発生しました';

        if (status === 401) {
            return { message: '認証エラーが発生しました', statusCode: 401 };
        }

        return { message: message, statusCode: status };
    }

    return { message: '予期せぬエラーが発生しました', statusCode: 500 };
};
