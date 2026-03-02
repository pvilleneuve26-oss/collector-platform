"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Check your email for login link!");
    }
  };

  return (
    <main style={{ padding: "20px" }}>
      <h1>Collector Platform Login</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />

      <button onClick={handleLogin} style={{ padding: "10px" }}>
        Login
      </button>
    </main>
  );
}
