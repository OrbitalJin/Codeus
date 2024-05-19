import { useState } from "react";
import { Button } from "./components/ui/button";
import Navbar from "./components/Navbar";
import axios from "axios";

type User = {
    id: number;
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
};

const App: React.FC = () => {
    const [count, setCount] = useState(0);

    // Query & store java backend user data then display it
    const [data, setData] = useState<User[]>([]);

    const fetchData = async () => {
        axios.get("http://localhost:8080/users/").then(response => {
            console.log(response.data?.data);
            setData(response.data?.data);
        });
    };

    return (
        <>
            <Navbar />
            <div>
                {data.map(item => (
                    <div key={item.id}>{item.username}</div>
                ))}
            </div>
            <p>Count: {count}</p>
            <Button
                onClick={() => {
                    setCount(count + 1);
                    fetchData();
                }}
            >
                Click me
            </Button>
        </>
    );
};

export default App;
