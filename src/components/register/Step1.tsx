import {motion, Variants} from "motion/react";
import Button from "@/components/ui/buttons/Button";
import {Card} from "@/components/ui/card/Card";
import {CardTitle} from "@/components/ui/card/CardTitle";
import {Input} from "@/components/ui/form/Input";

interface Step1Props {
    direction: 1 | -1;
    orgCode: string;
    orgName: string;
    error: string;
    setOrgCode: (value: string) => void;
    setOrgName: (value: string) => void;
    handleCheckOrganization: () => void;
    stepVariants: Variants | undefined
}

export default function Step1({
                                  direction,
                                  orgCode,
                                  orgName,
                                  error,
                                  setOrgCode,
                                  setOrgName,
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
                    value={orgCode}
                    required={true}
                    onChange={setOrgCode}
                >
                    組織コード
                </Input>
                <Input
                    type="text"
                    id="organizationName"
                    placeholder="組織名"
                    value={orgName}
                    required={true}
                    onChange={setOrgName}
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