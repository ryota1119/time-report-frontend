import apiClient from '@/lib/api/apiClient'

/**
 * 現在ログイン中かどうかを判定する
 * @returns boolean（true: ログイン済 / false: 未ログイン）
 */
export const checkAuth = async (): Promise<boolean> => {
    try {
        await apiClient.get('/users/me')
        return true
    } catch {
        return false
    }
}