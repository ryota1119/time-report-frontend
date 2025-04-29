import {fetchUsers} from "@/lib/api/user/user";
import {Card} from "@/components/elements/card/Card";

export default async function UsersPage() {
    const users = await fetchUsers();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">メンバー一覧</h1>

            <div className="space-y-4">
                {users.map((user) => (
                    <Card key={user.id}>
                        <h2 className="text-lg font-semibold">{user.name}</h2>
                        <p>権限: {user.role}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
}
