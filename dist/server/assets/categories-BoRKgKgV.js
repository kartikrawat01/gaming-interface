import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-KIRN8jhE.js";
import { S as Search, m as motion } from "./search-CDmC7IW7.js";
import { L as Lock, C as Clock, P as Play } from "./play-CXxxoh0f.js";
import { C as ChevronRight } from "./chevron-right-BbOKlZvB.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./createLucideIcon-BbfksdJi.js";
const topCategories = [{
  title: "All",
  icon: "🧠",
  color: "from-blue-500 to-indigo-500"
}, {
  title: "Maths",
  icon: "</>",
  color: "from-green-500 to-teal-500"
}, {
  title: "Science",
  icon: "🤖",
  color: "from-purple-500 to-violet-500"
}, {
  title: "Logic & Puzzles",
  icon: "🧩",
  color: "from-orange-500 to-amber-500"
}, {
  title: "Creative",
  icon: "⚡",
  color: "from-cyan-500 to-blue-500"
}, {
  title: "Language",
  icon: "👥",
  color: "from-pink-500 to-rose-500"
}, {
  title: "Memory & Speed",
  icon: "📊",
  color: "from-indigo-500 to-purple-500"
}];
const games = [{
  title: "Logic Maze",
  icon: "🧩",
  category: "Logic & Puzzles",
  difficulty: "Beginner",
  progress: 72,
  coins: 120,
  time: "10 min",
  accent: "from-cyan-400/30 to-blue-500/20"
}, {
  title: "Brain Blast",
  icon: "➗",
  category: "Maths",
  difficulty: "Beginner",
  progress: 50,
  coins: 140,
  time: "8 min",
  accent: "from-yellow-400/30 to-orange-400/20"
}, {
  title: "Trivia",
  icon: "🧪",
  category: "Science",
  difficulty: "Intermediate",
  progress: 28,
  coins: 220,
  time: "15 min",
  accent: "from-green-400/30 to-emerald-500/20"
}, {
  title: "Zip",
  icon: "📚",
  category: "Language",
  difficulty: "Beginner",
  progress: 90,
  coins: 130,
  time: "7 min",
  accent: "from-pink-400/30 to-rose-500/20"
}, {
  title: "Stop Motion Studio",
  icon: "🎨",
  category: "Creative",
  difficulty: "Intermediate",
  progress: 35,
  coins: 180,
  time: "12 min",
  accent: "from-violet-400/30 to-purple-500/20"
}, {
  title: "Piano",
  icon: "⚡",
  category: "Memory & Speed",
  difficulty: "Advanced",
  progress: 10,
  coins: 300,
  time: "20 min",
  accent: "from-indigo-400/30 to-sky-500/20"
}, {
  title: "Math Shop Game",
  icon: "🎯",
  category: "Logic & Puzzles",
  difficulty: "Intermediate",
  progress: 15,
  coins: 260,
  time: "18 min",
  accent: "from-blue-400/30 to-cyan-500/20"
}, {
  title: "Quantum Rush",
  icon: "🚀",
  category: "Science",
  difficulty: "Advanced",
  progress: 0,
  coins: 400,
  time: "25 min",
  locked: true,
  accent: "from-teal-400/30 to-green-500/20"
}];
const difficultyStyles = {
  Beginner: "bg-green-100 text-green-700 border-green-200",
  Intermediate: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Advanced: "bg-red-100 text-red-700 border-red-200"
};
function CategoriesPage() {
  const [active, setActive] = reactExports.useState("");
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [logicMazeStats, setLogicMazeStats] = reactExports.useState({
    progress: 72,
    coins: 120,
    time: "10 min"
  });
  const [walletCoins, setWalletCoins] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const loadStats = () => {
      const progress = Number(localStorage.getItem("logicMazeProgress")) || 0;
      const wallet = Number(localStorage.getItem("walletCoins")) || Number(localStorage.getItem("logicMazeCoins")) || 0;
      const coins = Number(localStorage.getItem("logicMazeCoins")) || 0;
      const time = Number(localStorage.getItem("logicMazeTime")) || 0;
      setLogicMazeStats({
        progress,
        coins,
        time: `${time} min`
      });
      setWalletCoins(wallet);
    };
    loadStats();
    window.addEventListener("focus", loadStats);
    window.addEventListener("storage", loadStats);
    return () => {
      window.removeEventListener("focus", loadStats);
      window.removeEventListener("storage", loadStats);
    };
  }, []);
  const filteredGames = games.filter((game) => {
    const categoryMatch = active === "" || active === "All" || game.category === active;
    const searchMatch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });
  const updatedGames = filteredGames.map((game) => game.title === "Logic Maze" ? {
    ...game,
    progress: logicMazeStats.progress,
    coins: logicMazeStats.coins,
    time: logicMazeStats.time
  } : game);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[#dfeef7] text-gray-900 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Game Categories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mt-1", children: "Explore games by category and improve your skills." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 h-11 px-4 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200 shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow-500", children: "🪙" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-gray-800", children: walletCoins })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full lg:w-80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), placeholder: "Search games...", className: "w-full h-11 rounded-xl border border-gray-200 bg-white pl-10 pr-4 outline-none focus:border-blue-400" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-1", children: "Browse Categories" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mb-4", children: "Pick a path that matches your goals" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-x-auto pb-2 scrollbar-hide", children: topCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setActive(cat.title), className: `min-w-[180px] md:min-w-[220px] h-[110px] rounded-2xl p-5 text-white bg-gradient-to-br ${cat.color} shadow-md hover:scale-105 transition cursor-pointer flex flex-col justify-between`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-2", children: cat.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-base md:text-lg", children: cat.title })
      ] }, cat.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6", children: [
      updatedGames.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full text-center py-16 text-gray-500 text-lg font-medium", children: "No games found 🔍" }),
      updatedGames.map((game, i) => {
        const locked = game.locked;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: i * 0.05
        }, whileHover: !locked ? {
          y: -5
        } : {}, className: `rounded-3xl overflow-hidden border border-gray-200/60 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 ${!locked ? "hover:shadow-lg" : "opacity-75"}`, onClick: () => {
          if (game.title === "Logic Maze") {
            window.open("/logic_maze.html", "_blank");
          }
          if (game.title === "Brain Blast") {
            window.open("/brain_blast.html", "_blank");
          }
          if (game.title === "Trivia") {
            window.open("/trivia.html", "_blank");
          }
          if (game.title === "Zip") {
            window.open("/zip_master.html", "_blank");
          }
          if (game.title === "Stop Motion Studio") {
            window.open("/stop_motion.html", "_blank");
          }
          if (game.title === "Piano") {
            window.open("/piano.html", "_blank");
          }
          if (game.title === "Math Shop Game") {
            window.open("/math_shop_final.html", "_blank");
          }
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `h-32 relative bg-gradient-to-br ${game.accent} flex items-center justify-center`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl", children: game.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute top-3 left-3 text-[10px] px-2 py-1 rounded-md border font-semibold ${difficultyStyles[game.difficulty]}`, children: game.difficulty }),
            locked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center text-sm font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 mr-2" }),
              "Locked"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg text-gray-800", children: game.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Fun learning challenge game" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Progress" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  game.progress,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-gray-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all", style: {
                width: `${game.progress}%`
              } }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-gray-500 mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                "🪙 ",
                game.coins
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
                game.time
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: locked, className: `mt-4 w-full h-10 rounded-xl font-medium transition ${locked ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"}`, onClick: (e) => {
              e.stopPropagation();
              if (game.title === "Logic Maze") {
                window.open("/logic_maze.html", "_blank");
              }
              if (game.title === "Brain Blast") {
                window.open("/brain_blast.html", "_blank");
              }
              if (game.title === "Trivia") {
                window.open("/trivia.html", "_blank");
              }
              if (game.title === "Zip") {
                window.open("/zip_master.html", "_blank");
              }
              if (game.title === "Stop Motion Studio") {
                window.open("/stop_motion.html", "_blank");
              }
              if (game.title === "Piano") {
                window.open("/piano.html", "_blank");
              }
              if (game.title === "Math Shop Game") {
                window.open("/math_shop_final.html", "_blank");
              }
            }, children: locked ? "Locked" : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4 fill-current" }),
              "Play Now"
            ] }) })
          ] })
        ] }, game.title);
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "px-5 h-11 rounded-xl bg-white border border-gray-200 hover:border-blue-400 font-medium flex items-center gap-2", children: [
      "View More ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
    ] }) })
  ] }) });
}
export {
  CategoriesPage as component
};
