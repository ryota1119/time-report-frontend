import Link from "next/link";
import Button from "@/components/elements/buttons/Button";
import {Card} from "@/components/elements/card/Card";
import {CardText} from "@/components/elements/card/CardText";

export default function LogoutCompletePage() {
    return (
        <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
            <Card className={`text-center`}>
                <CardText>ログアウトしました</CardText>
                <Link href="/">
                    <Button>
                        トップページ
                    </Button>
                </Link>
            </Card>
        </div>
    )
}
