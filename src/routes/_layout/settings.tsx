import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../supabaseClient";
import { useWallet } from "../../context/WalletContext";
import {
  User,
  Gamepad2,
  Bell,
  Wallet,
  LogOut,
  ChevronRight,
  Check,
  Save,
  Eye,
  EyeOff,
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/_layout/settings")({
  component: SettingsPage,
});

// ─── Types ────────────────────────────────────────────────────────────────────

type Section = "profile" | "game" | "notifications" | "wallet" | "account";

type Difficulty = "Beginner" | "Intermediate" | "Advanced";

interface UserProfile {
  displayName: string;
  email: string;
  avatar: string;
}

interface GamePrefs {
  defaultDifficulty: Difficulty;
  soundEffects: boolean;
  autoSaveProgress: boolean;
}

interface NotifPrefs {
  achievementNotifs: boolean;
  streakReminder: boolean;
}

interface Transaction {
  id: string;
  type: "EARN" | "SPEND" | "EXPIRE" | "ADJUST" | "REFUND" | "BONUS";
  amount: number;
  description: string;
  balanceAfter: number;
  createdAt: string;
  source: string;
}

// ─── Avatar Options ───────────────────────────────────────────────────────────

const AVATARS = [
  "🧑", "👦", "👧", "🧒", "👨", "👩", "🧔", "👱",
  "🎮", "🚀", "🦊", "🐼", "🦁", "🐯", "🐸",
  "🤖", "👾", "🧙", "🦸", "🐉",
];

const WALLET_API = "https://wallet-api-backend-production.up.railway.app";

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-white text-sm font-medium ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {type === "success" ? (
        <Check className="h-4 w-4 shrink-0" />
      ) : (
        <AlertCircle className="h-4 w-4 shrink-0" />
      )}
      {message}
    </motion.div>
  );
}

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
        checked ? "bg-indigo-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// ─── Section Nav Items ────────────────────────────────────────────────────────

const sections: {
  key: Section;
  label: string;
  icon: React.ElementType;
  color: string;
}[] = [
  { key: "profile",       label: "Profile",           icon: User,     color: "text-indigo-500" },
  { key: "game",          label: "Game Preferences",  icon: Gamepad2, color: "text-purple-500" },
  { key: "notifications", label: "Notifications",     icon: Bell,     color: "text-amber-500"  },
  { key: "wallet",        label: "Wallet & Rewards",  icon: Wallet,   color: "text-emerald-500"},
  { key: "account",       label: "Account",           icon: LogOut,   color: "text-red-500"    },
];

// ─── Main Component ───────────────────────────────────────────────────────────

function SettingsPage() {
  const navigate = useNavigate();
  const { coins, setCoins, connectWalletSocket } = useWallet();

  const [activeSection, setActiveSection] = useState<Section>("profile");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // ── Profile State ──────────────────────────────────────────────────────────
  const [profile, setProfile] = useState<UserProfile>({
    displayName: "",
    email: "",
    avatar: "🧑",
  });
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  // ── Password State ─────────────────────────────────────────────────────────
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // ── Game Prefs ─────────────────────────────────────────────────────────────
  const [gamePrefs, setGamePrefs] = useState<GamePrefs>(() => {
    try {
      const saved = localStorage.getItem("gamePrefs");
      return saved
        ? JSON.parse(saved)
        : { defaultDifficulty: "Beginner", soundEffects: true, autoSaveProgress: true };
    } catch {
      return { defaultDifficulty: "Beginner", soundEffects: true, autoSaveProgress: true };
    }
  });

  // ── Notif Prefs ────────────────────────────────────────────────────────────
  const [notifPrefs, setNotifPrefs] = useState<NotifPrefs>(() => {
    try {
      const saved = localStorage.getItem("notifPrefs");
      return saved
        ? JSON.parse(saved)
        : { achievementNotifs: true, streakReminder: true };
    } catch {
      return { achievementNotifs: true, streakReminder: true };
    }
  });

  // ── Wallet Transactions ────────────────────────────────────────────────────
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [txLoading, setTxLoading] = useState(false);
  const [txError, setTxError] = useState("");

  // ── Load user on mount ─────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      if (!user) return;
      connectWalletSocket(user.id);
fetchWalletBalance();
      const savedAvatar = localStorage.getItem("userAvatar") || "🧑";
      setProfile({
        displayName:
          user.user_metadata?.name ||
          user.email?.split("@")[0] ||
          "Player",
        email: user.email || "",
        avatar: savedAvatar,
      });
    });
  }, []);

  // ── Fetch transactions when wallet tab opens ───────────────────────────────
useEffect(() => {
  if (activeSection === "wallet") {
    fetchWalletBalance();
    fetchTransactions();
  }
}, [activeSection]);

  const fetchWalletBalance = async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) return;

    const res = await fetch(`${WALLET_API}/wallet/balance`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!res.ok) return;

    const data = await res.json();

    setCoins(Number(data.balance) || 0);
  } catch (err) {
    console.error("Wallet balance fetch failed:", err);
  }
};

  const fetchTransactions = async () => {
    setTxLoading(true);
    setTxError("");
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.access_token) {
        setTxError("Please login to view transactions");
        return;
      }
      const res = await fetch(`${WALLET_API}/wallet/transactions`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setTransactions(data);
    } catch {
      setTxError("Could not load transactions. Please try again.");
    } finally {
      setTxLoading(false);
    }
  };

  const showToast = (message: string, type: "success" | "error") =>
    setToast({ message, type });

  // ── Save Profile ───────────────────────────────────────────────────────────
  const handleSaveProfile = async () => {
    if (!profile.displayName.trim()) {
      showToast("Display name cannot be empty", "error");
      return;
    }
    setSavingProfile(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { name: profile.displayName.trim() },
      });
      if (error) throw error;
      localStorage.setItem("userAvatar", profile.avatar);
      localStorage.setItem("userDisplayName", profile.displayName.trim());
window.dispatchEvent(new Event("userProfileUpdated"));
      window.dispatchEvent(new Event("userAvatarUpdated"));
      showToast("Profile updated successfully!", "success");
    } catch (err: any) {
      showToast(err.message || "Failed to update profile", "error");
    } finally {
      setSavingProfile(false);
    }
  };

  // ── Change Password ────────────────────────────────────────────────────────
  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      showToast("Please fill both password fields", "error");
      return;
    }
    if (newPassword.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    setSavingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setNewPassword("");
      setConfirmPassword("");
      showToast("Password changed successfully!", "success");
    } catch (err: any) {
      showToast(err.message || "Failed to change password", "error");
    } finally {
      setSavingPassword(false);
    }
  };

  // ── Save Game Prefs ────────────────────────────────────────────────────────
  const handleSaveGamePrefs = () => {
    localStorage.setItem("gamePrefs", JSON.stringify(gamePrefs));
    showToast("Game preferences saved!", "success");
  };

  // ── Save Notif Prefs ───────────────────────────────────────────────────────
  const handleSaveNotifPrefs = () => {
    localStorage.setItem("notifPrefs", JSON.stringify(notifPrefs));
    showToast("Notification settings saved!", "success");
  };

  // ── Sign Out ───────────────────────────────────────────────────────────────
  const handleSignOut = async () => {
    // End play session if active
    const sessionId = localStorage.getItem("platformSessionId");
    if (sessionId) {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.access_token) {
        navigator.sendBeacon(
          `${WALLET_API}/session/end`,
          JSON.stringify({ sessionId })
        );
      }
      localStorage.removeItem("platformSessionId");
      localStorage.removeItem("sessionRewardGiven");
    }
    localStorage.removeItem("walletCoins");
localStorage.removeItem("userDisplayName");
localStorage.removeItem("userAvatar");

window.dispatchEvent(new Event("userProfileUpdated"));
    await supabase.auth.signOut({ scope: "local" });
    navigate({ to: "/" });
  };

  // ── Transaction type styling ───────────────────────────────────────────────
  const txTypeStyle = (type: string) => {
    switch (type) {
      case "EARN":
      case "BONUS":
      case "REFUND":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          icon: <ArrowDownLeft className="h-3.5 w-3.5" />,
        };
      case "SPEND":
      case "EXPIRE":
        return {
          bg: "bg-red-100",
          text: "text-red-600",
          icon: <ArrowUpRight className="h-3.5 w-3.5" />,
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          icon: <Coins className="h-3.5 w-3.5" />,
        };
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#dfeef7] p-4 lg:p-8">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your profile, preferences & account
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto">
        {/* ── Left Nav ── */}
        <aside className="lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {sections.map((s, i) => {
              const Icon = s.icon;
              const isActive = activeSection === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => setActiveSection(s.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all ${
                    i < sections.length - 1 ? "border-b border-gray-100" : ""
                  } ${isActive ? "bg-indigo-50" : "hover:bg-gray-50"}`}
                >
                  <span
                    className={`h-8 w-8 rounded-xl flex items-center justify-center ${
                      isActive ? "bg-indigo-100" : "bg-gray-100"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        isActive ? s.color : "text-gray-500"
                      }`}
                    />
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      isActive ? "text-indigo-700" : "text-gray-700"
                    }`}
                  >
                    {s.label}
                  </span>
                  {isActive && (
                    <ChevronRight className="h-4 w-4 text-indigo-400 ml-auto" />
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* ── Right Content ── */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
            >
              {/* ════════ PROFILE ════════ */}
              {activeSection === "profile" && (
                <div className="space-y-4">
                  {/* Avatar + Name Card */}
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <User className="h-4 w-4 text-indigo-500" />
                      Profile Info
                    </h2>

                    {/* Avatar Row */}
                    <div className="flex items-center gap-4 mb-5">
                      <button
                        onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                        className="relative h-16 w-16 rounded-2xl bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-3xl hover:border-indigo-400 transition-all"
                        title="Change avatar"
                      >
                        {profile.avatar}
                        <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center">
                          <Sparkles className="h-3 w-3 text-white" />
                        </span>
                      </button>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {profile.displayName}
                        </p>
                        <p className="text-xs text-gray-500">{profile.email}</p>
                        <button
                          onClick={() =>
                            setShowAvatarPicker(!showAvatarPicker)
                          }
                          className="text-xs text-indigo-500 mt-1 hover:underline"
                        >
                          {showAvatarPicker
                            ? "Close picker"
                            : "Change avatar"}
                        </button>
                      </div>
                    </div>

                    {/* Avatar Picker */}
                    <AnimatePresence>
                      {showAvatarPicker && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mb-4"
                        >
                          <div className="flex flex-wrap gap-2 p-3 bg-indigo-50 rounded-xl">
                            {AVATARS.map((a) => (
                              <button
                                key={a}
                                onClick={() => {
                                  setProfile((p) => ({ ...p, avatar: a }));
                                  setShowAvatarPicker(false);
                                }}
                                className={`h-10 w-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                                  profile.avatar === a
                                    ? "bg-indigo-500 scale-110 shadow"
                                    : "bg-white hover:bg-indigo-100"
                                }`}
                              >
                                {a}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Display Name */}
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={profile.displayName}
                        onChange={(e) =>
                          setProfile((p) => ({
                            ...p,
                            displayName: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                        placeholder="Enter your display name"
                      />
                    </div>

                    {/* Email (read-only) */}
                    <div className="mb-5">
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        readOnly
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-100 text-sm text-gray-500 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Email cannot be changed here
                      </p>
                    </div>

                    <button
                      onClick={handleSaveProfile}
                      disabled={savingProfile}
                      className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 text-white rounded-xl text-sm font-semibold hover:bg-indigo-600 transition disabled:opacity-60"
                    >
                      <Save className="h-4 w-4" />
                      {savingProfile ? "Saving..." : "Save Profile"}
                    </button>
                  </div>

                  {/* Change Password Card */}
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-base font-semibold text-gray-800 mb-4">
                      Change Password
                    </h2>

                    <div className="mb-3">
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPw ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                          placeholder="Min. 6 characters"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPw(!showNewPw)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPw ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mb-5">
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPw ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                          placeholder="Re-enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPw(!showConfirmPw)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPw ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleChangePassword}
                      disabled={savingPassword}
                      className="flex items-center gap-2 px-5 py-2.5 bg-purple-500 text-white rounded-xl text-sm font-semibold hover:bg-purple-600 transition disabled:opacity-60"
                    >
                      <Save className="h-4 w-4" />
                      {savingPassword ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </div>
              )}

              {/* ════════ GAME PREFS ════════ */}
              {activeSection === "game" && (
                <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
                  <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                    <Gamepad2 className="h-4 w-4 text-purple-500" />
                    Game Preferences
                  </h2>

                  {/* Sound Effects */}
                  <div className="flex items-center justify-between py-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Sound Effects
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Play sounds during games
                      </p>
                    </div>
                    <Toggle
                      checked={gamePrefs.soundEffects}
                      onChange={(v) =>
                        setGamePrefs((p) => ({ ...p, soundEffects: v }))
                      }
                    />
                  </div>

                  {/* Auto Save */}
                  <div className="flex items-center justify-between py-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Auto-save Progress
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Automatically save your game progress
                      </p>
                    </div>
                    <Toggle
                      checked={gamePrefs.autoSaveProgress}
                      onChange={(v) =>
                        setGamePrefs((p) => ({ ...p, autoSaveProgress: v }))
                      }
                    />
                  </div>

                  <button
                    onClick={handleSaveGamePrefs}
                    className="flex items-center gap-2 px-5 py-2.5 bg-purple-500 text-white rounded-xl text-sm font-semibold hover:bg-purple-600 transition"
                  >
                    <Save className="h-4 w-4" />
                    Save Preferences
                  </button>
                </div>
              )}

              {/* ════════ NOTIFICATIONS ════════ */}
              {activeSection === "notifications" && (
                <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
                  <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                    <Bell className="h-4 w-4 text-amber-500" />
                    Notifications
                  </h2>

                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Achievement Notifications
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Get notified when you earn a badge or achievement
                      </p>
                    </div>
                    <Toggle
                      checked={notifPrefs.achievementNotifs}
                      onChange={(v) =>
                        setNotifPrefs((p) => ({ ...p, achievementNotifs: v }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Streak Reminder
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Remind me to maintain my daily streak
                      </p>
                    </div>
                    <Toggle
                      checked={notifPrefs.streakReminder}
                      onChange={(v) =>
                        setNotifPrefs((p) => ({ ...p, streakReminder: v }))
                      }
                    />
                  </div>

                  <button
                    onClick={handleSaveNotifPrefs}
                    className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white rounded-xl text-sm font-semibold hover:bg-amber-600 transition"
                  >
                    <Save className="h-4 w-4" />
                    Save Notifications
                  </button>
                </div>
              )}

              {/* ════════ WALLET ════════ */}
              {activeSection === "wallet" && (
                <div className="space-y-4">
                  {/* Balance Card */}
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg">
                    <p className="text-sm text-white/70 font-medium mb-1">
                      Current Balance
                    </p>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-bold">
                        {coins.toLocaleString()}
                      </span>
                      <span className="text-lg text-white/80 mb-1">coins</span>
                    </div>
                    <p className="text-xs text-white/60 mt-2">
                      Earn coins by playing games & completing challenges
                    </p>
                  </div>

                  {/* Transactions */}
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-emerald-500" />
                        Transaction History
                      </h2>
                      <button
                        onClick={fetchTransactions}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-500"
                        title="Refresh"
                      >
                        <RefreshCw
                          className={`h-4 w-4 ${
                            txLoading ? "animate-spin" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {txLoading ? (
                      <div className="flex flex-col gap-3">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="h-14 rounded-xl bg-gray-100 animate-pulse"
                          />
                        ))}
                      </div>
                    ) : txError ? (
                      <div className="text-center py-8">
                        <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">{txError}</p>
                        <button
                          onClick={fetchTransactions}
                          className="mt-3 text-sm text-indigo-500 hover:underline"
                        >
                          Try again
                        </button>
                      </div>
                    ) : transactions.length === 0 ? (
                      <div className="text-center py-10">
                        <Coins className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-gray-500">
                          No transactions yet
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Play games to start earning coins!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                        {transactions.map((tx) => {
                          const style = txTypeStyle(tx.type);
                          const isEarn = ["EARN", "BONUS", "REFUND"].includes(
                            tx.type
                          );
                          return (
                            <motion.div
                              key={tx.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition"
                            >
                              <span
                                className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${style.bg} ${style.text}`}
                              >
                                {style.icon}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">
                                  {tx.description}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {formatDate(tx.createdAt)}
                                </p>
                              </div>
                              <div className="text-right shrink-0">
                                <p
                                  className={`text-sm font-bold ${
                                    isEarn ? "text-green-600" : "text-red-500"
                                  }`}
                                >
                                  {isEarn ? "+" : "-"}
                                  {tx.amount}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {tx.balanceAfter} bal
                                </p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ════════ ACCOUNT ════════ */}
              {activeSection === "account" && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-base font-semibold text-gray-800 mb-1">
                      Account
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                      Manage your account access
                    </p>

                    <div className="p-4 rounded-xl border border-red-100 bg-red-50">
                      <p className="text-sm font-semibold text-red-700 mb-1">
                        Sign Out
                      </p>
                      <p className="text-xs text-red-500 mb-3">
                        You will be signed out of your account. Your progress
                        and coins are safely saved.
                      </p>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}