import { Button } from "@/components/ui/button";

const Register: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center w-96 p-5 space-y-5 bg-slate-500 rounded-lg">
                <h1 className="text-3xl">Register</h1>
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
                <Button>Register</Button>
                <h1 className="text-sm text-gray-400">
                    Already have an account? <a href="/login">Login</a>
                </h1>
            </div>
        </div>
    );
};

export default Register;
