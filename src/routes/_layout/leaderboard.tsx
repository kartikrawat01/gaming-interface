
import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../supabaseClient";
import { useWallet } from "../../context/WalletContext";
import {
  LayoutDashboard,
  Gamepad2,
  TrendingUp,
  Trophy,
  Award,
  Settings,
  Play,
  Lock,
  Clock,
  Zap,
  Code2,
  Menu,
  X,
  ChevronRight,
  Target,
  Sparkles,
} from "lucide-react";
export const Route = createFileRoute("/_layout/leaderboard")({
  component: EduPlayLeaderboard,
});

// ============================================================
// TYPES
// ============================================================
type Division = "Legend" | "Mastermind" | "Challenger" | "Explorer" | "Rookie";
type Tab = "Global" | "Weekly" | "Friends";
type DivisionFilter = "All Divisions" | Division;

interface Player {
  rank: number;
  name: string;
  totalCoinsEarned: number;
  totalHoursPlayed: number;
  coinsPerHour: number;
  avatar: string;
  isCurrentUser?: boolean;
  division: Division;
}

interface CategoryLeaderboard {
  name: string;
  icon: string;
  color: string;
  gradient: string;
  players: { rank: number; name: string; xp: number }[];
}

// ============================================================
// DATA
// ============================================================
const getDivision = (coinsPerHour: number): Division => {
  if (coinsPerHour >= 80) return "Legend";
  if (coinsPerHour >= 50) return "Mastermind";
  if (coinsPerHour >= 25) return "Challenger";
  if (coinsPerHour >= 10) return "Explorer";
  return "Rookie";
};

// const PLAYERS: Player[] = [
//   { rank: 1, name: "Alex", xp: 12540, levels: 245, streak: 32, avatar: "👦", division: "Legend" },
//   { rank: 2, name: "MJ", xp: 12120, levels: 238, streak: 30, avatar: "👧", division: "Legend" },
//   { rank: 3, name: "Sam", xp: 12010, levels: 230, streak: 29, avatar: "🧒", division: "Legend" },
//   { rank: 4, name: "John", xp: 9850, levels: 190, streak: 18, avatar: "👦", division: "Mastermind" },
//   { rank: 5, name: "Emma", xp: 9540, levels: 185, streak: 16, avatar: "👧", division: "Mastermind" },
//   { rank: 6, name: "Noah", xp: 8760, levels: 175, streak: 14, avatar: "🧑", division: "Challenger" },
//   { rank: 7, name: "Sophia", xp: 7890, levels: 160, streak: 12, avatar: "👧", division: "Challenger" },
//   { rank: 8, name: "Liam", xp: 6980, levels: 150, streak: 10, avatar: "👦", division: "Challenger" },
//   { rank: 9, name: "Olivia", xp: 5420, levels: 120, streak: 7, avatar: "👧", division: "Explorer" },
//   { rank: 10, name: "Ava", xp: 4980, levels: 110, streak: 6, avatar: "🧒", division: "Explorer" },
//   { rank: 11, name: "Lucas", xp: 2450, levels: 80, streak: 4, avatar: "👦", division: "Rookie" },
//   { rank: 12, name: "You", xp: 6250, levels: 125, streak: 15, avatar: "🧑", division: "Challenger", isCurrentUser: true },
// ];

// const WEEKLY_PLAYERS: Player[] = [
//   { rank: 1, name: "Emma", xp: 3200, levels: 64, streak: 7, avatar: "👧", division: "Legend" },
//   { rank: 2, name: "Alex", xp: 2980, levels: 59, streak: 5, avatar: "👦", division: "Legend" },
//   { rank: 3, name: "Noah", xp: 2750, levels: 55, streak: 7, avatar: "🧑", division: "Mastermind" },
//   { rank: 4, name: "Sophia", xp: 2400, levels: 48, streak: 4, avatar: "👧", division: "Mastermind" },
//   { rank: 5, name: "Liam", xp: 2100, levels: 42, streak: 3, avatar: "👦", division: "Challenger" },
//   { rank: 6, name: "Olivia", xp: 1890, levels: 37, streak: 2, avatar: "👧", division: "Challenger" },
//   { rank: 7, name: "You", xp: 1650, levels: 33, streak: 5, avatar: "🧑", division: "Challenger", isCurrentUser: true },
// ];

// const FRIENDS_PLAYERS: Player[] = [
//   { rank: 1, name: "Sam", xp: 12010, levels: 230, streak: 29, avatar: "🧒", division: "Legend" },
//   { rank: 2, name: "Liam", xp: 6980, levels: 150, streak: 10, avatar: "👦", division: "Challenger" },
//   { rank: 3, name: "You", xp: 6250, levels: 125, streak: 15, avatar: "🧑", division: "Challenger", isCurrentUser: true },
//   { rank: 4, name: "Ava", xp: 4980, levels: 110, streak: 6, avatar: "🧒", division: "Explorer" },
//   { rank: 5, name: "Lucas", xp: 2450, levels: 80, streak: 4, avatar: "👦", division: "Rookie" },
// ];

const CATEGORIES: CategoryLeaderboard[] = [
  {
    name: "Math Champion", icon: "🔢", color: "#3b82f6",
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)",
    players: [{ rank: 1, name: "Alex", xp: 8450 }, { rank: 2, name: "MJ", xp: 7890 }, { rank: 3, name: "Sam", xp: 7200 }],
  },
  {
    name: "Science Master", icon: "🧪", color: "#22c55e",
    gradient: "linear-gradient(135deg, #14532d 0%, #166534 100%)",
    players: [{ rank: 1, name: "John", xp: 7650 }, { rank: 2, name: "Emma", xp: 7100 }, { rank: 3, name: "Noah", xp: 6540 }],
  },
  {
    name: "Puzzle King", icon: "🧩", color: "#f97316",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #9a3412 100%)",
    players: [{ rank: 1, name: "Sophia", xp: 8120 }, { rank: 2, name: "Liam", xp: 7430 }, { rank: 3, name: "Olivia", xp: 6980 }],
  },
  {
    name: "Language Wizard", icon: "📖", color: "#ef4444",
    gradient: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)",
    players: [{ rank: 1, name: "Ava", xp: 7890 }, { rank: 2, name: "Alex", xp: 7120 }, { rank: 3, name: "Emma", xp: 6540 }],
  },
  {
    name: "Memory Beast", icon: "🧠", color: "#ec4899",
    gradient: "linear-gradient(135deg, #831843 0%, #9d174d 100%)",
    players: [{ rank: 1, name: "Sam", xp: 8330 }, { rank: 2, name: "John", xp: 7650 }, { rank: 3, name: "Sophia", xp: 7040 }],
  },
];

const DIVISION_CONFIG: Record<Division, { color: string; glow: string; badge: string; label: string; bg: string }> = {
  Legend:     { color: "#fbbf24", glow: "#f59e0b40", badge: "🏆", label: "Legend (80+ coins/hr)",       bg: "rgba(251,191,36,0.08)" },
  Mastermind: { color: "#a855f7", glow: "#a855f740", badge: "⭐", label: "Mastermind (50 – 79 coins/hr)", bg: "rgba(168,85,247,0.08)" },
  Challenger: { color: "#3b82f6", glow: "#3b82f640", badge: "🔷", label: "Challenger (25 – 49 coins/hr)", bg: "rgba(59,130,246,0.08)" },
  Explorer:   { color: "#22c55e", glow: "#22c55e40", badge: "⭐", label: "Explorer (10 – 24 coins/hr)",    bg: "rgba(34,197,94,0.08)" },
  Rookie:     { color: "#94a3b8", glow: "#94a3b840", badge: "🔰", label: "Rookie (0 – 9 coins/hr)",       bg: "rgba(148,163,184,0.08)" },
};

// ============================================================
// HELPERS
// ============================================================
function useCountUp(target: number, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return val;
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span style={{ fontSize: 22, lineHeight: 1 }}>🥇</span>;
  if (rank === 2) return <span style={{ fontSize: 22, lineHeight: 1 }}>🥈</span>;
  if (rank === 3) return <span style={{ fontSize: 22, lineHeight: 1 }}>🥉</span>;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 32, height: 32, borderRadius: "50%",
      background: "#f1f5f9",
border: "1px solid var(--border)",
      fontSize: 13, fontWeight: 700, color: "var(--text)"
    }}>{rank}</span>
  );
}


// ============================================================
// MAIN COMPONENT
// ============================================================
function EduPlayLeaderboard() {
  const [activeTab, setActiveTab] = useState<Tab>("Global");
  const [divisionFilter, setDivisionFilter] = useState<DivisionFilter>("All Divisions");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
const [gamesThisWeek, setGamesThisWeek] = useState(0);
const [user, setUser] = useState<any>(null);

const {
  coins: walletCoins,
  setCoins: setWalletCoins,
  connectWalletSocket,
} = useWallet();
  const [players, setPlayers] = useState<Player[]>([]);
const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);
const [searchTerm, setSearchTerm] = useState("");
const fetchWallet = async () => {
  try {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    if (!token) return;

    const res = await fetch(
      "https://wallet-api-backend-production.up.railway.app/wallet/balance",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    setWalletCoins(Number(data.balance) || 0);
  } catch (err) {
    console.error("Fetch wallet failed:", err);
  }
};

const fetchLoginStreak = async () => {
  try {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    if (!token) return;

    const res = await fetch(
      "https://wallet-api-backend-production.up.railway.app/wallet/login-streak",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    setCurrentStreak(Number(data.currentStreak) || 0);
  } catch (err) {
    console.error("Fetch streak failed:", err);
  }
};

const fetchStats = async () => {
  try {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    if (!token) return;

    const res = await fetch(
      "https://wallet-api-backend-production.up.railway.app/wallet/stats",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    setGamesPlayed(Number(data.totalGamesPlayed) || 0);
    setGamesThisWeek(Number(data.gamesThisWeek) || 0);
  } catch (err) {
    console.error("Fetch stats failed:", err);
  }
};

useEffect(() => {
  supabase.auth.getUser().then(({ data }) => {
    setUser(data.user || null);
  });

  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setUser(session?.user || null);

      if (_event === "SIGNED_OUT") {
        setWalletCoins(0);
        setCurrentStreak(0);
      }
    }
  );

  return () => {
    listener.subscription.unsubscribe();
  };
}, []);

useEffect(() => {
  if (!user?.id) return;

  connectWalletSocket(user.id);
  fetchWallet();
  fetchLoginStreak();
  fetchStats();
}, [user?.id]);

useEffect(() => {
  const fetchLeaderboard = async () => {
    try {
      setLoadingLeaderboard(true);

      const res = await fetch(
        "https://wallet-api-backend-production.up.railway.app/wallet/leaderboard/coins-per-hour"
      );

      const data = await res.json();

      const formattedPlayers = data.map((p: any, index: number) => ({
        rank: index + 1,
        name: p.name || "Player",
        totalCoinsEarned: Number(p.totalCoinsEarned) || 0,
        totalHoursPlayed: Number(p.totalHoursPlayed) || 0,
        coinsPerHour: Number(p.coinsPerHour) || 0,
        avatar: "🧑",
        division: getDivision(Number(p.coinsPerHour) || 0),
      }));

      setPlayers(formattedPlayers);
    } catch (err) {
      console.error("Leaderboard fetch failed:", err);
    } finally {
      setLoadingLeaderboard(false);
    }
  };

  fetchLeaderboard();
}, []);

  /* 👇 YE LINE MISSING HAI */
  const [showRankUpPopup, setShowRankUpPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRankUpPopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  const getPlayers = (): Player[] => {
  return players;
};

  const filteredPlayers = getPlayers().filter((p) => {
  const query = searchTerm.toLowerCase();

  const matchSearch =
    query === "" ||
    p.name.toLowerCase().includes(query) ||
    p.division.toLowerCase().includes(query);

  const matchDiv =
    divisionFilter === "All Divisions" ||
    p.division === divisionFilter;

  return matchSearch && matchDiv;
});

  // Group by division for display
  const divisions: Division[] = ["Legend", "Mastermind", "Challenger", "Explorer", "Rookie"];

  const groupedPlayers = divisions.map(div => ({
    division: div,
    players: filteredPlayers.filter(p => p.division === div),
  })).filter(g => g.players.length > 0);

  const currentUser = players.find(p => p.isCurrentUser);

  return (
    <div
style={{
  position: "relative",
  minHeight: "100vh",
  width: "100%",
  maxWidth: "1600px",
  margin: "0 auto",
  padding: "12px 18px",
  boxSizing: "border-box",
}}
>
      <style>{`
      :root {
  --card: #ffffff;
  --text: #0f172a;
  --muted: #64748b;
  --border: #e2e8f0;
  --shadow: 0 8px 30px rgba(0,0,0,0.05);
}
 
        .tab-btn {
          padding: 8px 20px; border-radius: 50px; border: none; cursor: pointer;
          font-size: 14px; font-weight: 700; transition: all 0.22s ease;
          font-family: inherit;
        }
        .tab-btn.inactive {
          background: #f1f5f9; color: var(--muted);
          border: 1px solid var(--border);
        }
        .tab-btn.inactive:hover {
  background: #e2e8f0;   /* ✅ LIGHT hover */
  color: var(--text);
  box-shadow: none;      /* ❌ glow hata */
}
        .tab-btn.active {
          background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%);
          color: #fff; box-shadow: none;
        }

        .stat-card {
  flex: 1;
  border-radius: 20px;
  padding: 14px 18px;
  transition: all 0.25s ease;
  cursor: default;

  background: rgba(255, 255, 255, 0.25);   /* 👈 transparent glass */
  backdrop-filter: blur(14px);             /* 👈 blur effect */
  -webkit-backdrop-filter: blur(14px);

  border: 1px solid rgba(255,255,255,0.35); /* 👈 soft border */
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
}

.stat-card:hover {
  transform: translateY(-6px) scale(1.01);
}
  /* =========================
TOP STATS PREMIUM COLORS
========================= */

/* Levels Completed */
.level-card{
  background:linear-gradient(135deg,#f0f8ff,#dbeafe);
  border:1px solid #7ec3ff;
}

.level-card:hover{
  box-shadow:0 14px 28px rgba(80,170,255,0.18);
}

/* Games Played */
.games-card{
  background:linear-gradient(135deg,#f3fff0,#dcfce7);
  border:1px solid #98df7a;
}

.games-card:hover{
  box-shadow:0 14px 28px rgba(100,220,90,0.18);
}

/* Win Streak */
.streak-card{
  background:linear-gradient(135deg,#fff7ed,#ffedd5);
  border:1px solid #ffc26d;
}

.streak-card:hover{
  box-shadow:0 14px 28px rgba(255,166,40,0.18);
}
        .glass-card {
  background: #fff;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  border-radius: 20px;
}

        .player-row {
          display: grid;
          grid-template-columns: 60px 1fr 160px 100px 120px;
          align-items: center;
          padding: 12px 16px;
          border-radius: 12px;
          transition: all 0.2s ease;
          cursor: pointer;
          gap: 8px;
          background: #fff;
  border: 1px solid var(--border);
        }
        .player-row:hover {
  background: rgba(139,92,246,0.12);
  border-color: rgba(139,92,246,0.3);
}
        .player-row.gold-row {
          background: linear-gradient(90deg, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.04) 100%);
          border: 1px solid rgba(251,191,36,0.2);
          box-shadow: var(--shadow);
        }
        .player-row.current-user-row {
          background: rgba(139,92,246,0.12);
          border: 1.5px solid rgba(139,92,246,0.5);
          box-shadow: var(--shadow);
        }

        .division-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 10px;
  font-weight: 900;
  font-size: 13px;
  margin: 12px 0 6px;

  border: 1px solid var(--border); /* ADD */
}

        .category-card {
          flex: 1; border-radius: 16px; padding: 16px;
          transition: transform 0.22s ease, box-shadow 0.22s ease; cursor: pointer;
          min-width: 0;
        }
        .category-card:hover { transform: translateY(-4px); }

        
        .rank-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 20px 24px;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .rank-card:hover {
          transform: scale(1.02);
          box-shadow: var(--shadow);
        }
          /* ===============================
YOUR RANK PREMIUM XP BAR
=============================== */

.xp-bar-track{
  width:100%;
  height:16px;
  border-radius:999px;
  overflow:hidden;
  position:relative;

  background:linear-gradient(90deg,#eef2ff,#e0e7ff);
  border:1px solid #dbeafe;

  box-shadow:
    inset 0 2px 5px rgba(255,255,255,0.9),
    inset 0 -2px 5px rgba(0,0,0,0.05);
}

/* Fill */
.xp-bar-fill{
  height:100%;
  border-radius:999px;
  position:relative;
  z-index:1;

  background:linear-gradient(
    90deg,
    #8b5cf6 0%,
    #7c3aed 35%,
    #06b6d4 70%,
    #22c55e 100%
  );

  box-shadow:
    0 0 10px rgba(139,92,246,0.45),
    0 0 18px rgba(6,182,212,0.25);

  transition:width 0.8s ease;
}

/* Shine animation */
.xp-bar-fill::after{
  content:"";
  position:absolute;
  top:0;
  left:-40%;
  width:40%;
  height:100%;
  background:linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.55),
    transparent
  );
  animation:shineMove 2.5s infinite linear;
}

@keyframes shineMove{
  from{ left:-40%; }
  to{ left:110%; }
}

        .tip-bar {
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: 16px; padding: 14px 24px;
          display: flex; align-items: center; gap: 14px;
          margin-top: 16px;
        }

        .col-header {
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted); /* brighter */
}
  .search-box {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 8px 12px;
  color: var(--text);
  outline: none;
}

.search-box::placeholder {
  color: #64748b;
}

.dropdown-select {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 8px 10px;
 color: var(--text);
}

/* ==========================================
INDIVIDUAL CARD COLORS
========================================== */

/* Math Champion */
.math-card{
  background:linear-gradient(135deg,#f0f8ff,#dbeafe);
  border:1px solid #7ec3ff;
}
.math-card .category-icon{
  background:#e9f5ff;
}
.math-card:hover{
  box-shadow:0 14px 28px rgba(80,170,255,0.18);
}

/* Science Master */
.science-card{
  background:linear-gradient(135deg,#f3fff0,#dcfce7);
  border:1px solid #98df7a;
}
.science-card .category-icon{
  background:#efffea;
}
.science-card:hover{
  box-shadow:0 14px 28px rgba(100,220,90,0.18);
}

/* Puzzle King */
.puzzle-card{
  background:linear-gradient(135deg,#fff7ed,#ffedd5);
  border:1px solid #ffc26d;
}
.puzzle-card .category-icon{
  background:#fff4e7;
}
.puzzle-card:hover{
  box-shadow:0 14px 28px rgba(255,166,40,0.18);
}

/* Language Wizard */
.language-card{
  background:linear-gradient(135deg,#fff1f2,#ffe4e6);
  border:1px solid #ff9f9f;
}
.language-card .category-icon{
  background:#fff1f1;
}
.language-card:hover{
  box-shadow:0 14px 28px rgba(255,100,100,0.18);
}

/* Memory Beast */
.memory-card{
  background:linear-gradient(135deg,#faf5ff,#f3e8ff);
  border:1px solid #e3a2ff;
}
.memory-card .category-icon{
  background:#fcf0ff;
}
.memory-card:hover{
  box-shadow:0 14px 28px rgba(210,100,255,0.18);
}

/* GRID */
.category-grid{
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:14px;
}

/* RESPONSIVE */
@media(max-width:1400px){
  .category-grid{
    grid-template-columns:repeat(3,1fr);
  }
}

@media(max-width:900px){
  .category-grid{
    grid-template-columns:repeat(2,1fr);
  }
}

@media(max-width:600px){
  .category-grid{
    grid-template-columns:1fr;
  }

  .category-title{
    font-size:24px;
  }

  .category-card{
    min-height:auto;
  }
}
      `}</style>

      {/* ── MAIN CONTENT ── */}
      <main
style={{
  width: "100%",
  marginLeft: "0",
}}
>


        <div style={{ padding: "0" }}>

          <div style={{ padding: "0" }}>

          {/* ── TOP SECTION: Left (title+tabs+stats) / Right (header+rank card) ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: "20px",
            alignItems: "start",
            marginBottom: "24px",
          }}>

            {/* LEFT COLUMN: Title, tagline, tabs, Games/Streak cards */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                <h1 style={{ fontSize: 42, fontWeight: 900, lineHeight: 1, letterSpacing: "-1px", color: "var(--text)" }}>
                  Leaderboard
                </h1>
                <span style={{ fontSize: 34 }}>👑</span>
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 20, color: "var(--muted)" }}>
                <span style={{ color: "#f472b6" }}>Compete</span>
                <span style={{ color: "var(--muted)", margin: "0 8px" }}>•</span>
                <span style={{ color: "#fbbf24" }}>Learn</span>
                <span style={{ color: "var(--muted)", margin: "0 8px" }}>•</span>
                <span style={{ color: "#22d3ee" }}>Become the Champion!</span>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
                {(["Global", "Weekly", "Friends"] as Tab[]).map(tab => (
                  <button key={tab} className={`tab-btn ${activeTab === tab ? "active" : "inactive"}`}
                    onClick={() => setActiveTab(tab)}>
                    {tab === "Friends" && "👥 "}
                    {tab}
                  </button>
                ))}
              </div>

              {/* Games Played + Win Streak row */}
              <div style={{ display: "flex", gap: 14 }}>
                {/* Games Played */}
                <div className="stat-card games-card" style={{ flex: 1, minHeight: 100 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                      background: "#efffea",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.5)", display: "flex",
                      alignItems: "center", justifyContent: "center", fontSize: 26,
                    }}>🎮</div>
                    <div>
                      <div style={{ fontSize: 15, color: "#0b4520", fontWeight: 700 }}>Games Played</div>
                      <div style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.1, color: "var(--text)" }}>{gamesPlayed.toLocaleString()}</div>
<div style={{ fontSize: 13, color: "#4ade80", fontWeight: 700, marginTop: 2 }}>↑ {gamesThisWeek} this week</div>
                    </div>
                  </div>
                </div>

                {/* Win Streak */}
                <div className="stat-card streak-card" style={{ flex: 1, minHeight: 100 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                      background: "#fff4e7",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.5)", display: "flex",
                      alignItems: "center", justifyContent: "center", fontSize: 26,
                    }}><span className="fire-icon">🔥</span></div>
                    <div>
                      <div style={{ fontSize: 15, color: "#5a3105", fontWeight: 700 }}>Win Streak</div>
                      <div style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.1, color: "var(--text)" }}>{currentStreak} {currentStreak === 1 ? "Day" : "Days"}</div>
                      <div style={{ fontSize: 13, color: "#fbbf24", fontWeight: 700, marginTop: 2 }}>Keep it up!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Coins/User header + bigger Your Rank profile card */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Header walletCoins={walletCoins} user={user} />

              <div className="rank-card" style={{
                padding: "24px 26px",
                minHeight: 213,
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 84, height: 84, fontSize: 44,
                    borderRadius: "50%", flexShrink: 0,
                    background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
                    border: "3px solid #8b5cf6",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 18px rgba(139,92,246,0.35)",
                  }}>
                    🧑
                  </div>
<div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 700 }}>
                      Your Rank
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 46, fontWeight: 900, lineHeight: 1, color: "var(--text)" }}>
                        12
                      </span>
                      <span style={{ fontSize: 22 }}>🔷</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#22c55e" }}>
                      ⬆️ Challenger
                    </div>
                    <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>
                      6,250 / 12,000 XP
                    </div>
                  </div>
                  
                </div>

                <div className="xp-bar-track" style={{ marginTop: 14, height: 16 }}>
                  <div className="xp-bar-fill" style={{ width: "52%" }} />
                </div>
              </div>
            </div>
          </div>

            </div>
          

          {/* ── CATEGORY VIEW ── */}
          {/* {activeTab === "Category" ? ( */}
          {false ? (
            <div className="glass-card" style={{ padding: 28 }}>
              <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                🎯 <span>Category Leaderboards</span>
              </div>
              <div className="category-grid">
  {CATEGORIES.map(cat => (
    <div
      key={cat.name}
      className={`category-card ${
        cat.name === "Math Champion"
          ? "math-card"
          : cat.name === "Science Master"
          ? "science-card"
          : cat.name === "Puzzle King"
          ? "puzzle-card"
          : cat.name === "Language Wizard"
          ? "language-card"
          : "memory-card"
      }`}
      style={{
        
        boxShadow: "var(--shadow)"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 16
        }}
      >
        <div
          className="category-icon"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18
          }}
        >
          {cat.icon}
        </div>

        <div style={{ fontWeight: 800, fontSize: 13 }}>
          {cat.name}
        </div>
      </div>

      {cat.players.map(p => (
        <div
          key={p.rank}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 10
          }}
        >
          <span>
            {p.rank === 1 ? "🥇" : p.rank === 2 ? "🥈" : "🥉"}
          </span>

          <span
            style={{
              flex: 1,
              fontWeight: 700,
              fontSize: 13
            }}
          >
            {p.name}
          </span>

          <span
            style={{
              fontSize: 12,
              color: cat.color,
              fontWeight: 700
            }}
          >
            {p.xp.toLocaleString()} XP
          </span>
        </div>
      ))}
    </div>
  ))}
</div>
            </div>
          ) : (
            /* ── GLOBAL / WEEKLY / FRIENDS LEADERBOARD PANEL ── */
            <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
              {/* Panel Header */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "20px 24px", borderBottom: "1px solid var(--border)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 26 }}>🏆</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>
                      {activeTab === "Weekly" ? "Weekly Leaderboard" : activeTab === "Friends" ? "Friends Leaderboard" : "Global Leaderboard"}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>
                      {activeTab === "Weekly" ? "Resets every Monday" : activeTab === "Friends" ? "Your friends ranking" : "Top players from around the world"}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <input
  className="search-box"
  placeholder="🔍 Search player..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  style={{ width: 180 }}
/>
                  {activeTab === "Global" && (
                    <select
                      className="dropdown-select"
                      value={divisionFilter}
                      onChange={e => setDivisionFilter(e.target.value as DivisionFilter)}
                    >
                      <option value="All Divisions">All Divisions</option>
                      {divisions.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  )}
                </div>
              </div>

              {/* Table Header */}
              <div className="player-row" style={{
                background: "#f8fafc", cursor: "default",
                borderBottom: "1px solid var(--border)",
                borderRadius: 0,
              }}>
                <span className="col-header">Rank</span>
                <span className="col-header">Player</span>
                <span className="col-header" style={{ textAlign: "center" }}>Coins / Hour</span>
<span className="col-header" style={{ textAlign: "center" }}>Total Coins</span>
<span className="col-header" style={{ textAlign: "center" }}>Hours Played</span>
              </div>

              {/* Rows */}
              <div style={{ padding: "8px 10px" }}>
                {loadingLeaderboard && (
  <div style={{ padding: 20, textAlign: "center", color: "var(--muted)", fontWeight: 700 }}>
    Loading leaderboard...
  </div>
)}
                {activeTab === "Global" ? (
                  groupedPlayers.map(group => {
                    const cfg = DIVISION_CONFIG[group.division];
                    return (
                      <div key={group.division} className="animate-in">
                        {/* Division Header */}
                        <div className="division-header" style={{ background: cfg.bg, color: cfg.color }}>
                          <span style={{ fontSize: 18 }}>{cfg.badge}</span>
                          <span>{cfg.label}</span>
                        </div>
                        {/* Players */}
                        {group.players.map(player => (
                          <PlayerRow key={player.rank} player={player} />
                        ))}
                      </div>
                    );
                  })
                ) : (
                  <div className="animate-in">
                    {filteredPlayers.map(player => (
                      <PlayerRow key={player.rank} player={player} />
                    ))}
                  </div>
                )}

                {/* Current user always shown at bottom for Global */}
                {activeTab === "Global" &&
  currentUser &&
  !filteredPlayers.find(p => p.isCurrentUser) && (
    <div style={{ borderTop: "1px solid var(--border)", marginTop: 8, paddingTop: 8 }}>
      <PlayerRow player={currentUser} />
    </div>
)}
              </div>
            </div>
          )}

          {/* ── CATEGORY LEADERBOARDS ── */}
          {/* {activeTab !== "Category" && ( */}
          {/* {false && (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ fontWeight: 800, fontSize: 18 }}>Category Leaderboards</div>
                <button onClick={() => setActiveTab("Category")} style={{
                  background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)",
                  color: "#a78bfa", borderRadius: 10, padding: "6px 16px", cursor: "pointer",
                  fontWeight: 700, fontSize: 13, fontFamily: "inherit",
                }}>View All</button>
              </div>
              <div style={{ display: "flex", gap: 14 }}>
                {CATEGORIES.map(cat => (
  <div
    key={cat.name}
    className={`category-card ${
      cat.name === "Math Champion"
        ? "math-card"
        : cat.name === "Science Master"
        ? "science-card"
        : cat.name === "Puzzle King"
        ? "puzzle-card"
        : cat.name === "Language Wizard"
        ? "language-card"
        : "memory-card"
    }`}
    style={{
      boxShadow:"var(--shadow)"
    }}
  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <div
  className="category-icon"
  style={{
    width: 36,
    height: 36,
    borderRadius: 10,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
  }}
>{cat.icon}</div>
                      <div style={{ fontWeight: 800, fontSize: 12, lineHeight: 1.3 }}>{cat.name}</div>
                    </div>
                    {cat.players.map(p => (
                      <div key={p.rank} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
                        <span style={{ fontSize: 13, flexShrink: 0 }}>
                          {p.rank === 1 ? "🥇" : p.rank === 2 ? "🥈" : "🥉"}
                        </span>
                        <span style={{ flex: 1, fontWeight: 700, fontSize: 12, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</span>
                        <span style={{ fontSize: 11, color: cat.color, fontWeight: 700, flexShrink: 0 }}>{p.xp.toLocaleString()} XP</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* ── TIP BAR ── */}
          <div className="tip-bar">
            <span style={{ fontSize: 22, flexShrink: 0 }}>💡</span>
            <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
              <span style={{ fontWeight: 800, color: "#fbbf24" }}>Tip: </span>
              Play daily, complete levels with good accuracy & explore different categories to earn more coins!
            </div>
            <span style={{ fontSize: 22, flexShrink: 0 }}>🌸</span>
          </div>
        </div>
      </main>

      {/* ── RANK UP POPUP ── */}
      {showRankUpPopup && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
        }} onClick={() => setShowRankUpPopup(false)}>
          <div className="popup-in glass-card" style={{
            padding: 40, textAlign: "center", maxWidth: 360,
            border: "1px solid rgba(139,92,246,0.5)",
            boxShadow: "var(--shadow)",
          }}>
            <div style={{ fontSize: 60, marginBottom: 12 }}>🎉</div>
            <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>Rank Up!</div>
            <div style={{ color: "#a78bfa", fontWeight: 700 }}>You reached Mastermind!</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// PLAYER ROW COMPONENT
// ============================================================
function PlayerRow({ player }: { player: Player }) {
  const isGold = player.rank === 1;

  return (
    <div className={`player-row ${isGold ? "gold-row" : ""} ${player.isCurrentUser ? "current-user-row" : ""}`}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <RankBadge rank={player.rank} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          flexShrink: 0,
          background: player.isCurrentUser
            ? "linear-gradient(135deg, #8b5cf6, #06b6d4)"
            : "linear-gradient(135deg, #334155, #475569)",
          border: `2px solid ${player.isCurrentUser ? "#8b5cf6" : "var(--border)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
        }}>
          {player.avatar}
        </div>

        <div>
          <span style={{
            fontWeight: 800,
            fontSize: 14,
            color: player.isCurrentUser ? "#a78bfa" : isGold ? "#fbbf24" : "var(--text)",
          }}>
            {player.name}
            {player.rank === 1 && " 👑"}
          </span>

          <div style={{ fontSize: 10, color: "var(--muted)", fontWeight: 600 }}>
            {DIVISION_CONFIG[player.division].badge} {player.division}
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", fontWeight: 900, fontSize: 14, color: isGold ? "#fbbf24" : "var(--text)" }}>
        {player.coinsPerHour.toLocaleString()} coins/hr
      </div>

      <div style={{ textAlign: "center", fontWeight: 700, fontSize: 14, color: "var(--muted)" }}>
        {player.totalCoinsEarned.toLocaleString()}
      </div>

      <div style={{ textAlign: "center", fontWeight: 700, fontSize: 14, color: "#fb923c" }}>
        {player.totalHoursPlayed} hr
      </div>
    </div>
  );
}

function Header({ walletCoins, user }: any) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex justify-end items-center gap-4"
    >

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2 h-10 px-4 rounded-lg bg-yellow-400/20 border border-yellow-400/30">
          <span>🪙</span>
          <span className="font-bold text-white-300">{walletCoins}</span>
        </div>

<div className="h-10 px-3 flex items-center rounded-lg bg-card border border-border shadow-soft">
  <span className="text-xs font-semibold text-foreground max-w-[180px] truncate">
    {user?.email || "Not logged in"}
  </span>
</div>
      </div>
    </motion.header>
  );
}
