import {motion, Variants} from "motion/react";
import Button from "@/components/elements/buttons/Button";
import {Card} from "@/components/elements/card/Card";
import {CardTitle} from "@/components/elements/card/CardTitle";
import {Input} from "@/components/elements/form/Input";

interface Step1Props {
    direction: 1 | -1;
    organizationCode: string;
    organizationName: string;
    error: string;
    setOrganizationCode: (value: string) => void;
    setOrganizationName: (value: string) => void;
    handleCheckOrganization: () => void;
    stepVariants: Variants | undefined
}

export default function Step1({
                                  direction,
                                  organizationCode,
                                  organizationName,
                                  error,
                                  setOrganizationCode,
                                  setOrganizationName,
                                  handleCheckOrganization,
                                  stepVariants,
                              }: Step1Props) {
    return (
        <motion.div
            key="step1"
            custom={direction}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{duration: 0.4}}
            className="w-full max-w-md"
        >
            <Card>
                <CardTitle>組織登録</CardTitle>
                <Input
                    type="text"
                    id="organizationCode"
                    placeholder="例: org123"
                    value={organizationCode}
                    required={true}
                    onChange={setOrganizationCode}
                >
                    組織コード
                </Input>
                <Input
                    type="text"
                    id="organizationName"
                    placeholder="組織名"
                    value={organizationName}
                    required={true}
                    onChange={setOrganizationName}
                >
                    組織名
                </Input>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <Button
                    onClick={handleCheckOrganization}
                    className="w-full"
                >
                    次へ
                </Button>
            </Card>
        </motion.div>
    )
}