import {
  Outlet,
  createFileRoute,
  Link,
  useLocation,
} from "@tanstack/react-router";
import {
  LayoutDashboard,
  Gamepad2,
  Trophy,
  Award,
  Settings,
  Code2,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/_layout")({
  component: LayoutPage,
});

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Categories", icon: Gamepad2, to: "/categories" },
  { label: "Leaderboard", icon: Trophy, to: "/leaderboard" },
  { label: "Achievements", icon: Award, to: "/achievements" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

function LayoutPage() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#dfeef7] text-gray-900 overflow-hidden">
      {/* LEFT SIDEBAR */}
      <aside className="w-72 min-h-screen shrink-0 bg-gradient-to-b from-indigo-500 to-purple-600 border-r border-white/10 p-5 flex flex-col">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Code2 className="h-5 w-5 text-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">CodeArena</h1>
            <p className="text-xs text-white/80">
              Play. Code. Level up.
            </p>
          </div>
        </div>

        {/* MENU */}
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
  location.pathname === item.to ||
  (item.to === "/" && location.pathname === "/");

            return (
               <Link
  key={item.label}
  to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />

                <span className="font-medium">
                  {item.label}
                </span>

                {isActive && (
                  <ChevronRight className="h-4 w-4 ml-auto" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="flex-1 p-0 bg-[#dfeef7] overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
