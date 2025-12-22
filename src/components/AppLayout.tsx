
// src/pages/AppLayout.tsx
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import { supabase } from "../services/supabase";
import LoginPage from "../pages/Login";

const SIDEBAR_WIDTH = 260;
const NAVBAR_HEIGHT = 80;

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Fetch current user on mount
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // If user is not logged in, show login page
  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className="fixed md:static left-0 top-0 h-full z-50"
      />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main area */}
      <div className="flex-1 min-h-screen flex flex-col">

        {/* Top Navbar */}
        <div
          className="fixed top-0 left-0 md:left-[260px] right-0 z-30"
          style={{ height: NAVBAR_HEIGHT }}
        >
          <TopNavbar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
        </div>

        {/* Main content */}
        <main
          className="flex-1 mt-[10px] w-full md:ml-[25px] px-0 pt-[90px]" // pt to offset TopNavbar
        >
          {children}
        </main>

      </div>
    </div>
  );
}
