import {useState, useEffect, useMemo} from "react";
import { fetchCurrentUser } from "@/lib/api/user/fetchCurrentUser";
import { User } from "@/types/user";
import {CsrApiClient} from "@/lib/api/client/CsrApiClient";

export const useCurrentUser = () => {
    const [user, setUser] = useState<User | null>(null);

    const apiClient = useMemo(() => new CsrApiClient(), []);

    useEffect(() => {
        const fetch = async () => {
            const data = await fetchCurrentUser(apiClient);
            setUser(data);
        };
        fetch();
    }, [apiClient]);

    return { user };
};
