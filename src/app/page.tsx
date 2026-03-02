"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
          <h1 className="text-2xl font-bold mb-6">Collector Platform</h1>
          <p>Please log in to continue.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back 👋
        </h1>

        <p className="text-gray-500 mb-6">
          {user.email}
        </p>

        <div className="space-y-3">
          <button className="w-full bg-black text-white py-2 rounded-xl hover:opacity-90 transition">
            View Collection
          </button>

          <button className="w-full bg-gray-200 py-2 rounded-xl hover:bg-gray-300 transition">
            Add New Card
          </button>

          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
