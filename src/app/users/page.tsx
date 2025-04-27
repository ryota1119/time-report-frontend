'use client'

import {redirect} from "next/navigation";
import {useEffect, useState} from "react";
import {User} from "@/types/user";
import {isAxiosError} from "axios";
import {fetchUsers} from "@/lib/api/user/user";

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers()
            .then(res => {
                setUsers(res);
            })
            .catch((e: unknown) => {
                if (isAxiosError(e) && e.response?.status === 401) {
                    redirect('/login');
                }
                console.error(e);
            });
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">メンバー一覧</h1>

            <div className="space-y-4">
                {users.map((user) => (
                    <div key={user.id} className="border p-4 rounded shadow-sm bg-white">
                        <h2 className="text-lg font-semibold">{user.name}</h2>
                        <p>権限: {user.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
