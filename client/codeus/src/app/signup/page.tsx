"use client";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function Page() {
  const [createUser] = useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    try {
      const res = await createUser("root@root.com", "password");
      console.log({ res });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>Login Page</div>
      <Button onClick={handleSignUp}></Button>
    </div>
  );
}
