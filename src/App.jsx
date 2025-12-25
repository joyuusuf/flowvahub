import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";
import Login from "./pages/Login";
import Rewards from "./pages/Rewards";
import "./App.css";

export default function App() {
  const [session, setSession] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading || session === undefined) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white">
        <img
          src="/flowva_logo.png"
          alt="Logo"
          className="w-40 h-32"
          style={{
            animationName: 'fade',
            animationDuration: '1.5s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        />
        <style jsx>{`
          @keyframes fade {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return session ? <Rewards /> : <Login />;
}
