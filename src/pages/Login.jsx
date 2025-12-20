import { useState } from "react";
import { supabase } from "../services/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-xl shadow w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-4 rounded"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
