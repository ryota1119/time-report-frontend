import {motion, Variants} from "motion/react";
import Button from "@/components/elements/buttons/Button";
import BackButton from "@/components/elements/buttons/BackButton";
import {Card} from "@/components/elements/card/Card";

interface Step2Props {
    direction: 1 | -1;
    userName: string;
    email: string;
    password: string;
    error: string;
    setUserName: (value: string) => void;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    setDirection:  (value: 1 | -1 ) => void;
    setStep: (value: number) => void;
    handleRegister: () => void;
    stepVariants: Variants | undefined
}

export default function Step2({
                                  direction,
                                  userName,
                                  email,
                                  password,
                                  error,
                                  setUserName,
                                  setEmail,
                                  setPassword,
                                  setDirection,
                                  setStep,
                                  handleRegister,
                                  stepVariants,
                              }: Step2Props) {
    return (
        <motion.div
            key="step2"
            custom={direction}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{duration: 0.4}}
            className="w-full max-w-md"
        >
            <Card>
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">管理者登録</h1>
                <div>
                    <label htmlFor="userName"
                           className="block text-sm font-medium text-gray-700 mb-1">
                        氏名
                    </label>
                    <input
                        id="userName"
                        placeholder="氏名"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        メールアドレス
                    </label>
                    <input
                        id="email"
                        placeholder="メールアドレス"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password"
                           className="block text-sm font-medium text-gray-700 mb-1">
                        パスワード
                    </label>
                    <input
                        id="password"
                        placeholder="パスワード"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div className="flex gap-2">
                    <BackButton
                        onClick={() => {
                            setDirection(-1);
                            setStep(1);
                        }}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 font-semibold py-2 rounded transition-colors"
                    >
                        戻る
                    </BackButton>
                    <Button
                        onClick={handleRegister}
                        className="flex-1"
                    >
                        登録
                    </Button>
                </div>
            </Card>
        </motion.div>
    )
}