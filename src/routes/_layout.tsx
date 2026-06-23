import { useEffect, useState } from "react";
import { UserCircle, Menu, X } from "lucide-react";
import { supabase } from "../supabaseClient";
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
  const [userEmail, setUserEmail] = useState<string>("");
const [userName, setUserName] = useState<string>("Guest User");
const [userAvatar, setUserAvatar] = useState<string>("🧑");
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

useEffect(() => {
const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setUserEmail("");
    setUserName("Guest User");
    setUserAvatar("🧑");
    return;
  }

  setUserEmail(user.email || "");

  setUserAvatar(
    localStorage.getItem("userAvatar") || "🧑"
  );

  setUserName(
    localStorage.getItem("userDisplayName") ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Guest User"
  );
};

const handleProfileUpdate = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setUserEmail("");
    setUserName("Guest User");
    setUserAvatar("🧑");
    return;
  }

  setUserEmail(user.email || "");
  setUserAvatar(localStorage.getItem("userAvatar") || "🧑");
  setUserName(
    localStorage.getItem("userDisplayName") ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Guest User"
  );
};

  getUser();

  const {
  data: { subscription },
} = supabase.auth.onAuthStateChange((_event, session) => {
  if (_event === "SIGNED_OUT" || !session?.user) {
    setUserEmail("");
    setUserName("Guest User");
    setUserAvatar("🧑");
    return;
  }

  setUserEmail(session.user.email || "");
  setUserAvatar(localStorage.getItem("userAvatar") || "🧑");
  setUserName(
    localStorage.getItem("userDisplayName") ||
    session.user.user_metadata?.name ||
    session.user.email?.split("@")[0] ||
    "Guest User"
  );
});

  window.addEventListener("storage", handleProfileUpdate);
window.addEventListener("focus", handleProfileUpdate);
window.addEventListener("userAvatarUpdated", handleProfileUpdate);
window.addEventListener("userProfileUpdated", handleProfileUpdate);

  return () => {
    subscription.unsubscribe();

    window.removeEventListener("storage", handleProfileUpdate);
window.removeEventListener("focus", handleProfileUpdate);
window.removeEventListener("userAvatarUpdated", handleProfileUpdate);
window.removeEventListener("userProfileUpdated", handleProfileUpdate);
  };
}, []);
  return (
    <div className="min-h-screen lg:h-screen bg-[#dfeef7] text-gray-900 lg:overflow-hidden flex flex-col lg:flex-row">
      {/* MOBILE TOP BAR */}
<div className="lg:hidden sticky top-0 z-40 h-16 bg-[#dfeef7]/95 backdrop-blur border-b border-white/40 px-4 flex items-center justify-between">
  <div className="flex items-center">
  <img
    src="/assets/logo.png"
    alt="Be Cre8v"
    className="h-10 w-auto object-contain"
  />
</div>

  <button
    onClick={() => setMobileMenuOpen(true)}
    className="h-10 w-10 rounded-xl bg-white shadow flex items-center justify-center"
  >
    <Menu className="h-5 w-5" />
  </button>
</div>
      {/* LEFT SIDEBAR */}
      <aside className="hidden lg:flex w-72 min-h-screen shrink-0 bg-gradient-to-b from-indigo-500 to-purple-600 border-r border-white/10 p-5 flex-col">

        {/* Logo */}
<div className="mb-8 flex flex-col items-start">
  <img
  src="/assets/logo.png"
  alt="BE CRE8V"
  className="h-9 w-auto object-contain mb-3 brightness-0 invert"
/>

  <div>
    <h1 className="text-base font-bold text-white">GameVerse</h1>
    <p className="text-xs text-white/80">
      Play. Learn. Earn Rewards.
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
        {/* USER PROFILE */}
<div className="mt-6 rounded-2xl bg-white/15 border border-white/20 p-4 flex items-center gap-3 text-white">
  <div className="h-11 w-11 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-2xl">
  {userAvatar}
</div>

  <div className="min-w-0">
    <p className="text-sm font-semibold truncate">
  {userName}
</p>
    <p className="text-xs text-white/70 truncate">
      {userEmail}
    </p>
  </div>
</div>
      </aside>

      {/* MOBILE DRAWER */}
{mobileMenuOpen && (
  <div className="fixed inset-0 z-50 lg:hidden">
    <div
      className="absolute inset-0 bg-black/50"
      onClick={() => setMobileMenuOpen(false)}
    />

    <aside className="absolute left-0 top-0 h-full w-[82%] max-w-[320px] bg-gradient-to-b from-indigo-500 to-purple-600 p-5 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col items-start">
  <img
  src="/assets/logo.png"
  alt="BE CRE8V"
  className="h-9 w-auto object-contain mb-3 brightness-0 invert"
/>

  <div>
    <h1 className="text-base font-bold text-white">GameVerse</h1>
    <p className="text-xs text-white/80">Play. Learn. Earn Rewards.</p>
  </div>
</div>

        <button onClick={() => setMobileMenuOpen(false)}>
          <X className="h-6 w-6 text-white" />
        </button>
      </div>

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
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-white/20 text-white"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
              {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
            </Link>
          );
        })}
      </nav>
    </aside>
  </div>
)}

      {/* RIGHT CONTENT */}
      <main className="w-full lg:flex-1 p-0 bg-[#dfeef7] overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
