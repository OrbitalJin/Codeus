import { Button } from "@/components/ui/button";

const Login: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center w-96 p-5 space-y-5 bg-slate-500 rounded-lg">
                <h1 className="text-3xl">Login</h1>
                <input
                    type="text"
                    placeholder="Username"
                    className="p-2 border border-gray-300 rounded-lg"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-2 border border-gray-300 rounded-lg"
                />
                <Button>Login</Button>
                <h1 className="text-sm text-gray-400">
                    Don't have an account? <a href="/register">Register</a>
                </h1>
            </div>
        </div>
    );
};

export default Login;
