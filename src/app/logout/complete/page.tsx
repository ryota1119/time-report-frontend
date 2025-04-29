import Link from "next/link";
import Button from "@/components/ui/buttons/Button";
import {Card} from "@/components/ui/card/Card";
import {CardText} from "@/components/ui/card/CardText";

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
