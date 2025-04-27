import Link from "next/link";
import Button from "@/components/ui/buttons/Button";

export default function LogoutCompletePage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Link href="/">
                <Button>
                    トップページ
                </Button>
            </Link>
        </div>
    )
}
