// ============================================================
// CodeArena Dashboard — index.tsx replacement
// Drop into: src/routes/_layout/index.tsx
// ============================================================

import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../supabaseClient";
import { useWallet } from "../../context/WalletContext";
import {
  Play, Lock, Clock, Flame, Bell, Search, TrendingUp,
  Award, Target, ChevronRight, X,
  LogOut, LogIn, UserPlus, Trophy,
} from "lucide-react";

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
});

// ─── Types ───────────────────────────────────────────────────
type Difficulty = "Beginner" | "Intermediate" | "Advanced";
type Game = {
  title: string; icon: string; difficulty: Difficulty;
  progress: number; coins: number; time: string;
  locked?: boolean; accent: string; url: string;
};

// ─── Static Data ─────────────────────────────────────────────
const GAMES: Game[] = [
  { title: "Logic Maze",         icon: "🧩", difficulty: "Beginner",     progress: 72, coins: 120, time: "10 min", accent: "from-cyan-400/30 to-blue-500/20",     url: "/logic_maze.html"      },
  { title: "Brain Blast",        icon: "➗", difficulty: "Beginner",     progress: 50, coins: 140, time: "8 min",  accent: "from-yellow-400/30 to-orange-400/20",  url: "/brain_blast.html"     },
  { title: "Trivia",             icon: "🧪", difficulty: "Intermediate", progress: 28, coins: 220, time: "15 min", accent: "from-green-400/30 to-emerald-500/20",  url: "/trivia.html"          },
  { title: "Zip",                icon: "📚", difficulty: "Beginner",     progress: 90, coins: 130, time: "7 min",  accent: "from-pink-400/30 to-rose-500/20",     url: "/zip_master.html"      },
  { title: "Stop Motion Studio", icon: "🎨", difficulty: "Intermediate", progress: 35, coins: 180, time: "12 min", accent: "from-violet-400/30 to-purple-500/20", url: "/stop_motion.html"     },
  { title: "Piano",              icon: "🎹", difficulty: "Advanced",     progress: 10, coins: 300, time: "20 min", accent: "from-indigo-400/30 to-sky-500/20",    url: "/piano.html"           },
  { title: "Math Shop Game",     icon: "🛒", difficulty: "Intermediate", progress: 15, coins: 260, time: "18 min", accent: "from-blue-400/30 to-cyan-500/20",     url: "/math_shop_final.html" },
  { title: "Quantum Rush",       icon: "🚀", difficulty: "Advanced",     progress: 0,  coins: 400, time: "25 min", accent: "from-teal-400/30 to-green-500/20",    url: "", locked: true         },
];

const DIFF_STYLE: Record<Difficulty, string> = {
  Beginner:     "bg-green-100 text-green-700 border-green-200",
  Intermediate: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Advanced:     "bg-red-100 text-red-700 border-red-200",
};

const WEEK_DATA = [40, 65, 30, 80, 55, 90, 72];
const WEEK_DAYS = ["M","T","W","T","F","S","S"];
const MISSIONS  = [
  { label: "Play 3 games today",     progress: 66, reward: 80  },
  { label: "Reach a new high score", progress: 40, reward: 150 },
  { label: "Complete Zip level",     progress: 90, reward: 60  },
];
const ACHIEVEMENTS = [
  { icon: "🏅", label: "First Function", time: "2h ago"    },
  { icon: "🎯", label: "Perfect Run",    time: "Yesterday" },
  { icon: "🔥", label: "7-day Streak",   time: "Today"     },
];
const LEADERS = [
  { rank: 1, name: "Priya S.", coins: 2840, seed: "Priya" },
  { rank: 2, name: "Alex C.",  coins: 2310, seed: "Alex"  },
  { rank: 3, name: "Rohan M.", coins: 1990, seed: "Rohan" },
];

// ─── Dashboard ───────────────────────────────────────────────
function Dashboard() {
  const { coins }                     = useWallet();
  const [user, setUser]               = useState<any>(null);
  const [search, setSearch]           = useState("");
  const [showAuth, setShowAuth]       = useState(false);
  const [authMode, setAuthMode]       = useState<"login"|"signup">("login");
  const [notifOpen, setNotifOpen]     = useState(false);
  const [lmProgress, setLmProgress]   = useState(72);
  const streak                        = 7;
  const sessionTimerRef               = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── FIXED: single getUser call, no extra getSession ──
  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) setUser(data.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (_event === "SIGNED_OUT") {
        setUser(null);
        localStorage.removeItem("platformSessionId");
        localStorage.removeItem("sessionRewardGiven");
        return;
      }
      setUser(session?.user ?? null);
      if (_event === "SIGNED_IN" && session?.access_token) {
        startPlatformSession(session.access_token);
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
      if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
    };
  }, []);

  // ── LocalStorage sync for game stats ──
  useEffect(() => {
    const sync = () => {
      const p = Number(localStorage.getItem("logicMazeProgress"));
      if (p > 0) setLmProgress(p);
    };
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("focus",   sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("focus",   sync);
    };
  }, []);

  // ── Session helpers ──
  const startPlatformSession = useCallback(async (token: string) => {
    if (localStorage.getItem("platformSessionId")) return;
    try {
      const res  = await fetch("http://localhost:3000/session/start", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      const data = await res.json();
      localStorage.setItem("platformSessionId", data.session.id);
      localStorage.removeItem("sessionRewardGiven");

      // 2-min reward
      setTimeout(async () => {
        if (localStorage.getItem("sessionRewardGiven")) return;
        const s = await supabase.auth.getSession();
        const t = s.data.session?.access_token; if (!t) return;
        await fetch("http://localhost:3000/wallet/earn/event", {
          method: "POST",
          headers: { Authorization: `Bearer ${t}`, "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 10, description: "2-min session reward", game: "platform" }),
        });
        localStorage.setItem("sessionRewardGiven", "1");
      }, 2 * 60 * 1000);

      // Auto-end 30 min
      sessionTimerRef.current = setTimeout(async () => {
        const sid = localStorage.getItem("platformSessionId"); if (!sid) return;
        const s   = await supabase.auth.getSession(); const t = s.data.session?.access_token; if (!t) return;
        await fetch("http://localhost:3000/session/end", {
          method: "POST",
          headers: { Authorization: `Bearer ${t}`, "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sid }),
        });
        localStorage.removeItem("platformSessionId");
        localStorage.removeItem("sessionRewardGiven");
      }, 30 * 60 * 1000);
    } catch (e) { console.warn("Session start failed:", e); }
  }, []);

  const handleLogout = useCallback(async () => {
    const sid = localStorage.getItem("platformSessionId");
    if (sid) {
      const s = await supabase.auth.getSession(); const t = s.data.session?.access_token;
      if (t) await fetch("http://localhost:3000/session/end", {
        method: "POST",
        headers: { Authorization: `Bearer ${t}`, "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sid }),
      }).catch(() => {});
      localStorage.removeItem("platformSessionId");
    }
    await supabase.auth.signOut();
  }, []);

  const openGame = useCallback((url: string) => {
    if (url) window.open(url, "_blank");
  }, []);

  // ── Derived ──
  const filteredGames = GAMES
    .map(g => g.title === "Logic Maze" ? { ...g, progress: lmProgress } : g)
    .filter(g => g.title.toLowerCase().includes(search.toLowerCase()));

  const totalPlayed = GAMES.filter(g => g.progress > 0 && !g.locked).length;
  const avgProgress = Math.round(
    GAMES.filter(g => !g.locked).reduce((a, g) => a + g.progress, 0) /
    GAMES.filter(g => !g.locked).length
  );
  const userName = user?.user_metadata?.name || user?.email?.split("@")[0] || "Player";

  return (
    <div className="min-h-screen bg-[#dfeef7] text-gray-900">

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-gray-200/80 px-5 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 shrink-0">
          <h2 className="text-lg font-bold text-gray-800">Dashboard</h2>
          <span className="text-[11px] bg-indigo-100 text-indigo-600 font-semibold px-2 py-0.5 rounded-full">Beta</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search games…"
              autoComplete="off"
              className="h-9 w-48 rounded-xl border border-gray-200 bg-white pl-8 pr-3 text-sm outline-none focus:border-indigo-400 transition"
            />
          </div>

          {/* Wallet */}
          <div className="flex items-center gap-1.5 h-9 px-3 rounded-xl bg-amber-50 border border-amber-200 shrink-0">
            <span>🪙</span>
            <span className="font-bold text-amber-700 text-sm">{coins.toLocaleString()}</span>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1.5 h-9 px-3 rounded-xl bg-orange-50 border border-orange-200 shrink-0">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="font-bold text-orange-600 text-sm">{streak}</span>
          </div>

          {/* Notifications */}
          <div className="relative shrink-0">
            <button
              onClick={() => setNotifOpen(p => !p)}
              className="relative h-9 w-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:border-indigo-300 transition"
            >
              <Bell className="h-4 w-4 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-11 w-68 bg-white rounded-2xl border border-gray-200 shadow-xl p-4 z-50"
                >
                  <p className="font-semibold text-sm mb-2">Notifications</p>
                  {[
                    { icon: "🏆", msg: "Unlocked 'Perfect Run' achievement!" },
                    { icon: "🪙", msg: "Earned 80 coins from Logic Maze." },
                    { icon: "🔥", msg: "7-day streak! Keep it going!" },
                  ].map((n, i) => (
                    <div key={i} className="flex items-start gap-2 py-2 border-t border-gray-100 first:border-0">
                      <span className="text-base mt-0.5">{n.icon}</span>
                      <p className="text-xs text-gray-600">{n.msg}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Auth button */}
          {user
            ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 h-9 px-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium hover:bg-red-100 transition shrink-0"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            ) : (
              <button
                onClick={() => { setAuthMode("login"); setShowAuth(true); }}
                className="flex items-center gap-1.5 h-9 px-3 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition shrink-0"
              >
                <LogIn className="h-4 w-4" /> Login
              </button>
            )
          }
        </div>
      </header>

      {/* ── Main Body ── */}
      <div className="p-5 max-w-7xl mx-auto">

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-7 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 p-6 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white, transparent 60%)" }} />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-indigo-100 text-sm font-medium mb-1">Welcome back 👋</p>
              <h1 className="text-2xl sm:text-3xl font-bold">{userName}</h1>
              <p className="text-indigo-100 text-sm mt-1">
                You're on a <span className="font-bold text-yellow-300">{streak}-day streak</span> — keep playing!
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              {[
                { label: "Coins",  value: coins.toLocaleString(), icon: "🪙" },
                { label: "Games",  value: totalPlayed,            icon: "🎮" },
                { label: "Avg %",  value: `${avgProgress}%`,      icon: "📈" },
              ].map(s => (
                <div key={s.label} className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-center min-w-[80px]">
                  <div className="text-xl">{s.icon}</div>
                  <div className="text-lg font-bold">{s.value}</div>
                  <div className="text-[11px] text-indigo-100">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">

          {/* Left — Games */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Featured Games</h2>
              <a href="/categories" className="text-sm text-indigo-600 font-medium flex items-center gap-1 hover:underline">
                View all <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            {/* Mobile search */}
            <div className="relative sm:hidden mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search games…"
                autoComplete="off"
                className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredGames.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-400">No games found 🔍</div>
              )}
              {filteredGames.map((game, i) => (
                <GameCard key={game.title} game={game} index={i} onPlay={openGame} />
              ))}
            </div>
          </div>

          {/* Right — Sidebar */}
          <aside className="space-y-5">

            {/* Daily Missions */}
            <SideCard title="Daily Missions" icon={<Target className="h-4 w-4 text-indigo-500" />} badge="3 / 5">
              <ul className="space-y-3">
                {MISSIONS.map((m, i) => (
                  <li key={m.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-700">{m.label}</span>
                      <span className="text-gray-400">+{m.reward} 🪙</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${m.progress}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </SideCard>

            {/* Weekly Progress */}
            <SideCard title="Weekly Progress" icon={<TrendingUp className="h-4 w-4 text-indigo-500" />} badge="+18%">
              <div className="flex items-end justify-between gap-1.5 h-20">
                {WEEK_DATA.map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${v}%` }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.05, ease: "easeOut" }}
                    className="flex-1 rounded-md bg-gradient-to-t from-indigo-400/60 to-purple-400/80"
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-gray-400">
                {WEEK_DAYS.map((d, i) => <span key={i}>{d}</span>)}
              </div>
            </SideCard>

            {/* Achievements */}
            <SideCard title="Recent Achievements" icon={<Award className="h-4 w-4 text-indigo-500" />}>
              <ul className="space-y-2">
                {ACHIEVEMENTS.map(a => (
                  <li key={a.label} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="h-8 w-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-base shadow-sm">{a.icon}</div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{a.label}</p>
                      <p className="text-[11px] text-gray-400">{a.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </SideCard>

            {/* Leaderboard teaser */}
            <SideCard title="Leaderboard" icon={<Trophy className="h-4 w-4 text-indigo-500" />}>
              {LEADERS.map(p => (
                <div key={p.rank} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                  <span className="text-base">{p.rank === 1 ? "🥇" : p.rank === 2 ? "🥈" : "🥉"}</span>
                  <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${p.seed}`} className="h-7 w-7 rounded-full border border-gray-200" alt="" />
                  <span className="flex-1 text-sm font-medium text-gray-700">{p.name}</span>
                  <span className="text-xs text-amber-600 font-bold">🪙 {p.coins.toLocaleString()}</span>
                </div>
              ))}
              <a href="/leaderboard" className="mt-2 flex items-center justify-center gap-1 text-xs text-indigo-600 font-medium hover:underline">
                Full leaderboard <ChevronRight className="h-3 w-3" />
              </a>
            </SideCard>

          </aside>
        </div>
      </div>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuth && (
          <AuthModal
            mode={authMode}
            onToggleMode={() => setAuthMode(m => m === "login" ? "signup" : "login")}
            onClose={() => setShowAuth(false)}
            setUser={setUser}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Game Card ───────────────────────────────────────────────
function GameCard({ game, index, onPlay }: { game: Game; index: number; onPlay: (url: string) => void }) {
  const locked = !!game.locked;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={!locked ? { y: -3 } : {}}
      className={`rounded-2xl border border-gray-200/80 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${locked ? "opacity-70" : "cursor-pointer"}`}
      onClick={() => !locked && onPlay(game.url)}
    >
      {/* Thumbnail */}
      <div className={`h-28 relative bg-gradient-to-br ${game.accent} flex items-center justify-center`}>
        <span className="text-5xl select-none">{game.icon}</span>
        <span className={`absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-md border font-semibold ${DIFF_STYLE[game.difficulty]}`}>
          {game.difficulty}
        </span>
        {locked && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-600">
            <Lock className="h-4 w-4" /> Locked
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 truncate text-sm">{game.title}</h3>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex justify-between text-[11px] text-gray-500 mb-1">
            <span>Progress</span><span>{game.progress}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${game.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${game.progress >= 100 ? "bg-green-400" : "bg-gradient-to-r from-indigo-400 to-purple-400"}`}
            />
          </div>
        </div>

        {/* Meta */}
        <div className="flex justify-between text-xs text-gray-500 mt-3">
          <span>🪙 {game.coins}</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{game.time}</span>
        </div>

        {/* Play button — onClick handled on article, this is visual only */}
        <div
          className={`mt-3 w-full h-9 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition select-none ${
            locked
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-yellow-400 text-gray-900 hover:bg-yellow-500 cursor-pointer"
          }`}
          onClick={e => { e.stopPropagation(); if (!locked) onPlay(game.url); }}
        >
          {locked ? "Locked" : <><Play className="h-3.5 w-3.5 fill-current" /> Play Now</>}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Side Card ───────────────────────────────────────────────
function SideCard({ title, icon, badge, children }: { title: string; icon: React.ReactNode; badge?: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl bg-white border border-gray-200/80 shadow-sm p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm text-gray-800 flex items-center gap-2">{icon}{title}</h3>
        {badge && <span className="text-[11px] text-indigo-500 font-medium">{badge}</span>}
      </div>
      {children}
    </motion.div>
  );
}

// ─── Auth Modal — NO <form> tag, no browser autofill interference ──
function AuthModal({ mode, onToggleMode, onClose, setUser }: {
  mode: "login" | "signup";
  onToggleMode: () => void;
  onClose: () => void;
  setUser: (u: any) => void;
}) {
  const isSignup = mode === "signup";
  const [loading, setLoading]     = useState(false);
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError]         = useState("");

  // Reset fields on mode switch
  useEffect(() => { setError(""); setName(""); setEmail(""); setPassword(""); setConfirmPw(""); }, [mode]);

  const handleSubmit = useCallback(async () => {
    if (loading) return;
    setError("");
    setLoading(true);
    try {
      if (isSignup) {
        if (password !== confirmPw) { setError("Passwords don't match"); return; }
        const { error: e } = await supabase.auth.signUp({
          email, password, options: { data: { name } },
        });
        if (e) setError(e.message);
        else { alert("Signup successful! Check your email."); onClose(); }
      } else {
        const { data, error: e } = await supabase.auth.signInWithPassword({ email, password });
        if (e) setError(e.message);
        else { setUser(data.user); onClose(); }
      }
    } finally {
      setLoading(false);
    }
  }, [loading, isSignup, email, password, confirmPw, name, onClose, setUser]);

  // Allow Enter key submit
  const onKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  }, [handleSubmit]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.92, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 16 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>

        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-900">{isSignup ? "Create Account" : "Welcome Back"}</h2>
          <p className="text-sm text-gray-500 mt-1">{isSignup ? "Join CodeArena and start learning" : "Login to continue your journey"}</p>
        </div>

        {/* ⚠️ NO <form> tag — prevents browser freeze & DOM warning */}
        <div className="space-y-3" onKeyDown={onKey}>
          {isSignup && (
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              className="w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-indigo-400 transition"
            />
          )}
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
            type="email"
            autoComplete="email"
            className="w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-indigo-400 transition"
          />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            className="w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-indigo-400 transition"
          />
          {isSignup && (
            <input
              value={confirmPw}
              onChange={e => setConfirmPw(e.target.value)}
              placeholder="Confirm password"
              type="password"
              autoComplete="new-password"
              className="w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-indigo-400 transition"
            />
          )}

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-11 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 disabled:opacity-60 transition flex items-center justify-center gap-2"
          >
            {loading
              ? "Processing…"
              : isSignup
                ? <><UserPlus className="h-4 w-4" /> Register</>
                : <><LogIn className="h-4 w-4" /> Login</>
            }
          </button>

          <p className="text-center text-xs text-gray-500 pt-1">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <button onClick={onToggleMode} className="text-indigo-600 font-medium hover:underline">
              {isSignup ? "Login" : "Sign up"}
            </button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
