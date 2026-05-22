import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-KIRN8jhE.js";
import { m as motion, S as Search } from "./search-CDmC7IW7.js";
import { F as Flame, B as Bell } from "./flame-D2qNaFnH.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./createLucideIcon-BbfksdJi.js";
const PLAYERS = [{
  rank: 1,
  name: "Alex",
  xp: 12540,
  levels: 245,
  streak: 32,
  avatar: "👦",
  division: "Legend"
}, {
  rank: 2,
  name: "MJ",
  xp: 12120,
  levels: 238,
  streak: 30,
  avatar: "👧",
  division: "Legend"
}, {
  rank: 3,
  name: "Sam",
  xp: 12010,
  levels: 230,
  streak: 29,
  avatar: "🧒",
  division: "Legend"
}, {
  rank: 4,
  name: "John",
  xp: 9850,
  levels: 190,
  streak: 18,
  avatar: "👦",
  division: "Mastermind"
}, {
  rank: 5,
  name: "Emma",
  xp: 9540,
  levels: 185,
  streak: 16,
  avatar: "👧",
  division: "Mastermind"
}, {
  rank: 6,
  name: "Noah",
  xp: 8760,
  levels: 175,
  streak: 14,
  avatar: "🧑",
  division: "Challenger"
}, {
  rank: 7,
  name: "Sophia",
  xp: 7890,
  levels: 160,
  streak: 12,
  avatar: "👧",
  division: "Challenger"
}, {
  rank: 8,
  name: "Liam",
  xp: 6980,
  levels: 150,
  streak: 10,
  avatar: "👦",
  division: "Challenger"
}, {
  rank: 9,
  name: "Olivia",
  xp: 5420,
  levels: 120,
  streak: 7,
  avatar: "👧",
  division: "Explorer"
}, {
  rank: 10,
  name: "Ava",
  xp: 4980,
  levels: 110,
  streak: 6,
  avatar: "🧒",
  division: "Explorer"
}, {
  rank: 11,
  name: "Lucas",
  xp: 2450,
  levels: 80,
  streak: 4,
  avatar: "👦",
  division: "Rookie"
}, {
  rank: 12,
  name: "You",
  xp: 6250,
  levels: 125,
  streak: 15,
  avatar: "🧑",
  division: "Challenger",
  isCurrentUser: true
}];
const WEEKLY_PLAYERS = [{
  rank: 1,
  name: "Emma",
  xp: 3200,
  levels: 64,
  streak: 7,
  avatar: "👧",
  division: "Legend"
}, {
  rank: 2,
  name: "Alex",
  xp: 2980,
  levels: 59,
  streak: 5,
  avatar: "👦",
  division: "Legend"
}, {
  rank: 3,
  name: "Noah",
  xp: 2750,
  levels: 55,
  streak: 7,
  avatar: "🧑",
  division: "Mastermind"
}, {
  rank: 4,
  name: "Sophia",
  xp: 2400,
  levels: 48,
  streak: 4,
  avatar: "👧",
  division: "Mastermind"
}, {
  rank: 5,
  name: "Liam",
  xp: 2100,
  levels: 42,
  streak: 3,
  avatar: "👦",
  division: "Challenger"
}, {
  rank: 6,
  name: "Olivia",
  xp: 1890,
  levels: 37,
  streak: 2,
  avatar: "👧",
  division: "Challenger"
}, {
  rank: 7,
  name: "You",
  xp: 1650,
  levels: 33,
  streak: 5,
  avatar: "🧑",
  division: "Challenger",
  isCurrentUser: true
}];
const FRIENDS_PLAYERS = [{
  rank: 1,
  name: "Sam",
  xp: 12010,
  levels: 230,
  streak: 29,
  avatar: "🧒",
  division: "Legend"
}, {
  rank: 2,
  name: "Liam",
  xp: 6980,
  levels: 150,
  streak: 10,
  avatar: "👦",
  division: "Challenger"
}, {
  rank: 3,
  name: "You",
  xp: 6250,
  levels: 125,
  streak: 15,
  avatar: "🧑",
  division: "Challenger",
  isCurrentUser: true
}, {
  rank: 4,
  name: "Ava",
  xp: 4980,
  levels: 110,
  streak: 6,
  avatar: "🧒",
  division: "Explorer"
}, {
  rank: 5,
  name: "Lucas",
  xp: 2450,
  levels: 80,
  streak: 4,
  avatar: "👦",
  division: "Rookie"
}];
const CATEGORIES = [{
  name: "Math Champion",
  icon: "🔢",
  color: "#3b82f6",
  gradient: "linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)",
  players: [{
    rank: 1,
    name: "Alex",
    xp: 8450
  }, {
    rank: 2,
    name: "MJ",
    xp: 7890
  }, {
    rank: 3,
    name: "Sam",
    xp: 7200
  }]
}, {
  name: "Science Master",
  icon: "🧪",
  color: "#22c55e",
  gradient: "linear-gradient(135deg, #14532d 0%, #166534 100%)",
  players: [{
    rank: 1,
    name: "John",
    xp: 7650
  }, {
    rank: 2,
    name: "Emma",
    xp: 7100
  }, {
    rank: 3,
    name: "Noah",
    xp: 6540
  }]
}, {
  name: "Puzzle King",
  icon: "🧩",
  color: "#f97316",
  gradient: "linear-gradient(135deg, #7c2d12 0%, #9a3412 100%)",
  players: [{
    rank: 1,
    name: "Sophia",
    xp: 8120
  }, {
    rank: 2,
    name: "Liam",
    xp: 7430
  }, {
    rank: 3,
    name: "Olivia",
    xp: 6980
  }]
}, {
  name: "Language Wizard",
  icon: "📖",
  color: "#ef4444",
  gradient: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)",
  players: [{
    rank: 1,
    name: "Ava",
    xp: 7890
  }, {
    rank: 2,
    name: "Alex",
    xp: 7120
  }, {
    rank: 3,
    name: "Emma",
    xp: 6540
  }]
}, {
  name: "Memory Beast",
  icon: "🧠",
  color: "#ec4899",
  gradient: "linear-gradient(135deg, #831843 0%, #9d174d 100%)",
  players: [{
    rank: 1,
    name: "Sam",
    xp: 8330
  }, {
    rank: 2,
    name: "John",
    xp: 7650
  }, {
    rank: 3,
    name: "Sophia",
    xp: 7040
  }]
}];
const DIVISION_CONFIG = {
  Legend: {
    color: "#fbbf24",
    glow: "#f59e0b40",
    badge: "🏆",
    label: "Legend (12000+ XP)",
    bg: "rgba(251,191,36,0.08)"
  },
  Mastermind: {
    color: "#a855f7",
    glow: "#a855f740",
    badge: "⭐",
    label: "Mastermind (9000 – 11999 XP)",
    bg: "rgba(168,85,247,0.08)"
  },
  Challenger: {
    color: "#3b82f6",
    glow: "#3b82f640",
    badge: "🔷",
    label: "Challenger (6000 – 8999 XP)",
    bg: "rgba(59,130,246,0.08)"
  },
  Explorer: {
    color: "#22c55e",
    glow: "#22c55e40",
    badge: "⭐",
    label: "Explorer (3000 – 5999 XP)",
    bg: "rgba(34,197,94,0.08)"
  },
  Rookie: {
    color: "#94a3b8",
    glow: "#94a3b840",
    badge: "🔰",
    label: "Rookie (0 – 2999 XP)",
    bg: "rgba(148,163,184,0.08)"
  }
};
function RankBadge({
  rank
}) {
  if (rank === 1) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
    fontSize: 22,
    lineHeight: 1
  }, children: "🥇" });
  if (rank === 2) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
    fontSize: 22,
    lineHeight: 1
  }, children: "🥈" });
  if (rank === 3) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
    fontSize: 22,
    lineHeight: 1
  }, children: "🥉" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "#f1f5f9",
    border: "1px solid var(--border)",
    fontSize: 13,
    fontWeight: 700,
    color: "var(--text)"
  }, children: rank });
}
function EduPlayLeaderboard() {
  const [activeTab, setActiveTab] = reactExports.useState("Global");
  const [divisionFilter, setDivisionFilter] = reactExports.useState("All Divisions");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [showNotifications, setShowNotifications] = reactExports.useState(false);
  const [walletCoins, setWalletCoins] = reactExports.useState(0);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  reactExports.useEffect(() => {
    const syncCoins = () => {
      const savedCoins = localStorage.getItem("logicMazeCoins");
      setWalletCoins(savedCoins ? Number(savedCoins) : 0);
    };
    syncCoins();
    window.addEventListener("storage", syncCoins);
    window.addEventListener("walletUpdated", syncCoins);
    return () => {
      window.removeEventListener("storage", syncCoins);
      window.removeEventListener("walletUpdated", syncCoins);
    };
  }, []);
  const [showRankUpPopup, setShowRankUpPopup] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      setShowRankUpPopup(true);
    }, 2e3);
    return () => clearTimeout(timer);
  }, []);
  const getPlayers = () => {
    if (activeTab === "Weekly") return WEEKLY_PLAYERS;
    if (activeTab === "Friends") return FRIENDS_PLAYERS;
    return PLAYERS;
  };
  const filteredPlayers = getPlayers().filter((p) => {
    const query = searchTerm.toLowerCase();
    const matchSearch = query === "" || p.name.toLowerCase().includes(query) || p.division.toLowerCase().includes(query);
    const matchDiv = divisionFilter === "All Divisions" || p.division === divisionFilter;
    return matchSearch && matchDiv;
  });
  const divisions = ["Legend", "Mastermind", "Challenger", "Explorer", "Rookie"];
  const groupedPlayers = divisions.map((div) => ({
    division: div,
    players: filteredPlayers.filter((p) => p.division === div)
  })).filter((g) => g.players.length > 0);
  const currentUser = PLAYERS.find((p) => p.isCurrentUser);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    maxWidth: "1600px",
    margin: "0 auto",
    padding: "12px 18px",
    boxSizing: "border-box"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
  padding: 20px 24px;
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
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { style: {
      width: "100%",
      marginLeft: "0"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { walletCoins, searchTerm, setSearchTerm }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        padding: "0"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: "24px",
          marginTop: "20px",
          alignItems: "start"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            flex: 1
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 6
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: {
                fontSize: 42,
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-1px",
                color: "var(--text)"
              }, children: "Leaderboard" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                fontSize: 34
              }, children: "👑" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              fontSize: 17,
              fontWeight: 700,
              marginBottom: 20,
              color: "var(--muted)"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                color: "#f472b6"
              }, children: "Compete" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                color: "var(--muted)",
                margin: "0 8px"
              }, children: "•" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                color: "#fbbf24"
              }, children: "Learn" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                color: "var(--muted)",
                margin: "0 8px"
              }, children: "•" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                color: "#22d3ee"
              }, children: "Become the Champion!" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              display: "flex",
              gap: 10
            }, children: ["Global", "Weekly", "Friends", "Category"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `tab-btn ${activeTab === tab ? "active" : "inactive"}`, onClick: () => setActiveTab(tab), children: [
              tab === "Friends" && "👥 ",
              tab === "Category" && "🎯 ",
              tab
            ] }, tab)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rank-card", style: {
            width: 320,
            flexShrink: 0
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "16px"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                width: 64,
                height: 64,
                borderRadius: "50%",
                flexShrink: 0,
                background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
                border: "3px solid #8b5cf6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                boxShadow: "0 0 20px rgba(139,92,246,0.45)"
              }, children: "🧑" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                flex: 1
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                  fontSize: 12,
                  color: "var(--muted)",
                  fontWeight: 700,
                  marginBottom: 2
                }, children: "Your Rank" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                    fontSize: 36,
                    fontWeight: 900,
                    lineHeight: 1,
                    color: "var(--text)"
                  }, children: "12" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                    fontSize: 22
                  }, children: "🔷" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 2
                }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                    fontSize: 14
                  }, children: "⬆️" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#4ade80"
                  }, children: "Challenger" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                  fontSize: 12,
                  color: "var(--muted)",
                  marginTop: 2,
                  fontWeight: 600
                }, children: "6,250 / 12,000 XP" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "xp-bar-track", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "xp-bar-fill", style: {
              width: "52%"
            } }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "18px",
          marginTop: 24,
          marginBottom: 24
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-card level-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 16
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              width: 52,
              height: 52,
              borderRadius: 14,
              flexShrink: 0,
              background: "#e9f5ff",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26
            }, children: "🚩" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                fontSize: 15,
                color: "#084387",
                fontWeight: 700
              }, children: "Levels Completed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                fontSize: 32,
                fontWeight: 900,
                lineHeight: 1.1,
                color: "var(--text)"
              }, children: "1,245" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                fontSize: 13,
                color: "#4ade80",
                fontWeight: 700,
                marginTop: 2
              }, children: "↑ 32 this week" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-card games-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 16
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              width: 52,
              height: 52,
              borderRadius: 14,
              flexShrink: 0,
              background: "#efffea",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26
            }, children: "🎮" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                fontSize: 15,
                color: "#0b4520",
                fontWeight: 700
              }, children: "Games Played" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                fontSize: 32,
                fontWeight: 900,
                lineHeight: 1.1,
                color: "var(--text)"
              }, children: "2,890" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                fontSize: 13,
                color: "#4ade80",
                fontWeight: 700,
                marginTop: 2
              }, children: "↑ 85 this week" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-card streak-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: 16
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              width: 52,
              height: 52,
              borderRadius: 14,
              flexShrink: 0,
              background: "#fff4e7",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fire-icon", children: "🔥" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                fontSize: 15,
                color: "#5a3105",
                fontWeight: 700
              }, children: "Win Streak" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                fontSize: 32,
                fontWeight: 900,
                lineHeight: 1.1,
                color: "var(--text)"
              }, children: "15 Days" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                fontSize: 13,
                color: "#fbbf24",
                fontWeight: 700,
                marginTop: 2
              }, children: "Keep it up!" })
            ] })
          ] }) })
        ] }),
        activeTab === "Category" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card", style: {
          padding: 28
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            fontWeight: 800,
            fontSize: 20,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 10
          }, children: [
            "🎯 ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Category Leaderboards" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "category-grid", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `category-card ${cat.name === "Math Champion" ? "math-card" : cat.name === "Science Master" ? "science-card" : cat.name === "Puzzle King" ? "puzzle-card" : cat.name === "Language Wizard" ? "language-card" : "memory-card"}`, style: {
            boxShadow: "var(--shadow)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "category-icon", style: {
                width: 36,
                height: 36,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18
              }, children: cat.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                fontWeight: 800,
                fontSize: 13
              }, children: cat.name })
            ] }),
            cat.players.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p.rank === 1 ? "🥇" : p.rank === 2 ? "🥈" : "🥉" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                flex: 1,
                fontWeight: 700,
                fontSize: 13
              }, children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
                fontSize: 12,
                color: cat.color,
                fontWeight: 700
              }, children: [
                p.xp.toLocaleString(),
                " XP"
              ] })
            ] }, p.rank))
          ] }, cat.name)) })
        ] }) : (
          /* ── GLOBAL / WEEKLY / FRIENDS LEADERBOARD PANEL ── */
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card", style: {
            padding: 0,
            overflow: "hidden"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 24px",
              borderBottom: "1px solid var(--border)"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                display: "flex",
                alignItems: "center",
                gap: 12
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                  fontSize: 26
                }, children: "🏆" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                    fontWeight: 800,
                    fontSize: 18
                  }, children: activeTab === "Weekly" ? "Weekly Leaderboard" : activeTab === "Friends" ? "Friends Leaderboard" : "Global Leaderboard" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                    fontSize: 12,
                    color: "var(--muted)",
                    fontWeight: 600
                  }, children: activeTab === "Weekly" ? "Resets every Monday" : activeTab === "Friends" ? "Your friends ranking" : "Top players from around the world" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                display: "flex",
                alignItems: "center",
                gap: 10
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "search-box", placeholder: "🔍 Search player...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), style: {
                  width: 180
                } }),
                activeTab === "Global" && /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "dropdown-select", value: divisionFilter, onChange: (e) => setDivisionFilter(e.target.value), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All Divisions", children: "All Divisions" }),
                  divisions.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d, children: d }, d))
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "player-row", style: {
              background: "#f8fafc",
              cursor: "default",
              borderBottom: "1px solid var(--border)",
              borderRadius: 0
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-header", children: "Rank" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-header", children: "Player" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-header", style: {
                textAlign: "center"
              }, children: "Total XP" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-header", style: {
                textAlign: "center"
              }, children: "Levels" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-header", style: {
                textAlign: "center"
              }, children: "Win Streak" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              padding: "8px 10px"
            }, children: [
              activeTab === "Global" ? groupedPlayers.map((group) => {
                const cfg = DIVISION_CONFIG[group.division];
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "division-header", style: {
                    background: cfg.bg,
                    color: cfg.color
                  }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                      fontSize: 18
                    }, children: cfg.badge }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cfg.label })
                  ] }),
                  group.players.map((player) => /* @__PURE__ */ jsxRuntimeExports.jsx(PlayerRow, { player }, player.rank))
                ] }, group.division);
              }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-in", children: filteredPlayers.map((player) => /* @__PURE__ */ jsxRuntimeExports.jsx(PlayerRow, { player }, player.rank)) }),
              activeTab === "Global" && !filteredPlayers.find((p) => p.isCurrentUser) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                borderTop: "1px solid var(--border)",
                marginTop: 8,
                paddingTop: 8
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlayerRow, { player: currentUser }) })
            ] })
          ] })
        ),
        activeTab !== "Category" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          marginTop: 24
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              fontWeight: 800,
              fontSize: 18
            }, children: "Category Leaderboards" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("Category"), style: {
              background: "rgba(139,92,246,0.15)",
              border: "1px solid rgba(139,92,246,0.3)",
              color: "#a78bfa",
              borderRadius: 10,
              padding: "6px 16px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 13,
              fontFamily: "inherit"
            }, children: "View All" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            display: "flex",
            gap: 14
          }, children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `category-card ${cat.name === "Math Champion" ? "math-card" : cat.name === "Science Master" ? "science-card" : cat.name === "Puzzle King" ? "puzzle-card" : cat.name === "Language Wizard" ? "language-card" : "memory-card"}`, style: {
            boxShadow: "var(--shadow)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 12
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "category-icon", style: {
                width: 36,
                height: 36,
                borderRadius: 10,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18
              }, children: cat.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                fontWeight: 800,
                fontSize: 12,
                lineHeight: 1.3
              }, children: cat.name })
            ] }),
            cat.players.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: 7,
              marginBottom: 7
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                fontSize: 13,
                flexShrink: 0
              }, children: p.rank === 1 ? "🥇" : p.rank === 2 ? "🥈" : "🥉" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                flex: 1,
                fontWeight: 700,
                fontSize: 12,
                color: "var(--text)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }, children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
                fontSize: 11,
                color: cat.color,
                fontWeight: 700,
                flexShrink: 0
              }, children: [
                p.xp.toLocaleString(),
                " XP"
              ] })
            ] }, p.rank))
          ] }, cat.name)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tip-bar", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            fontSize: 22,
            flexShrink: 0
          }, children: "💡" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            flex: 1,
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              fontWeight: 800,
              color: "#fbbf24"
            }, children: "Tip: " }),
            "Play daily, complete levels with good accuracy & explore different categories to earn more XP!"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            fontSize: 22,
            flexShrink: 0
          }, children: "🌸" })
        ] })
      ] })
    ] }),
    showRankUpPopup && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100
    }, onClick: () => setShowRankUpPopup(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "popup-in glass-card", style: {
      padding: 40,
      textAlign: "center",
      maxWidth: 360,
      border: "1px solid rgba(139,92,246,0.5)",
      boxShadow: "var(--shadow)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        fontSize: 60,
        marginBottom: 12
      }, children: "🎉" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        fontSize: 24,
        fontWeight: 900,
        marginBottom: 8
      }, children: "Rank Up!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        color: "#a78bfa",
        fontWeight: 700
      }, children: "You reached Mastermind!" })
    ] }) })
  ] });
}
function PlayerRow({
  player
}) {
  const isGold = player.rank === 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `player-row ${isGold ? "gold-row" : ""} ${player.isCurrentUser ? "current-user-row" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      display: "flex",
      alignItems: "center"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RankBadge, { rank: player.rank }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        width: 34,
        height: 34,
        borderRadius: "50%",
        flexShrink: 0,
        background: player.isCurrentUser ? "linear-gradient(135deg, #8b5cf6, #06b6d4)" : "linear-gradient(135deg, #334155, #475569)",
        border: `2px solid ${player.isCurrentUser ? "#8b5cf6" : "var(--border)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18
      }, children: player.avatar }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
          fontWeight: 800,
          fontSize: 14,
          color: player.isCurrentUser ? "#a78bfa" : isGold ? "#fbbf24" : "var(--text)"
        }, children: [
          player.name,
          player.rank === 1 && " 👑",
          player.isCurrentUser && " (You)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          fontSize: 10,
          color: "var(--muted)",
          fontWeight: 600
        }, children: [
          DIVISION_CONFIG[player.division].badge,
          " ",
          player.division
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      textAlign: "center",
      fontWeight: 800,
      fontSize: 14,
      color: isGold ? "#fbbf24" : "var(--text)"
    }, children: [
      player.xp.toLocaleString(),
      " XP"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      textAlign: "center",
      fontWeight: 700,
      fontSize: 14,
      color: "var(--muted)"
    }, children: player.levels }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
      fontWeight: 700,
      fontSize: 14
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fire-icon", style: {
        fontSize: 16
      }, children: "🔥" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
        color: "#fb923c"
      }, children: player.streak })
    ] })
  ] });
}
function Header({
  walletCoins,
  searchTerm,
  setSearchTerm
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.header, { initial: {
    opacity: 0,
    y: -10
  }, animate: {
    opacity: 1,
    y: 0
  }, transition: {
    duration: 0.4
  }, className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl sm:text-3xl font-bold tracking-tight", children: [
        "Welcome back, ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: "Player" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Ready to crack today's challenge?" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 md:flex-none md:w-72", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Search games...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full h-10 pl-9 pr-3 rounded-lg bg-card border border-border shadow-soft text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 h-10 px-3 rounded-lg bg-card border border-border shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-4 w-4 text-orange-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline text-xs text-muted-foreground", children: "day streak" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 h-10 px-4 rounded-lg bg-yellow-400/20 border border-yellow-400/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🪙" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-white-300", children: walletCoins })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "relative h-10 w-10 grid place-items-center rounded-lg bg-card border border-border shadow-soft hover:border-primary/40 transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-pulse-glow" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 grid place-items-center rounded-lg bg-gradient-to-br from-primary to-secondary text-white font-semibold text-sm", children: "AX" })
    ] })
  ] });
}
export {
  EduPlayLeaderboard as component
};
