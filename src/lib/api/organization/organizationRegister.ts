export const checkOrganization = async (orgCode: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/organizations/${orgCode}`);

    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || '登録に失敗しました');
    }

    return res;

};

export const registerOrganization = async (data: {
    organization_code: string;
    organization_name: string;
    user_name: string;
    user_email: string;
    password: string;
}) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/organizations/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || '登録に失敗しました');
    }

    return res;
};
