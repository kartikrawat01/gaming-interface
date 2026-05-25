import {
  Outlet,
  createFileRoute,
  Link,
  useLocation,
} from "@tanstack/react-router";
import {
  LayoutDashboard,
  Gamepad2,
  TrendingUp,
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
  { label: "Progress", icon: TrendingUp, to: "/progress" },
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

        {/* PROFILE CARD (Alex Chen) */}
        <div className="mt-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 text-white shadow-lg">

          {/* Top */}
          <div className="flex items-center gap-3">
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Alex"
              alt="avatar"
              className="h-10 w-10 rounded-full border-2 border-white"
            />

            <div>
              <div className="text-sm font-semibold">
                Alex Chen
              </div>

              <div className="text-xs bg-yellow-300 text-black px-2 py-0.5 rounded-full inline-block mt-1 font-medium">
                Level 12
              </div>
            </div>
          </div>

          {/* Button */}
          <button className="mt-4 w-full bg-yellow-300 text-black text-sm font-semibold py-2 rounded-lg hover:scale-105 transition duration-200">
            Upgrade to Pro
          </button>
        </div>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="flex-1 p-0 bg-[#dfeef7] overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
