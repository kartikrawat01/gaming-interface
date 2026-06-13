import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Play,
  Lock,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/_layout/categories")({
  component: CategoriesPage,
});

type Difficulty = "Beginner" | "Intermediate" | "Advanced";

type Game = {
  title: string;
  icon: string;
  image?: string;
  category: string;
  difficulty: Difficulty;
  progress: number;
  locked?: boolean;
  accent: string;
};



const topCategories = [
  {
    title: "All",
    icon: "🧠",
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Maths",
    icon: "</>",
    color: "from-green-500 to-teal-500",
  },
  {
    title: "Science",
    icon: "🤖",
    color: "from-purple-500 to-violet-500",
  },
  {
    title: "Logic & Puzzles",
    icon: "🧩",
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Creative",
    icon: "⚡",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Language",
    icon: "👥",
    color: "from-pink-500 to-rose-500",
  },
  {
  title: "Memory & Speed",
  icon: "📊",
  color: "from-indigo-500 to-purple-500",
},
];

const games: Game[] = [
  {
    title: "Logic Maze",
    icon: "🧩",
    image: "/images/logic-maze.png",
    category: "Logic & Puzzles",
    difficulty: "Beginner",
    progress: 0,
    accent: "from-cyan-400/30 to-blue-500/20",
  },
  {
    title: "Brain Blast",
    icon: "➗",
    image: "/images/brain-blast.png",
    category: "Maths",
    difficulty: "Beginner",
    progress: 0,
    accent: "from-yellow-400/30 to-orange-400/20",
  },
  {
    title: "Trivia",
    icon: "🧪",
    image: "/images/trivia.png",
    category: "Science",
    difficulty: "Intermediate",
    progress: 0,
    accent: "from-green-400/30 to-emerald-500/20",
  },
  {
    title: "Zip",
    icon: "📚",
    image: "/images/zip-master.png",
    category: "Language",
    difficulty: "Beginner",
    progress: 0,
    accent: "from-pink-400/30 to-rose-500/20",
  },
  {
    title: "Stop Motion Studio",
    icon: "🎨",
    image: "/images/stop-motion.png",
    category: "Creative",
    difficulty: "Intermediate",
    progress: 0,
    accent: "from-violet-400/30 to-purple-500/20",
  },
  {
    title: "Piano",
    icon: "⚡",
    image: "/images/piano.png",
    category: "Memory & Speed",
    difficulty: "Advanced",
    progress: 0,
    accent: "from-indigo-400/30 to-sky-500/20",
  },
  {
    title: "Math Shop Game",
    icon: "🎯",
    image: "/images/math-shop.png",
    category: "Logic & Puzzles",
    difficulty: "Intermediate",
    progress: 0,
    accent: "from-blue-400/30 to-cyan-500/20",
  },
  {
    title: "Mini Sudoku",
    icon: "🚀",
    image: "/images/mini-suduko.png",
    category: "Science",
    difficulty: "Advanced",
    progress: 0,
    accent: "from-teal-400/30 to-green-500/20",
  },
  {
  title: "Match the Pairs",
  icon: "🃏",
  image: "/images/match-the-pairs.png",
  category: "Memory & Speed",
  difficulty: "Beginner",
  progress: 0,
  accent: "from-pink-400/30 to-purple-500/20",
},
{
  title: "Connect the Water Pipes",
  icon: "🚰",
  image: "/images/connect-pipes.png",
  category: "Logic & Puzzles",
  difficulty: "Beginner",
  progress: 0,
  accent: "from-cyan-400/30 to-blue-500/20",
},
{
  title: "Sort and Think",
  icon: "🧠",
  image: "/images/sort-and-think.png",
  category: "Logic & Puzzles",
  difficulty: "Beginner",
  progress: 0,
  accent: "from-amber-400/30 to-yellow-500/20",
},
{
  title: "Motor Boat",
  icon: "🚤",
  image: "/images/motor-boat.png",
  category: "Memory & Speed",
  difficulty: "Intermediate",
  progress: 0,
  accent: "from-sky-400/30 to-cyan-500/20",
},
{
  title: "Bubble Maths Challenge",
  icon: "🫧",
  image: "/images/bubble-maths.png",
  category: "Maths",
  difficulty: "Beginner",
  progress: 0,
  accent: "from-purple-400/30 to-pink-500/20",
},
];

const difficultyStyles = {
  Beginner: "bg-green-100 text-green-700 border-green-200",
  Intermediate: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Advanced: "bg-red-100 text-red-700 border-red-200",
};

function CategoriesPage() {
  const [active, setActive] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
const [gameProgress, setGameProgress] = useState<Record<string, number>>({
  "Logic Maze": 0,
  "Brain Blast": 0,
  "Trivia": 0,
  "Zip": 0,
  "Math Shop Game": 0,
  "Mini Sudoku": 0,
  "Match the Pairs": 0,
  "Connect the Water Pipes": 0,
    "Sort and Think": 0,
  "Motor Boat": 0,
  "Bubble Maths Challenge": 0,
});
useEffect(() => {
  const loadAllGameProgress = () => {
    const logicMazeCompleted =
      Number(localStorage.getItem("logicMazeCompleted")) || 0;

    const logicMazeProgress =
      Number(localStorage.getItem("logicMazeProgress")) ||
      logicMazeCompleted * 5 ||
      0;

    const brainBlastCompleted =
      Number(localStorage.getItem("brainBlastCompleted")) || 0;

    const brainBlastProgress =
      Number(localStorage.getItem("brainBlastProgress")) ||
      Math.round((brainBlastCompleted / 44) * 100) ||
      0;

    const triviaProgress =
      Number(localStorage.getItem("triviaProgress")) || 0;

    const zipCompleted =
      Number(localStorage.getItem("zipCompleted")) || 0;

    const zipProgress =
      Number(localStorage.getItem("zipProgress")) ||
      Math.round((zipCompleted / 25) * 100) ||
      0;

    const mathShopCompleted =
      Number(localStorage.getItem("mathShopCompleted")) || 0;

    const mathShopProgress =
      Number(localStorage.getItem("mathShopProgress")) ||
      Math.round((mathShopCompleted / 10) * 100) ||
      0;

    const sudokuCompleted =
      JSON.parse(
        localStorage.getItem("mini_sudoku_completed") || "[]"
      ).filter(Boolean).length;

    const sudokuProgress =
      Math.round((sudokuCompleted / 12) * 100);

    const memoryCardProgress =
      Number(localStorage.getItem("memoryCardProgress")) || 0;

      const pipesCompleted =
  Number(localStorage.getItem("pipesCompleted")) || 0;
      const pipesProgress =
  Number(localStorage.getItem("pipesProgress")) ||
  Math.round((pipesCompleted / 10) * 100) ||
  0;
  const sortCompleted =
  Number(localStorage.getItem("sortCompleted")) || 0;

const sortProgress =
  Number(localStorage.getItem("sortProgress")) ||
  Math.round((sortCompleted / 50) * 100) ||
  0;

const motorBoatCompleted =
  Number(localStorage.getItem("motorBoatCompleted")) || 0;

const motorBoatProgress =
  Number(localStorage.getItem("motorBoatProgress")) ||
  Math.round((motorBoatCompleted / 10) * 100) ||
  0;

const bubbleMathCompleted =
  Number(localStorage.getItem("bubbleMathCompleted")) || 0;

const bubbleMathProgress =
  Number(localStorage.getItem("bubbleMathProgress")) ||
  Math.round((bubbleMathCompleted / 25) * 100) ||
  0;
    setGameProgress({
      "Logic Maze": Math.min(logicMazeProgress, 100),
      "Brain Blast": Math.min(brainBlastProgress, 100),
      "Trivia": Math.min(triviaProgress, 100),
      "Zip": Math.min(zipProgress, 100),
      "Math Shop Game": Math.min(mathShopProgress, 100),
      "Mini Sudoku": Math.min(sudokuProgress, 100),
      "Match the Pairs": Math.min(memoryCardProgress, 100),
      "Connect the Water Pipes": Math.min(pipesProgress, 100),
      "Sort and Think": Math.min(sortProgress, 100),
"Motor Boat": Math.min(motorBoatProgress, 100),
"Bubble Maths Challenge": Math.min(bubbleMathProgress, 100),
    });
  };

  loadAllGameProgress();

  const handleGameMessage = (event: MessageEvent) => {
    if (!event.data) return;

    loadAllGameProgress();
  };

  window.addEventListener("focus", loadAllGameProgress);
  window.addEventListener("storage", loadAllGameProgress);
  window.addEventListener("message", handleGameMessage);

  return () => {
    window.removeEventListener("focus", loadAllGameProgress);
    window.removeEventListener("storage", loadAllGameProgress);
    window.removeEventListener("message", handleGameMessage);
  };
}, []);

  const filteredGames = games.filter((game) => {
  const categoryMatch =
    active === "" ||
    active === "All" ||
    game.category === active;

  const searchMatch =
    game.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  return categoryMatch && searchMatch;
});

const updatedGames = filteredGames.map((game) => ({
  ...game,
  progress: gameProgress[game.title] ?? game.progress,
}));

  return (
    <div className="min-h-screen bg-[#dfeef7] text-gray-900 px-3 py-4 sm:p-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Top Heading */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Game Categories</h1>
            <p className="text-gray-500 mt-1">
              Explore games by category and improve your skills.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">

  

  {/* Search */}
  <div className="relative w-full sm:max-w-md lg:w-80">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    <input
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search games..."
  className="w-full h-11 rounded-xl border border-gray-200 bg-white pl-10 pr-4 outline-none focus:border-blue-400"
/>
  </div>

</div>
        </div>

        {/* Top Categories */}
<div className="mb-10">
  <h2 className="text-xl font-semibold mb-1">Browse Categories</h2>
  <p className="text-gray-500 text-sm mb-4">
    Pick a path that matches your goals
  </p>

  <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
    {topCategories.map((cat) => (
      <div
  key={cat.title}
  onClick={() => setActive(cat.title)}
  className={`min-w-[135px] sm:min-w-[180px] md:min-w-[220px] h-[92px] sm:h-[110px] rounded-2xl p-4 sm:p-5 text-white bg-gradient-to-br ${cat.color} shadow-md active:scale-95 sm:hover:scale-105 transition cursor-pointer flex flex-col justify-between`}
>
        <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{cat.icon}</div>

<h3 className="font-semibold text-sm sm:text-base md:text-lg leading-tight">
  {cat.title}
</h3>

      </div>
    ))}
  </div>
</div>

        {/* Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
  {updatedGames.length === 0 && (
    <div className="col-span-full text-center py-16 text-gray-500 text-lg font-medium">
      No games found 🔍
    </div>
  )}
          {updatedGames.map((game, i) => {
            const locked = game.locked;

            return (
              <motion.div
                key={game.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={!locked ? { y: -5 } : {}}
                className={`rounded-3xl overflow-hidden border border-gray-200/60 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 ${
                  !locked ? "hover:shadow-lg" : "opacity-75"
                }`}
onClick={() => {
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
  if (game.title === "Mini Sudoku") {
  window.open("/suduko.html", "_blank");
}
if (game.title === "Match the Pairs") {
  window.open("/card2.html", "_blank");
}
if (game.title === "Connect the Water Pipes") {
  window.open("/pipes.html", "_blank");
}
if (game.title === "Sort and Think") {
  window.open("/sort2.html", "_blank");
}

if (game.title === "Motor Boat") {
  window.open("/motor_boat.html", "_blank");
}

if (game.title === "Bubble Maths Challenge") {
  window.open("/bubble_math_challenge.html", "_blank");
}
}}
              >
                {/* Top */}
                <div className={`h-40 sm:h-48 relative bg-gradient-to-br ${game.accent} overflow-hidden`}>
  {game.image ? (
    <img
      src={game.image}
      alt={game.title}
      className="h-full w-full object-cover object-center"
    />
  ) : (
    <div className="h-full w-full flex items-center justify-center text-5xl">
      {game.icon}
    </div>
  )}

                  {locked && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center text-sm font-semibold">
                      <Lock className="h-4 w-4 mr-2" />
                      Locked
                    </div>
                  )}
                </div>
               
               
                {/* Bottom */}
                <div className="p-4 sm:p-5">
                  <h3 className="font-semibold text-base sm:text-lg text-gray-800 leading-tight line-clamp-2">
  {game.title}
</h3>
              

                  {/* Progress */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{game.progress}%</span>
                    </div>

                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
  className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all"
  style={{ width: `${game.progress}%` }}
/>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    disabled={locked}
                    className={`mt-4 w-full h-10 sm:h-11 rounded-xl font-medium transition ${
                      locked
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                    }`}
onClick={(e) => {
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
if (game.title === "Mini Sudoku") {
    window.open("/suduko.html", "_blank");
  }
  if (game.title === "Match the Pairs") {
    window.open("/card2.html", "_blank");
  }
  if (game.title === "Connect the Water Pipes") {
  window.open("/pipes.html", "_blank");
}
if (game.title === "Sort and Think") {
  window.open("/sort2.html", "_blank");
}

if (game.title === "Motor Boat") {
  window.open("/motor_boat.html", "_blank");
}

if (game.title === "Bubble Maths Challenge") {
  window.open("/bubble_math_challenge.html", "_blank");
}
}}
                  >
                    {locked ? "Locked" : (
                      <span className="flex items-center justify-center gap-2">
                        <Play className="h-4 w-4 fill-current" />
                        Play Now
                      </span>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom */}
        <div className="mt-10 flex justify-center">
          <button className="px-5 h-11 rounded-xl bg-white border border-gray-200 hover:border-blue-400 font-medium flex items-center gap-2">
            View More <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}