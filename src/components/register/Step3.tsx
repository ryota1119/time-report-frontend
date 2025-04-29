import {motion, Variants} from "motion/react";
import Link from "next/link";
import {Card} from "@/components/ui/card/Card";
import {CardTitle} from "@/components/ui/card/CardTitle";

interface Step3Props {
    direction: 1 | -1;
    stepVariants: Variants | undefined
}

export default function Step3({
                                  direction,
                                  stepVariants,
                              }: Step3Props) {
    return (
        <motion.div
            key="step3"
            custom={direction}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{duration: 0.4}}
            className="w-full max-w-md"
        >
            <Card className={`text-center`}>
                <CardTitle>登録が完了しました！</CardTitle>
                <Link href="/login"
                      className="inline-block bg-blue-600 text-white py-2 px-4 rounded">
                    ログイン画面へ
                </Link>
            </Card>
        </motion.div>
    )
}