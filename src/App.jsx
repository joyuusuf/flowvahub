// import { useEffect, useState } from "react";
// import { supabase } from "./services/supabase";
// import Login from "./pages/Login";
// import Rewards from "./pages/Rewards";

// export default function App() {
//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data }) => {
//       setSession(data.session);
//     });

//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });
//   }, []);

//   return session ? <Rewards /> : <Login />;
// }


import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";
import Login from "./pages/Login";
import Rewards from "./pages/Rewards";

export default function App() {
  const [session, setSession] = useState(undefined); // NOT null

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

  // 🔹 LOADING STATE (THIS FIXES BLANK SCREEN)
  if (session === undefined) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-purple-600 font-semibold">Initializing app...</p>
      </div>
    );
  }

  return session ? <Rewards /> : <Login />;
}

