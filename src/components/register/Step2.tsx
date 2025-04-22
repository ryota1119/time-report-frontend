type Step2Props = {
    userName: string;
    userEmail: string;
    password: string;
    onChangeName: (v: string) => void;
    onChangeEmail: (v: string) => void;
    onChangePassword: (v: string) => void;
    onBack: () => void;
    onRegister: () => void;
    error: string;
};

export default function Step2({
                                  userName,
                                  userEmail,
                                  password,
                                  onChangeName,
                                  onChangeEmail,
                                  onChangePassword,
                                  onBack,
                                  onRegister,
                                  error,
                              }: Step2Props) {
    return (
        <div className="flex flex-col gap-4">
            <input
                placeholder="氏名"
                value={userName}
                onChange={(e) => onChangeName(e.target.value)}
                className="border p-2 rounded"
                required
            />
            <input
                placeholder="メールアドレス"
                type="email"
                value={userEmail}
                onChange={(e) => onChangeEmail(e.target.value)}
                className="border p-2 rounded"
                required
            />
            <input
                placeholder="パスワード"
                type="password"
                value={password}
                onChange={(e) => onChangePassword(e.target.value)}
                className="border p-2 rounded"
                required
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex gap-2">
                <button className="bg-gray-300 py-2 px-4 rounded" onClick={onBack}>戻る</button>
                <button className="bg-green-600 text-white py-2 px-4 rounded" onClick={onRegister}>登録</button>
            </div>
        </div>
    );
}
