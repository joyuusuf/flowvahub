import { Bell, Menu } from "lucide-react";

interface TopNavbarProps {
  onSidebarToggle?: () => void;
}

export default function TopNavbar({ onSidebarToggle }: TopNavbarProps) {
  return (
    <header className="h-[80px] bg-white border-b border-gray-200 shadow-sm">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
            onClick={onSidebarToggle}
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>

          <div>
            <h1 className="text-left text-xl md:text-2xl font-bold text-gray-900">
              Rewards Hub
            </h1>
            <p className="text-sm text-gray-500">
              Earn points, unlock rewards, and celebrate your progress!
            </p>
          </div>
        </div>

        {/* Right */}
        <button className="relative h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
          <Bell className="h-5 w-5 text-gray-700" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            1
          </span>
        </button>
      </div>
    </header>
  );
}
