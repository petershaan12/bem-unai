import { LoginForm } from "./LoginForm";

export default function page() {
    return (
        <main className="container mx-auto p-4 flex flex-col justify-center items-center h-screen">
            <h2 className="text-4xl font-bold mb-4">Login</h2>
            <LoginForm />
        </main>
    )
}
