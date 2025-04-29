import RegisterForm from "@/app/register/RegisterForm";

export default async function RegisterPage() {
    return (
        <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
            <RegisterForm />
        </div>
    );
}
