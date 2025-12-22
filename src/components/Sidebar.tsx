import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import clsx from "clsx";
import { Home, Compass, Library, Layers, CreditCard, Diamond, Settings, X } from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, active: true },
  { label: "Discover", icon: Compass },
  { label: "Library", icon: Library },
  { label: "Tech Stack", icon: Layers },
  { label: "Subscriptions", icon: CreditCard },
  { label: "Rewards Hub", icon: Diamond },
  { label: "Settings", icon: Settings },
];

export default function Sidebar({ open, onClose }: any) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 z-50 h-screen w-[260px] bg-white border-r border-gray-200 flex flex-col transition-transform duration-300",
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-6 py-6 border-b border-gray-100">
        <span className="text-2xl font-extrabold text-purple-600">☁️</span>
        <span className="text-xl font-bold text-purple-600">flowva</span>
        <button onClick={onClose} className="ml-auto md:hidden p-2 rounded-md hover:bg-gray-100">
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            className={clsx(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition",
              active ? "bg-purple-100 text-purple-600" : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="px-6 py-6 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
            {user?.email?.[0].toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-sm font-semibold">{user?.email || "Guest"}</p>
            <button
              className="text-xs text-gray-500 underline"
              onClick={async () => await supabase.auth.signOut()}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
