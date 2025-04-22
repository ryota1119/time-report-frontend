type Step1Props = {
    orgCode: string;
    orgName: string;
    onChangeCode: (v: string) => void;
    onChangeName: (v: string) => void;
    onNext: () => void;
    error: string;
};

export default function Step1({ orgCode, orgName, onChangeCode, onChangeName, onNext, error }: Step1Props) {
    return (
        <div className="flex flex-col gap-4">
            <input placeholder="組織コード" value={orgCode} onChange={(e) => onChangeCode(e.target.value)} className="border p-2 rounded" />
            <input placeholder="組織名" value={orgName} onChange={(e) => onChangeName(e.target.value)} className="border p-2 rounded" />
            {error && <p className="text-red-500">{error}</p>}
            <button onClick={onNext} className="bg-blue-600 text-white py-2 rounded">次へ</button>
        </div>
    );
}
