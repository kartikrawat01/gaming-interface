import {
  createFileRoute,
  Link
} from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "../../supabaseClient"; // path check kar lena
import { AuthModal } from '../../components/ui/AuthModal';
import {
  useWallet
} from "../../context/WalletContext";
import {
  LayoutDashboard,
  Gamepad2,
  Settings,
  Search,
  Bell,
  Flame,
  Play,
  Lock,
  Clock,
  Zap,
  Code2,
  Menu,
  Info,
  X,
  ChevronRight,
  Target,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
});

type Difficulty = "Beginner" | "Intermediate" | "Advanced";

type Game = {
  title: string;
  icon: string;
  image?: string;
  difficulty: Difficulty;
  progress: number;
  xp: number;
  time: string;
  locked?: boolean;
  accent: string;
};

const games: Game[] = [
  { title: "Logic Maze", icon: "🧩", image: "/images/logic-maze.webp", difficulty: "Beginner", progress: 0, xp: 120, time: "10 min", accent: "from-secondary/30 to-primary/10" },
  { title: "Brain Blast", icon: "🔁", image: "/images/brain-blast.webp", difficulty: "Intermediate", progress: 0, xp: 150, time: "12 min", accent: "from-indigo-500/20 to-indigo-500/5" },
  { title: "Trivia", icon: "🐛", image: "/images/trivia.webp",difficulty: "Intermediate", progress: 30, xp: 220, time: "18 min", accent: "from-violet-500/20 to-violet-500/5" },
  { title: "Zip", icon: "⚔️", image: "/images/zip-master.webp", difficulty: "Intermediate", progress: 0, xp: 240, time: "20 min", accent: "from-emerald-500/20 to-emerald-500/5" },
  { title: "Stop Motion Studio",image: "/images/stop-motion.webp", icon: "📦", difficulty: "Beginner", progress: 88, xp: 130, time: "8 min", accent: "from-secondary/30 to-primary/10" },
  { title: "Piano", icon: "🎯",image: "/images/piano.webp", difficulty: "Intermediate", progress: 12, xp: 260, time: "22 min", accent: "from-indigo-500/20 to-indigo-500/5" },
  { title: "Math Shop Game", icon: "⚡", image: "/images/math-shop.webp",difficulty: "Advanced", progress: 0, xp: 380, time: "30 min", accent: "from-rose-500/20 to-rose-500/5" },
  { title: "Mini Sudoku", icon: "🤖", image: "/images/mini-suduko.webp",difficulty: "Advanced", progress: 0, xp: 420, time: "35 min", accent: "from-violet-500/20 to-violet-500/5" },
  {
  title: "Match the Pairs",
  icon: "🃏",
  image: "/images/match-the-pairs.webp",
  difficulty: "Beginner",
  progress: 0,
  xp: 150,
  time: "10 min",
  accent: "from-pink-500/20 to-purple-500/5"
},
{
  title: "Connect the Water Pipes",
  icon: "🚰",
  image: "/images/connect-pipes.webp",
  difficulty: "Beginner",
  progress: 0,
  xp: 180,
  time: "12 min",
  accent: "from-cyan-500/20 to-blue-500/5"
},
{
  title: "Sort and Think",
  icon: "🧠",
  image: "/images/sort-and-think.webp",
  difficulty: "Beginner",
  progress: 0,
  xp: 150,
  time: "10 min",
  accent: "from-amber-500/20 to-yellow-500/5"
},
{
  title: "Motor Boat",
  icon: "🚤",
  image: "/images/motor-boat.webp",
  difficulty: "Intermediate",
  progress: 0,
  xp: 180,
  time: "12 min",
  accent: "from-sky-500/20 to-cyan-500/5"
},
{
  title: "Bubble Maths Challenge",
  icon: "🫧",
  image: "/images/bubble-maths.webp",
  difficulty: "Beginner",
  progress: 0,
  xp: 170,
  time: "10 min",
  accent: "from-purple-500/20 to-pink-500/5"
},
{
  title: "Smart Traffic Controller",
  icon: "🚦",
  image: "/images/smart-traffic.webp",
  difficulty: "Intermediate",
  progress: 0,
  xp: 180,
  time: "12 min",
  accent: "from-red-500/20 to-yellow-500/5"
},
{
  title: "Water Color Sort Puzzle",
  icon: "🧪",
  image: "/images/water-color-sort.webp",
  difficulty: "Beginner",
  progress: 0,
  xp: 160,
  time: "10 min",
  accent: "from-blue-500/20 to-cyan-500/5"
},
{
  title: "Help The Bee",
  icon: "🐝",
  image: "/images/bee2.webp",
  difficulty: "Beginner",
  progress: 0,
  xp: 160,
  time: "10 min",
  accent: "from-yellow-500/20 to-amber-500/5"
},
{
  title: "Sequence Builder",
  icon: "🧩",
  image: "/images/sequence2.webp",
  difficulty: "Beginner",
  progress: 0,
  xp: 170,
  time: "10 min",
  accent: "from-orange-500/20 to-pink-500/5"
},
{
  title: "Emoji Decoder",
  icon: "😀",
  image: "/images/emoji.webp",
  difficulty: "Beginner",
  progress: 0,
  xp: 160,
  time: "10 min",
  accent: "from-pink-500/20 to-yellow-500/5"
},
{
  title: "Fact Flash",
  icon: "⚡",
  image: "/images/factcards.webp",
  difficulty: "Beginner",
  progress: 0,
  xp: 160,
  time: "10 min",
  accent: "from-blue-500/20 to-indigo-500/5"
},
{
  title: "Pattern Prophet",
  icon: "🔮",
  image: "/images/pattern2.webp",
  difficulty: "Beginner",
  progress: 0,
  xp: 170,
  time: "10 min",
  accent: "from-purple-500/20 to-pink-500/5"
},
{
  title: "Sentence Surgeon",
  icon: "🩺",
  image: "/images/sentence-surgeon.webp",
  difficulty: "Beginner",
  progress: 0,
  xp: 170,
  time: "10 min",
  accent: "from-green-500/20 to-emerald-500/5"
},
];

// const sidebarItems = [
//   { label: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
//   { label: "Categories", icon: Gamepad2, key: "categories" },
//   { label: "Progress", icon: TrendingUp, key: "progress" },
//   { label: "Leaderboard", icon: Trophy, key: "leaderboard" },
//   { label: "Achievements", icon: Award, key: "achievements" },
//   { label: "Settings", icon: Settings, key: "settings" },
// ];

const difficultyStyles: Record<Difficulty, string> = {
  Beginner: "bg-success/20 text-success border-success/30",
  Intermediate: "bg-warning/20 text-warning border-warning/30",
  Advanced: "bg-danger/20 text-danger border-danger/30",
};

function Dashboard() {
  console.count("DASHBOARD_RENDER");
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");
  const [user, setUser] = useState<any>(null);
const [showAuth, setShowAuth] = useState(false);
const [currentStreak, setCurrentStreak] = useState(0);
const [streakBonusPopup, setStreakBonusPopup] = useState<any>(null);
  // ADD THIS
const sessionTimerRef = useRef<any>(null);

useEffect(() => {
const handleUnload = async () => {

  const sessionId =
    localStorage.getItem('platformSessionId');

  if (!sessionId) return;

  const session =
    await supabase.auth.getSession();

  const token =
    session.data.session?.access_token;

  if (token) {

    navigator.sendBeacon(
      'https://wallet-api-backend-production.up.railway.app/session/end',
      JSON.stringify({
        sessionId,
      })
    );
  }

  localStorage.removeItem('platformSessionId');
};
  supabase.auth.getUser().then(({ data }) => {

    setUser(data.user);
//     supabase.auth.getSession().then(({ data }) => {

//   console.log("ACCESS TOKEN:", data.session?.access_token);
// });
  });

  const { data: listener } = supabase.auth.onAuthStateChange(
  (_event, session) => {

    setUser(session?.user || null);

    // SIGN OUT
    if (_event === "SIGNED_OUT") {

  setUser(null);
  setWalletCoins(0);
  setCurrentStreak(0);

  localStorage.removeItem("platformSessionId");
  localStorage.removeItem("sessionRewardGiven");
  localStorage.removeItem("walletCoins");

  return;
}

    // ONLY LOGIN EVENTS
    if (_event !== "SIGNED_IN") {
      return;
    }

    if (!session?.user) {
      return;
    }

    // IMPORTANT:
    // move async logic outside auth callback
    setTimeout(async () => {

      try {

        localStorage.setItem(
          "user_id",
          session.user.id
        );

        // DAILY LOGIN REWARD
        try {

          const rewardResponse = await fetch(
            "https://wallet-api-backend-production.up.railway.app/wallet/daily-login",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${session.access_token}`,
                "Content-Type": "application/json",
              },
            }
          );

          const rewardData =
            await rewardResponse.json();

          console.log(
            "Daily login reward:",
            rewardData
          );
          if (rewardData?.streak?.currentStreak) {
  setCurrentStreak(Number(rewardData.streak.currentStreak));
}

if (rewardData?.streakBonus) {
  setStreakBonusPopup(rewardData.streakBonus);

  await fetchWallet();

  setTimeout(() => {
    setStreakBonusPopup(null);
  }, 5000);
}
          await fetchLoginStreak();

        } catch (err) {

          console.error(
            "Daily login failed:",
            err
          );
        }

        // EXISTING SESSION CHECK
        const existingSession =
          localStorage.getItem(
            "platformSessionId"
          );

        if (existingSession) {

          console.log(
            "Session already active:",
            existingSession
          );

          return;
        }

        // START SESSION
        const response = await fetch(
          "https://wallet-api-backend-production.up.railway.app/session/start",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session.access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data =
          await response.json();

        console.log(
          "Platform Session Started:",
          data
        );

        localStorage.setItem(
          "platformSessionId",
          data.session.id
        );

        localStorage.removeItem(
          "sessionRewardGiven"
        );

        // AUTO END SESSION
        const timer = setTimeout(
          async () => {

            try {

              const currentSessionId =
                localStorage.getItem(
                  "platformSessionId"
                );

              if (!currentSessionId) {
                return;
              }

              const currentSession =
                await supabase.auth.getSession();

              const token =
                currentSession.data.session
                  ?.access_token;

              if (!token) {
                return;
              }

              const res = await fetch(
                "https://wallet-api-backend-production.up.railway.app/session/end",
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    sessionId: currentSessionId,
                  }),
                }
              );

              const result =
                await res.json();

              console.log(
                "Session auto ended:",
                result
              );

              localStorage.removeItem(
                "platformSessionId"
              );

              localStorage.removeItem(
                "sessionRewardGiven"
              );

              fetchWallet();

            } catch (err) {

              console.error(
                "Auto session end failed:",
                err
              );
            }

          },
          30 * 60 * 1000
        );

        sessionTimerRef.current = timer;

      } catch (err) {

        console.error(
          "Session start failed:",
          err
        );
      }

    }, 0);
  }
);
  return () => {

  listener.subscription.unsubscribe();

  window.removeEventListener(
    'beforeunload',
    handleUnload
  );

  if (sessionTimerRef.current) {
  clearTimeout(sessionTimerRef.current);
}
};
}, []);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logicMazeStats, setLogicMazeStats] = useState({
  progress: 0,
  coins: 0,
  completed: 0,
  time: "0 min",
  });
  const [brainBlastStats, setBrainBlastStats] = useState({
  progress: 0,
  coins: 0,
  completed: 0,
  time: "0 min",
});
const [triviaStats, setTriviaStats] = useState({
  progress: 0,
  coins: 0,
  completed: 0,
  time: "0 min",
});
const [zipStats, setZipStats] = useState({
  progress: 0,
  coins: 0,
  completed: 0,
  time: "0 min",
});
const [mathShopStats, setMathShopStats] = useState({
  progress: 0,
  coins: 0,
  completed: 0,
  time: "0 min",
});
const [sudokuStats, setSudokuStats] = useState({
  progress: 0,
  coins: 0,
  completed: 0,
  time: "0 min",
});
const [memoryCardStats, setMemoryCardStats] = useState({
  progress: 0,
  coins: 0,
  completed: 0,
  time: "0 min",
});
const [pipesStats, setPipesStats] = useState({
  progress: 0,
  coins: 0,
  completed: 0,
  time: "0 min",
});
const [sortStats, setSortStats] = useState({
  progress: 0,
  coins: 0,
  completed: 0,
  time: "0 min",
});

const [motorBoatStats, setMotorBoatStats] = useState({
  progress: 0,
  coins: 0,
  completed: 0,
  time: "0 min",
});

const [bubbleMathStats, setBubbleMathStats] = useState({
  progress: 0,
  coins: 0,
  completed: 0,
  time: "0 min",
});

const [beeStats, setBeeStats] = useState({
  progress: 0,
  coins: 0,
  completed: 0,
  time: "0 min",
});

const [colorSortStats, setColorSortStats] = useState({
  progress: 0,
  coins: 0,
  completed: 0,
  time: "0 min",
});

const [trafficStats, setTrafficStats] = useState({
  progress: 0,
  coins: 0,
  completed: 0,
  time: "0 min",
});

const [sequenceBuilderStats, setSequenceBuilderStats] = useState({
  progress: 0,
  coins: 0,
  completed: 0,
  time: "0 min",
});

const [emojiDecoderStats, setEmojiDecoderStats] = useState({
  progress: 0,
  coins: 0,
  completed: 0,
  time: "0 min",
});

const [patternProphetStats, setPatternProphetStats] = useState({
  progress: 0,
  coins: 0,
  completed: 0,
  time: "0 min",
});

const [sentenceSurgeonStats, setSentenceSurgeonStats] = useState({
  progress: 0,
  coins: 0,
  completed: 0,
  time: "0 min",
});



  const {
  coins: walletCoins,
  setCoins: setWalletCoins,
  connectWalletSocket,
} = useWallet();

    useEffect(() => {

  if (!user?.id) return;

  connectWalletSocket(user.id);

}, [user?.id]);

useEffect(() => {
  if (user) return;

  const loginPopupTimer = setTimeout(() => {
    setShowAuth(true);
  }, 5 * 60 * 1000);

  return () => {
    clearTimeout(loginPopupTimer);
  };
}, [user]);
  const [searchTerm, setSearchTerm] = useState("");
//   const start2MinRewardTimer = async () => {

//   console.log("2 min timer started");

//   setTimeout(async () => {

//     try {

//       const rewarded =
//         localStorage.getItem(
//           'sessionRewardGiven'
//         );

//       if (rewarded === 'true') {
//         console.log("Already rewarded");
//         return;
//       }

//       const currentSessionId =
//         localStorage.getItem(
//           'platformSessionId'
//         );

//       if (!currentSessionId) {
//         console.log("No session found");
//         return;
//       }

//       const session =
//         await supabase.auth.getSession();

//       const token =
//         session.data.session
//         ?.access_token;

//       if (!token) {
//         console.log("No token");
//         return;
//       }

//       console.log("Calling reward API...");

//       const rewardRes = await fetch(
//         'https://wallet-api-backend-production.up.railway.app/wallet/earn/event',
//         {
//           method: 'POST',

//           headers: {
//             Authorization:
//               `Bearer ${token}`,

//             'Content-Type':
//               'application/json',
//           },

//           body: JSON.stringify({
//             amount: 10,
//             description:
//               '2 minute session reward',
//           }),
//         }
//       );

//       const rewardData =
//         await rewardRes.json();

//       console.log(
//         '2 min reward success:',
//         rewardData
//       );

//       localStorage.setItem(
//         'sessionRewardGiven',
//         'true'
//       );

//       // ✅ instant UI update
//       setWalletCoins(
//         Number(rewardData.balance) || 0
//       );

//       // ✅ backend sync
//       fetchWallet();

//     } catch (err) {

//       console.error(
//         '2 min reward failed:',
//         err
//       );
//     }

//   }, 2 * 60 * 1000);
// };
const updateWalletFromGame = async (coins: number, level?: number) => {
  try {
    console.log("Updating wallet...");
    console.log("Coins:", coins);

    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    if (!token) return;

    const res = await fetch("https://wallet-api-backend-production.up.railway.app/wallet/earn/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: coins,
        description: "Game reward",
        level,
      }),
    });

    const data = await res.json();

console.log("Wallet API Response:", data);

setWalletCoins(Number(data.balance) || 0);

    // ✅ backup sync from backend
    fetchWallet();

  } catch (err) {
    console.error("Wallet update failed:", err);
  }
};

const fetchWallet = async () => {
  try {

    const session =
      await supabase.auth.getSession();

    const token =
      session.data.session?.access_token;

    if (!token) {
      return;
    }

    const res = await fetch(
      "https://wallet-api-backend-production.up.railway.app/wallet/balance",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    setWalletCoins(
      Number(data.balance) || 0
    );

  } catch (err) {

    console.error(
      "Fetch wallet failed:",
      err
    );
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

/*
  useEffect(() => {
  const loadStats = () => {
    const progress = Number(localStorage.getItem("logicMazeProgress")) || 0;
    const coins = Number(localStorage.getItem("logicMazeCoins")) || 0;
    const completed = Number(localStorage.getItem("logicMazeCompleted")) || 0;
    const time = Number(localStorage.getItem("logicMazeTime")) || 0;
    const bbProgress = Number(localStorage.getItem("brainBlastProgress")) || 0;
const bbCoins = Number(localStorage.getItem("brainBlastCoins")) || 0;
const bbCompleted = Number(localStorage.getItem("brainBlastCompleted")) || 0;
const bbTime = Number(localStorage.getItem("brainBlastTime")) || 0;
const triviaProgress = Number(localStorage.getItem("triviaProgress")) || 0;
const triviaCoins = Number(localStorage.getItem("triviaCoins")) || 0;
const triviaCompleted = Number(localStorage.getItem("triviaCompleted")) || 0;
const triviaTime = Number(localStorage.getItem("triviaTime")) || 0;
const zipProgress = Number(localStorage.getItem("zipProgress")) || 0;
const zipCoins = Number(localStorage.getItem("zipCoins")) || 0;
const zipCompleted = Number(localStorage.getItem("zipCompleted")) || 0;
const zipTime = Number(localStorage.getItem("zipTime")) || 0;

    setLogicMazeStats({
      progress,
      coins,
      completed,
      time: `${time} min`,
    });
    setBrainBlastStats({
  progress: bbProgress,
  coins: bbCoins,
  completed: bbCompleted,
  time: `${bbTime} min`,
});


setTriviaStats({
  progress: triviaProgress,
  coins: triviaCoins,
  completed: triviaCompleted,
  time: `${triviaTime} min`,
});
setZipStats({
  progress: zipProgress,
  coins: zipCoins,
  completed: zipCompleted,
  time: `${zipTime} min`,
});
  };

  loadStats();

  window.addEventListener("focus", loadStats);
  // window.addEventListener("storage", loadStats);

  const handleMessage = (event: MessageEvent) => {
    if (event.data.type === "GAME_REWARD") {
  console.log("Reward received:", event.data);

  updateWalletFromGame(
    Number(event.data.coins || 0),
    event.data.level
  );
}
  if (event.data) {

  // LOGIC MAZE
  if (event.data.type === "GAME_PROGRESS_UPDATE") {
    setLogicMazeStats({
      progress: event.data.progress,
      coins: event.data.coins,
      completed: event.data.completed || 0,
      time: `${event.data.time} min`,
    });
  }

  // BRAIN BLAST
  if (event.data.type === "BRAIN_BLAST_UPDATE") {
    setBrainBlastStats({
      progress: event.data.progress,
      coins: event.data.coins,
      completed: event.data.completed || 0,
      time: `${event.data.time} min`,
    });
  }

  if (event.data.type === "TRIVIA_UPDATE") {
  setTriviaStats({
    progress: event.data.progress,
    coins: event.data.coins,
    completed: event.data.completed || 0,
    time: `${event.data.time} min`,
  });
}
  // ZIP MASTER (NEW)
if (event.data.type === "ZIP_MASTER_UPDATE") {
  const data = event.data.payload;

  setZipStats({
    progress: (data.stars.filter((s: number) => s > 0).length / 25) * 100,
    coins: data.coins,
    completed: data.stars.filter((s: number) => s > 0).length,
    time: `${data.time || 0} min`,
  });
  fetchWallet();
  
}
}
  };

  window.addEventListener("message", handleMessage);

  return () => {
    window.removeEventListener("focus", loadStats);
    // window.removeEventListener("storage", loadStats);
    window.removeEventListener("message", handleMessage);
  };
}, []);*/
useEffect(() => {

  if (!user) return;

  fetchWallet();
  fetchLoginStreak();

}, [user]);

useEffect(() => {
  const loadLogicMazeProgress = () => {
    const completed =
      Number(localStorage.getItem("logicMazeCompleted")) || 0;

    const progress =
      Number(localStorage.getItem("logicMazeProgress")) ||
      completed * 5 ||
      0;

    setLogicMazeStats((prev) => ({
      ...prev,
      progress: Math.min(progress, 100),
      completed,
    }));
  };

  loadLogicMazeProgress();

  window.addEventListener("focus", loadLogicMazeProgress);
  window.addEventListener("storage", loadLogicMazeProgress);

  return () => {
    window.removeEventListener("focus", loadLogicMazeProgress);
    window.removeEventListener("storage", loadLogicMazeProgress);
  };
}, []);

useEffect(() => {
  const loadBrainBlastProgress = () => {
    const completed =
      Number(localStorage.getItem("brainBlastCompleted")) || 0;

    const progress =
      Number(localStorage.getItem("brainBlastProgress")) ||
      Math.round((completed / 44) * 100) ||
      0;

    setBrainBlastStats((prev) => ({
      ...prev,
      progress: Math.min(progress, 100),
      completed,
    }));
  };

  loadBrainBlastProgress();

  const handleBrainBlastMessage = (event: MessageEvent) => {
    if (event.data?.type === "BRAIN_BLAST_UPDATE") {
      setBrainBlastStats((prev) => ({
        ...prev,
        progress: Math.min(Number(event.data.progress) || 0, 100),
        completed: Number(event.data.completed) || 0,
        coins: Number(event.data.coins) || prev.coins,
        time: `${event.data.time || 0} min`,
      }));
    }
  };

  window.addEventListener("focus", loadBrainBlastProgress);
  window.addEventListener("storage", loadBrainBlastProgress);
  window.addEventListener("message", handleBrainBlastMessage);

  return () => {
    window.removeEventListener("focus", loadBrainBlastProgress);
    window.removeEventListener("storage", loadBrainBlastProgress);
    window.removeEventListener("message", handleBrainBlastMessage);
  };
}, []);

useEffect(() => {
  const loadZipProgress = () => {
    const completed =
      Number(localStorage.getItem("zipCompleted")) || 0;

    const progress =
      Number(localStorage.getItem("zipProgress")) ||
      Math.round((completed / 25) * 100) ||
      0;

    setZipStats((prev) => ({
      ...prev,
      progress: Math.min(progress, 100),
      completed,
    }));
  };

  loadZipProgress();

  const handleZipMessage = (event: MessageEvent) => {
    if (event.data?.type === "ZIP_MASTER_UPDATE") {
      const data = event.data.payload;

      setZipStats((prev) => ({
        ...prev,
        progress: Math.min(Number(data.progress) || 0, 100),
        completed: Number(data.completed) || 0,
        coins: Number(data.coins) || prev.coins,
        time: `${data.time || 0} min`,
      }));
    }
  };

  window.addEventListener("focus", loadZipProgress);
  window.addEventListener("storage", loadZipProgress);
  window.addEventListener("message", handleZipMessage);

  return () => {
    window.removeEventListener("focus", loadZipProgress);
    window.removeEventListener("storage", loadZipProgress);
    window.removeEventListener("message", handleZipMessage);
  };
}, []);

useEffect(() => {
  const loadMathShopProgress = () => {
    const completed =
      Number(localStorage.getItem("mathShopCompleted")) || 0;

    const progress =
      Number(localStorage.getItem("mathShopProgress")) ||
      Math.round((completed / 10) * 100) ||
      0;

    setMathShopStats((prev) => ({
      ...prev,
      progress: Math.min(progress, 100),
      completed,
    }));
  };

  loadMathShopProgress();

  const handleMathShopMessage = (event: MessageEvent) => {
    if (event.data?.type === "MATH_SHOP_UPDATE") {
      setMathShopStats((prev) => ({
        ...prev,
        progress: Math.min(Number(event.data.progress) || 0, 100),
        completed: Number(event.data.completed) || 0,
        coins: Number(event.data.coins) || prev.coins,
      }));
    }
  };

  window.addEventListener("focus", loadMathShopProgress);
  window.addEventListener("storage", loadMathShopProgress);
  window.addEventListener("message", handleMathShopMessage);

  return () => {
    window.removeEventListener("focus", loadMathShopProgress);
    window.removeEventListener("storage", loadMathShopProgress);
    window.removeEventListener("message", handleMathShopMessage);
  };
}, []);

useEffect(() => {
  const loadTriviaProgress = () => {
    const progress =
      Number(localStorage.getItem("triviaProgress")) || 0;

    const completed =
      Number(localStorage.getItem("triviaCompleted")) || progress || 0;

    setTriviaStats((prev) => ({
      ...prev,
      progress: Math.min(progress, 100),
      completed,
    }));
  };

  loadTriviaProgress();

  const handleTriviaMessage = (event: MessageEvent) => {
    if (event.data?.type === "TRIVIA_UPDATE") {
      setTriviaStats((prev) => ({
        ...prev,
        progress: Math.min(Number(event.data.progress) || 0, 100),
        completed: Number(event.data.completed) || 0,
        coins: Number(event.data.coins) || prev.coins,
        time: `${event.data.time || 0} min`,
      }));
    }
  };

  window.addEventListener("focus", loadTriviaProgress);
  window.addEventListener("storage", loadTriviaProgress);
  window.addEventListener("message", handleTriviaMessage);

  return () => {
    window.removeEventListener("focus", loadTriviaProgress);
    window.removeEventListener("storage", loadTriviaProgress);
    window.removeEventListener("message", handleTriviaMessage);
  };
}, []);

useEffect(() => {
  const loadSudokuProgress = () => {

    const completedLevels =
      JSON.parse(
        localStorage.getItem("mini_sudoku_completed") || "[]"
      ).filter(Boolean).length;

    const progress =
      Math.round((completedLevels / 12) * 100);

    setSudokuStats((prev) => ({
      ...prev,
      progress,
      completed: completedLevels,
    }));
  };

  loadSudokuProgress();

  const handleSudokuMessage = (
    event: MessageEvent
  ) => {

    if (
      event.data?.type === "GAME_PROGRESS_UPDATE" &&
      event.data?.game === "mini_sudoku"
    ) {

      setSudokuStats((prev) => ({
        ...prev,
        progress:
          Number(event.data.progress) || 0,

        completed:
          Number(event.data.completedLevels) || 0,

        coins:
          Number(event.data.coins) ||
          prev.coins,
      }));
    }
  };

  window.addEventListener(
    "focus",
    loadSudokuProgress
  );

  window.addEventListener(
    "storage",
    loadSudokuProgress
  );

  window.addEventListener(
    "message",
    handleSudokuMessage
  );

  return () => {

    window.removeEventListener(
      "focus",
      loadSudokuProgress
    );

    window.removeEventListener(
      "storage",
      loadSudokuProgress
    );

    window.removeEventListener(
      "message",
      handleSudokuMessage
    );
  };

}, []);

useEffect(() => {

  const loadMemoryCardProgress = () => {

    const progress =
      Number(localStorage.getItem("memoryCardProgress")) || 0;

    const completed =
      Number(localStorage.getItem("memoryCardCompleted")) || 0;

    setMemoryCardStats((prev) => ({
      ...prev,
      progress,
      completed,
    }));
  };

  loadMemoryCardProgress();

  const handleMemoryCardMessage = (
    event: MessageEvent
  ) => {

    if (
      event.data?.type === "GAME_PROGRESS_UPDATE" &&
      event.data?.game === "memory_card"
    ) {

      setMemoryCardStats((prev) => ({
        ...prev,
        progress:
          Number(event.data.progress) || 0,

        completed:
          Number(event.data.completed) || 0,

        coins:
          Number(event.data.coins) ||
          prev.coins,
      }));
    }
  };

  window.addEventListener(
    "focus",
    loadMemoryCardProgress
  );

  window.addEventListener(
    "storage",
    loadMemoryCardProgress
  );

  window.addEventListener(
    "message",
    handleMemoryCardMessage
  );

  return () => {

    window.removeEventListener(
      "focus",
      loadMemoryCardProgress
    );

    window.removeEventListener(
      "storage",
      loadMemoryCardProgress
    );

    window.removeEventListener(
      "message",
      handleMemoryCardMessage
    );
  };

}, []);

useEffect(() => {
  const loadPipesProgress = () => {
    const completed =
      Number(localStorage.getItem("pipesCompleted")) || 0;

    const progress =
      Number(localStorage.getItem("pipesProgress")) ||
      Math.round((completed / 10) * 100) ||
      0;

    setPipesStats((prev) => ({
      ...prev,
      progress: Math.min(progress, 100),
      completed,
    }));
  };

  loadPipesProgress();

  const handlePipesMessage = (event: MessageEvent) => {
    if (
      event.data?.type === "GAME_PROGRESS_UPDATE" &&
      event.data?.game === "pipes"
    ) {
      setPipesStats((prev) => ({
        ...prev,
        progress: Number(event.data.progress) || 0,
        completed: Number(event.data.completed) || 0,
        coins: Number(event.data.coins) || prev.coins,
        time: `${event.data.time || 0} min`,
      }));
    }
  };

  window.addEventListener("focus", loadPipesProgress);
  window.addEventListener("storage", loadPipesProgress);
  window.addEventListener("message", handlePipesMessage);

  return () => {
    window.removeEventListener("focus", loadPipesProgress);
    window.removeEventListener("storage", loadPipesProgress);
    window.removeEventListener("message", handlePipesMessage);
  };
}, []);

useEffect(() => {
  const loadBubbleMathProgress = () => {
    const completed =
      Number(localStorage.getItem("bubbleMathCompleted")) || 0;

    const progress =
      Number(localStorage.getItem("bubbleMathProgress")) ||
      Math.round((completed / 25) * 100) ||
      0;

    setBubbleMathStats((prev) => ({
      ...prev,
      progress: Math.min(progress, 100),
      completed,
    }));
  };

  loadBubbleMathProgress();

  const handleBubbleMathMessage = (event: MessageEvent) => {
    if (
      event.data?.type === "GAME_PROGRESS_UPDATE" &&
      event.data?.game === "bubble_math"
    ) {
      setBubbleMathStats((prev) => ({
        ...prev,
        progress: Math.min(Number(event.data.progress) || 0, 100),
        completed: Number(event.data.completed) || 0,
        coins: Number(event.data.coins) || prev.coins,
        time: `${event.data.time || 0} min`,
      }));
    }
  };

  window.addEventListener("focus", loadBubbleMathProgress);
  window.addEventListener("storage", loadBubbleMathProgress);
  window.addEventListener("message", handleBubbleMathMessage);

  return () => {
    window.removeEventListener("focus", loadBubbleMathProgress);
    window.removeEventListener("storage", loadBubbleMathProgress);
    window.removeEventListener("message", handleBubbleMathMessage);
  };
}, []);
useEffect(() => {
  const loadMotorBoatProgress = () => {
    const completed =
      Number(localStorage.getItem("motorBoatCompleted")) || 0;

    const progress =
      Number(localStorage.getItem("motorBoatProgress")) ||
      Math.round((completed / 19) * 100) ||
      0;

    setMotorBoatStats((prev) => ({
      ...prev,
      progress: Math.min(progress, 100),
      completed,
    }));
  };

  loadMotorBoatProgress();

  const handleMotorBoatMessage = (event: MessageEvent) => {
    if (
      event.data?.type === "GAME_PROGRESS_UPDATE" &&
      event.data?.game === "motor_boat"
    ) {
      setMotorBoatStats((prev) => ({
        ...prev,
        progress: Math.min(Number(event.data.progress) || 0, 100),
        completed: Number(event.data.completed) || 0,
        coins: Number(event.data.coins) || prev.coins,
        time: `${event.data.time || 0} min`,
      }));
    }
  };

  window.addEventListener("focus", loadMotorBoatProgress);
  window.addEventListener("storage", loadMotorBoatProgress);
  window.addEventListener("message", handleMotorBoatMessage);

  return () => {
    window.removeEventListener("focus", loadMotorBoatProgress);
    window.removeEventListener("storage", loadMotorBoatProgress);
    window.removeEventListener("message", handleMotorBoatMessage);
  };
}, []);
useEffect(() => {
  const loadSortProgress = () => {
    const completed =
      Number(localStorage.getItem("sortCompleted")) || 0;

    const progress =
      Number(localStorage.getItem("sortProgress")) ||
      Math.round((completed / 50) * 100) ||
      0;

    setSortStats((prev) => ({
      ...prev,
      progress: Math.min(progress, 100),
      completed,
    }));
  };

  loadSortProgress();

  const handleSortMessage = (event: MessageEvent) => {
    if (
      event.data?.type === "GAME_PROGRESS_UPDATE" &&
      event.data?.game === "sort_game"
    ) {
      setSortStats((prev) => ({
        ...prev,
        progress: Math.min(Number(event.data.progress) || 0, 100),
        completed: Number(event.data.completed) || 0,
        coins: Number(event.data.coins) || prev.coins,
        time: `${event.data.time || 0} min`,
      }));
    }
  };

  window.addEventListener("focus", loadSortProgress);
  window.addEventListener("storage", loadSortProgress);
  window.addEventListener("message", handleSortMessage);

  return () => {
    window.removeEventListener("focus", loadSortProgress);
    window.removeEventListener("storage", loadSortProgress);
    window.removeEventListener("message", handleSortMessage);
  };
}, []);


useEffect(() => {
  const loadTrafficProgress = () => {
    const completed =
      Number(localStorage.getItem("trafficCompleted")) || 0;

    const progress =
      Number(localStorage.getItem("trafficProgress")) ||
      Math.round((completed / 10) * 100) ||
      0;

    setTrafficStats((prev) => ({
      ...prev,
      progress: Math.min(progress, 100),
      completed,
    }));
  };

  loadTrafficProgress();

  const handleTrafficMessage = (event: MessageEvent) => {
    if (
      event.data?.type === "GAME_PROGRESS_UPDATE" &&
      event.data?.game === "smart_traffic_controller"
    ) {
      setTrafficStats((prev) => ({
        ...prev,
        progress: Math.min(Number(event.data.progress) || 0, 100),
        completed: Number(event.data.completed) || 0,
        coins: Number(event.data.coins) || prev.coins,
        time: `${event.data.time || 0} min`,
      }));
    }
  };

  window.addEventListener("focus", loadTrafficProgress);
  window.addEventListener("storage", loadTrafficProgress);
  window.addEventListener("message", handleTrafficMessage);

  return () => {
    window.removeEventListener("focus", loadTrafficProgress);
    window.removeEventListener("storage", loadTrafficProgress);
    window.removeEventListener("message", handleTrafficMessage);
  };
}, []);

useEffect(() => {
  const loadColorSortProgress = () => {
    const completed =
      Number(localStorage.getItem("colorSortCompleted")) || 0;

    const progress =
      Number(localStorage.getItem("colorSortProgress")) ||
      Math.round((completed / 25) * 100) ||
      0;

    setColorSortStats((prev) => ({
      ...prev,
      progress: Math.min(progress, 100),
      completed,
    }));
  };

  loadColorSortProgress();

  const handleColorSortMessage = (event: MessageEvent) => {
    if (
      event.data?.type === "GAME_PROGRESS_UPDATE" &&
      event.data?.game === "water_color_sort_puzzle"
    ) {
      setColorSortStats((prev) => ({
        ...prev,
        progress: Math.min(Number(event.data.progress) || 0, 100),
        completed: Number(event.data.completed) || 0,
        coins: Number(event.data.coins) || prev.coins,
        time: `${event.data.time || 0} min`,
      }));
    }
  };

  window.addEventListener("focus", loadColorSortProgress);
  window.addEventListener("storage", loadColorSortProgress);
  window.addEventListener("message", handleColorSortMessage);

  return () => {
    window.removeEventListener("focus", loadColorSortProgress);
    window.removeEventListener("storage", loadColorSortProgress);
    window.removeEventListener("message", handleColorSortMessage);
  };
}, []);

useEffect(() => {
  const loadSequenceBuilderProgress = () => {
    const completed =
      Number(localStorage.getItem("sequenceBuilderCompleted")) || 0;

    const progress =
      Number(localStorage.getItem("sequenceBuilderProgress")) ||
      Math.round((completed / 30) * 100) ||
      0;

    setSequenceBuilderStats((prev) => ({
      ...prev,
      progress: Math.min(progress, 100),
      completed,
    }));
  };

  loadSequenceBuilderProgress();

  const handleSequenceBuilderMessage = (event: MessageEvent) => {
    if (
      event.data?.type === "GAME_PROGRESS_UPDATE" &&
      event.data?.game === "sequence_builder"
    ) {
      setSequenceBuilderStats((prev) => ({
        ...prev,
        progress: Math.min(Number(event.data.progress) || 0, 100),
        completed: Number(event.data.completed) || 0,
        coins: Number(event.data.coins) || prev.coins,
        time: `${event.data.time || 0} min`,
      }));
    }
  };

  window.addEventListener("focus", loadSequenceBuilderProgress);
  window.addEventListener("storage", loadSequenceBuilderProgress);
  window.addEventListener("message", handleSequenceBuilderMessage);

  return () => {
    window.removeEventListener("focus", loadSequenceBuilderProgress);
    window.removeEventListener("storage", loadSequenceBuilderProgress);
    window.removeEventListener("message", handleSequenceBuilderMessage);
  };
}, []);

useEffect(() => {
  const loadBeeProgress = () => {
    const completed =
      Number(localStorage.getItem("beeCompleted")) || 0;

    const progress =
      Number(localStorage.getItem("beeProgress")) ||
      Math.round((completed / 15) * 100) ||
      0;

    setBeeStats((prev) => ({
      ...prev,
      progress: Math.min(progress, 100),
      completed,
    }));
  };

  loadBeeProgress();

  const handleBeeMessage = (event: MessageEvent) => {
    if (
      event.data?.type === "GAME_PROGRESS_UPDATE" &&
      event.data?.game === "help_the_bee"
    ) {
      setBeeStats((prev) => ({
        ...prev,
        progress: Math.min(Number(event.data.progress) || 0, 100),
        completed: Number(event.data.completed) || 0,
        coins: Number(event.data.coins) || prev.coins,
      }));
    }
  };

  window.addEventListener("focus", loadBeeProgress);
  window.addEventListener("storage", loadBeeProgress);
  window.addEventListener("message", handleBeeMessage);

  return () => {
    window.removeEventListener("focus", loadBeeProgress);
    window.removeEventListener("storage", loadBeeProgress);
    window.removeEventListener("message", handleBeeMessage);
  };
}, []);

useEffect(() => {
  const loadEmojiDecoderProgress = () => {
    const completed =
      Number(localStorage.getItem("emojiDecoderCompleted")) || 0;

    const progress =
      Number(localStorage.getItem("emojiDecoderProgress")) ||
      Math.round((completed / 20) * 100) ||
      0;

    setEmojiDecoderStats((prev) => ({
      ...prev,
      progress: Math.min(progress, 100),
      completed,
      coins: Number(localStorage.getItem("emojiDecoderCoins")) || prev.coins,
    }));
  };

  loadEmojiDecoderProgress();

  const handleEmojiMessage = (event: MessageEvent) => {
    if (
      event.data?.type === "GAME_PROGRESS_UPDATE" &&
      event.data?.game === "emoji_decoder"
    ) {
      setEmojiDecoderStats((prev) => ({
        ...prev,
        progress: Math.min(Number(event.data.progress) || 0, 100),
        completed: Number(event.data.completed) || 0,
        coins: Number(event.data.coins) || prev.coins,
      }));
    }
  };

  window.addEventListener("focus", loadEmojiDecoderProgress);
  window.addEventListener("storage", loadEmojiDecoderProgress);
  window.addEventListener("message", handleEmojiMessage);

  return () => {
    window.removeEventListener("focus", loadEmojiDecoderProgress);
    window.removeEventListener("storage", loadEmojiDecoderProgress);
    window.removeEventListener("message", handleEmojiMessage);
  };
}, []);

useEffect(() => {
  const loadPatternProphetProgress = () => {
    const completed =
      Number(localStorage.getItem("patternProphetCompleted")) || 0;

    const progress =
      Number(localStorage.getItem("patternProphetProgress")) ||
      Math.round((completed / 30) * 100) ||
      0;

    setPatternProphetStats((prev) => ({
      ...prev,
      progress: Math.min(progress, 100),
      completed,
      coins: Number(localStorage.getItem("patternProphetCoins")) || prev.coins,
    }));
  };

  loadPatternProphetProgress();

  const handlePatternMessage = (event: MessageEvent) => {
    if (
      event.data?.type === "GAME_PROGRESS_UPDATE" &&
      event.data?.game === "pattern_prophet"
    ) {
      setPatternProphetStats((prev) => ({
        ...prev,
        progress: Math.min(Number(event.data.progress) || 0, 100),
        completed: Number(event.data.completed) || 0,
        coins: Number(event.data.coins) || prev.coins,
      }));
    }
  };

  window.addEventListener("focus", loadPatternProphetProgress);
  window.addEventListener("storage", loadPatternProphetProgress);
  window.addEventListener("message", handlePatternMessage);

  return () => {
    window.removeEventListener("focus", loadPatternProphetProgress);
    window.removeEventListener("storage", loadPatternProphetProgress);
    window.removeEventListener("message", handlePatternMessage);
  };
}, []);

useEffect(() => {
  const loadSentenceSurgeonProgress = () => {
    const completed =
      Number(localStorage.getItem("sentenceSurgeonCompleted")) || 0;

    const progress =
      Number(localStorage.getItem("sentenceSurgeonProgress")) ||
      Math.round((completed / 30) * 100) ||
      0;

    setSentenceSurgeonStats((prev) => ({
      ...prev,
      progress: Math.min(progress, 100),
      completed,
      coins: Number(localStorage.getItem("sentenceSurgeonCoins")) || prev.coins,
    }));
  };

  loadSentenceSurgeonProgress();

  const handleSentenceSurgeonMessage = (event: MessageEvent) => {
    if (
      event.data?.type === "GAME_PROGRESS_UPDATE" &&
      event.data?.game === "sentence_surgeon"
    ) {
      setSentenceSurgeonStats((prev) => ({
        ...prev,
        progress: Math.min(Number(event.data.progress) || 0, 100),
        completed: Number(event.data.completed) || 0,
        coins: Number(event.data.coins) || prev.coins,
      }));
    }
  };

  window.addEventListener("focus", loadSentenceSurgeonProgress);
  window.addEventListener("storage", loadSentenceSurgeonProgress);
  window.addEventListener("message", handleSentenceSurgeonMessage);

  return () => {
    window.removeEventListener("focus", loadSentenceSurgeonProgress);
    window.removeEventListener("storage", loadSentenceSurgeonProgress);
    window.removeEventListener("message", handleSentenceSurgeonMessage);
  };
}, []);

  return (
    <div className="min-h-screen text-foreground bg-background">
      {showAuth && (
  <AuthModal
    onClose={() => setShowAuth(false)}
    setUser={setUser}
  />
)}
      {/* Mobile top bar */}
      <div className="hidden">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary">
            <Code2 className="h-4 w-4" />
          </div>
          {/* <span className="font-display font-bold text-base">CodeArena</span> */}
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-surface-elevated transition"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className="flex">

        {/* Sidebar — mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 lg:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ type: "spring", damping: 26, stiffness: 220 }}
                className="fixed left-0 top-0 bottom-0 z-50 lg:hidden"
              >
                
              </motion.div>
            </>
          )} 
        </AnimatePresence>

        {/* Main */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <Header
  walletCoins={walletCoins}
  setWalletCoins={setWalletCoins}
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  user={user}
  setShowAuth={setShowAuth}
  sessionTimer={sessionTimerRef.current}
  currentStreak={currentStreak}
/>
{streakBonusPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="relative bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-[90%] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none text-3xl animate-pulse">
        🎉 ✨ 🎊 🪙 🎉 ✨
      </div>

      <div className="relative z-10">
        <div className="text-5xl mb-3">🔥</div>

        <h2 className="text-2xl font-bold text-orange-500 mb-2">
          {streakBonusPopup.days} Day Streak!
        </h2>

        <p className="text-gray-700 font-semibold mb-4">
          You earned a bonus reward
        </p>

        <div className="text-3xl font-bold text-yellow-500 mb-5">
          +{streakBonusPopup.coins} Coins 🪙
        </div>

        <button
          onClick={() => setStreakBonusPopup(null)}
          className="px-5 py-2 rounded-xl bg-primary text-white font-semibold"
        >
          Awesome!
        </button>
      </div>
    </div>
  </div>
)}
            <Hero games={games} />
            <div className="grid grid-cols-1 gap-8">
<GamesSection
  logicMazeStats={logicMazeStats}
  brainBlastStats={brainBlastStats}
  triviaStats={triviaStats}
  zipStats={zipStats}
  mathShopStats={mathShopStats}
  sudokuStats={sudokuStats}
  memoryCardStats={memoryCardStats}
  pipesStats={pipesStats}
  sortStats={sortStats}
  motorBoatStats={motorBoatStats}
  bubbleMathStats={bubbleMathStats}
  beeStats={beeStats}
  sequenceBuilderStats={sequenceBuilderStats}
  emojiDecoderStats={emojiDecoderStats}
  colorSortStats={colorSortStats}
  trafficStats={trafficStats}
  patternProphetStats={patternProphetStats}
  sentenceSurgeonStats={sentenceSurgeonStats}
  searchTerm={searchTerm}
  
/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ───────────────────────── Sidebar ───────────────────────── */

const Sidebar = memo(function Sidebar({
  walletCoins,
  active,
  setActive,
  navigate,
  className = "",
  onClose,
}: {
  walletCoins: number;
  active: string;
  setActive: (k: string) => void;
  className?: string;
  navigate: any;
  onClose?: () => void;
}) {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`${className} sticky top-0 h-screen w-72 shrink-0 flex-col bg-white text-white border-r border-border p-5`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-glow">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          {/* <div className="leading-tight">
            <div className="font-display font-bold text-lg">CodeArena</div>
            <div className="text-[11px] text-white/70">Play. Code. Level up.</div>
          </div> */}
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-surface-elevated">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      {/* <nav className="flex-1 space-y-1">
        {sidebarItems.map((item, i) => {
          const isActive = active === item.key;
          const Icon = item.icon;
          return (
            <motion.button
              key={item.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.3 }}
              onClick={() => {
  setActive(item.key);

  if (item.key === "categories") {
    navigate({ to: "/categories" });
  }
}}
              className={`relative w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/10 border border-primary/20"
                  transition={{ type: "spring", damping: 24, stiffness: 240 }}
                />
              )}
              <Icon className="relative h-4.5 w-4.5 shrink-0" />
              <span className="relative">{item.label}</span>
              {isActive && <ChevronRight className="relative ml-auto h-4 w-4 text-primary" />}
            </motion.button>
          );
        })}
      </nav> */}

      {/* Profile / XP card */}
      {/* <div className="mt-6 space-y-0"> */}
        {/* <div className="mt-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 text-white"> */}
  
  {/* Top Profile */}
  {/* <div className="flex items-center gap-3">
    <img
      src="https://api.dicebear.com/7.x/adventurer/svg?seed=Alex"
      alt="avatar"
      className="h-10 w-10 rounded-full border-2 border-white"
    /> */}
    {/* <div> */}
      {/* <div className="text-sm font-semibold">Alex Chen</div>
      <div className="text-xs bg-yellow-300 text-black px-2 py-0.5 rounded-full inline-block mt-1">
        Level 12
      </div> */}
    {/* </div> */}

  
  {/* Button */}
  {/* <button className="mt-4 w-full bg-yellow-300 text-black text-sm font-semibold py-2 rounded-lg hover:scale-105 transition">
    Upgrade to Pro
  </button> */}

    </motion.aside>
  )
});

/* ───────────────────────── Header ───────────────────────── */

const Header = memo(function Header({
  walletCoins,
  setWalletCoins,
  searchTerm,
  setSearchTerm,
  user,
  setShowAuth,
  sessionTimer,
  currentStreak,
}: any) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCoinInfo, setShowCoinInfo] = useState(false);
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
    >
      <div className="min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
  Welcome back,{" "}
  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
    {user?.user_metadata?.name || user?.email || "Player"}
  </span>
</h1>
        <p className="text-sm text-muted-foreground mt-1">Ready to crack today's challenge?</p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative flex-1 md:flex-none md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
  type="text"
  placeholder="Search games..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full h-10 pl-9 pr-3 rounded-lg bg-card border border-border shadow-soft text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition"
/>
        </div>

        <div className="flex items-center gap-1.5 h-10 px-3 rounded-lg bg-card border border-border shadow-soft">
          <Flame className="h-4 w-4 text-orange-400" />
          <span className="text-sm font-semibold">
  {currentStreak}
</span>
          <span className="hidden sm:inline text-xs text-muted-foreground">day streak</span>
        </div>
        <div className="flex items-center gap-2 h-10 px-4 rounded-lg bg-yellow-400/20 border border-yellow-400/30">
          <span>🪙</span>
          <span className="font-bold text-white-300">{walletCoins}</span>
        </div>
        <button
  onClick={() => setShowCoinInfo(true)}
  className="h-10 w-10 grid place-items-center rounded-lg bg-card border border-border shadow-soft hover:border-primary/40 transition"
  title="How to earn coins?"
>
  <Info className="h-4 w-4" />
</button>

        <button className="relative h-10 w-10 grid place-items-center rounded-lg bg-card border border-border shadow-soft hover:border-primary/40 transition">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
        </button>

<div className="relative">
  {user ? (
    <>
      {/* Username Button */}
      <button
        onClick={() => setShowDropdown((prev: boolean) => !prev)}
        className="h-10 px-4 flex items-center rounded-lg bg-card border border-border cursor-pointer"
      >
        <span className="text-sm font-medium">
          {user.user_metadata?.name || user.email}
        </span>
      </button>

      {/* Click Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-50">
          <button
            onClick={async () => {
              const sessionId =
  localStorage.getItem(
    'platformSessionId'
  );

const session =
  await supabase.auth.getSession();

const token =
  session.data.session
  ?.access_token;

if (sessionId && token) {

  await fetch(
    'https://wallet-api-backend-production.up.railway.app/session/end',
    {
      method: 'POST',

      headers: {
        Authorization:
          `Bearer ${token}`,

        'Content-Type':
          'application/json',
      },

      body: JSON.stringify({
        sessionId,
      }),
    }
  );

  localStorage.removeItem(
    'platformSessionId'
  );
  localStorage.removeItem(
  'sessionRewardGiven'
);
}
if (sessionTimer) {
  clearTimeout(sessionTimer);
}
setWalletCoins(0);

localStorage.removeItem("walletCoins");
localStorage.removeItem("userDisplayName");
localStorage.removeItem("userAvatar");

await supabase.auth.signOut({ scope: "local" });

window.dispatchEvent(new Event("userProfileUpdated"));

setShowDropdown(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </>
  ) : (
    <button
  onClick={() => {
    console.log("LOGIN CLICKED");
    setShowAuth(true);
  }}
  className="h-10 px-3 rounded-lg bg-primary text-white text-sm"
>
  Login
</button>
  )}
</div>
      </div>
      {showCoinInfo && (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative">
      
      <button
        onClick={() => setShowCoinInfo(false)}
        className="absolute top-4 right-4"
      >
        <X className="h-5 w-5" />
      </button>

      <h2 className="text-xl font-bold mb-4">
        🪙 How to Earn Coins
      </h2>

      <div className="space-y-3 text-sm text-gray-700">
        <div>🎮 Play games and complete levels.</div>
        <div>🏆 Finish game challenges.</div>
        <div>🔥 Maintain daily login streaks.</div>
        <div>🎯 Complete daily missions.</div>
        <div>⭐ Achieve high scores in games.</div>
        <div>📈 Earn bonus rewards for progression.</div>
      </div>

      <div className="mt-5 p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-sm">
        Coins earned from all games are automatically added to your wallet and can be used for rewards.
      </div>

    </div>
  </div>
)}
    </motion.header>
  );
});
/* ───────────────────────── Hero ───────────────────────── */

const Hero = memo(function Hero({ games }: { games: Game[] }) {
  const navigate = useNavigate();

  const continuePlaying = () => {
    const lastGame =
      localStorage.getItem("lastPlayedGame") ||
      "";

    const gameRoutes: Record<string, string> = {
      "Logic Maze": "/logic_maze.html",
      "Brain Blast": "/brain_blast.html",
      "Trivia": "/trivia.html",
      "Zip": "/zip_master.html",
      "Stop Motion Studio": "/stop_motion.html",
      "Piano": "/piano.html",
      "Math Shop Game": "/math_shop_final.html",
      "Mini Sudoku": "/suduko.html",
      "Match the Pairs": "/card2.html",
      "Connect the Water Pipes": "/pipes.html",
      "Sort and Think": "/sort2.html",
      "Motor Boat": "/motor_boat.html",
      "Bubble Maths Challenge": "/bubble_math_challenge.html",
      "Smart Traffic Controller": "/traffic.html",
      "Water Color Sort Puzzle": "/color-sort.html",
      "Help The Bee": "/bee2.html",
      "Sequence Builder": "/sequence2.html",
      "Emoji Decoder": "/emoji.html",
      "Fact Flash": "/factcards.html",
"Pattern Prophet": "/pattern2.html",
"Sentence Surgeon": "/sentenceSurgeon.html",
    };

    if (lastGame && gameRoutes[lastGame]) {
      window.open(gameRoutes[lastGame], "_blank");
    } else {
      navigate({ to: "/categories" });
    }
  };
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative overflow-hidden rounded-2xl border border-border bg-hero-grad text-white shadow-soft"
    >
      <div className="absolute inset-0 bg-hero-grad pointer-events-none" />
      {/* floating code symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
  {["{ }", "</>", "()", "[ ]", "==", "=>"].map((s, i) => (
    <span
      key={i}
      className="absolute font-mono text-primary/20 font-bold select-none"
      style={{
        left: `${10 + i * 15}%`,
        top: `${15 + (i % 3) * 25}%`,
        fontSize: `${14 + (i % 3) * 6}px`,
      }}
    >
      {s}
    </span>
  ))}
</div>

      <div className="relative p-6 sm:p-10 grid md:grid-cols-[1fr_auto] gap-6 items-center">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
            <Sparkles className="h-3 w-3" /> Daily Challenge live
          </div>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            Fun, Challenges & Rewards
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/80 max-w-lg">
            Play exciting games, collect coins, and redeem awesome rewards.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <motion.button
  onClick={continuePlaying}
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm shadow-glow transition"
>
              <Play className="h-4 w-4 fill-current" /> Continue Playing
            </motion.button>
<Link
  to="/categories"
  className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-white/20 border border-white/30 text-white backdrop-blur font-semibold text-sm hover:border-primary/40 transition"
>
  Explore Games
  <ChevronRight className="h-4 w-4" />
</Link>
          </div>
        </div>

        <div className="hidden md:block">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-44 h-44 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/30 grid place-items-center shadow-glow"
          >
            <div className="absolute inset-3 rounded-xl border border-primary/20" />
            <Code2 className="h-16 w-16 text-primary" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
});

/* ───────────────────────── Games Section ───────────────────────── */

const GamesSection = memo(function GamesSection({
  logicMazeStats,
  brainBlastStats,
  triviaStats,
  zipStats,
  mathShopStats,
  sudokuStats,
  memoryCardStats,
  pipesStats,
  sortStats,
  motorBoatStats,
  bubbleMathStats,
  beeStats,
  sequenceBuilderStats,
  emojiDecoderStats,
  colorSortStats,
  trafficStats,
  patternProphetStats,
  sentenceSurgeonStats,
  searchTerm,
}: any) {
const filteredGames = games.filter((g) =>
  g.title.toLowerCase().includes(searchTerm.toLowerCase())
);
  return (
    <section>
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Newly Added Games</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Pick a challenge and start coding</p>
        </div>
        <button className="hidden sm:inline-flex items-center gap-1 text-sm text-primary hover:underline underline-offset-4">
          View all <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-5">

  {filteredGames.length === 0 ? (
    <div className="col-span-full text-center py-10 text-gray-500 text-lg font-medium">
      No games found
    </div>
  ) : (
    filteredGames.map((g, i) => {
     const updatedGame =
  g.title === "Logic Maze"
    ? {
        ...g,
        progress: logicMazeStats.progress,
        xp: logicMazeStats.coins,
        time: logicMazeStats.time,
      }
    : g.title === "Brain Blast"
    ? {
        ...g,
        progress: brainBlastStats.progress,
        xp: brainBlastStats.coins,
        time: brainBlastStats.time,
      }
    : g.title === "Trivia"
? {
    ...g,
    progress: triviaStats.progress,
    xp: triviaStats.coins,
    time: triviaStats.time,
  }
: g.title === "Zip"
? {
    ...g,
    progress: zipStats.progress,
    xp: zipStats.coins,
    time: zipStats.time,
  }
: g.title === "Math Shop Game"
? {
    ...g,
    progress: mathShopStats.progress,
    xp: mathShopStats.coins,
    time: mathShopStats.time,
  }
: g.title === "Mini Sudoku"
? {
    ...g,
    progress: sudokuStats.progress,
    xp: sudokuStats.coins,
    time: sudokuStats.time,
  }

: g.title === "Match the Pairs"
? {
    ...g,
    progress: memoryCardStats.progress,
    xp: memoryCardStats.coins,
    time: memoryCardStats.time,
  }
  : g.title === "Sort and Think"
? {
    ...g,
    progress: sortStats.progress,
    xp: sortStats.coins,
    time: sortStats.time,
  }

: g.title === "Motor Boat"
? {
    ...g,
    progress: motorBoatStats.progress,
    xp: motorBoatStats.coins,
    time: motorBoatStats.time,
  }

: g.title === "Bubble Maths Challenge"
? {
    ...g,
    progress: bubbleMathStats.progress,
    xp: bubbleMathStats.coins,
    time: bubbleMathStats.time,
  }
  : g.title === "Help The Bee"
? {
    ...g,
    progress: beeStats.progress,
    xp: beeStats.coins,
    time: beeStats.time,
  }
  : g.title === "Sequence Builder"
? {
    ...g,
    progress: sequenceBuilderStats.progress,
    xp: sequenceBuilderStats.coins,
    time: sequenceBuilderStats.time,
  }
  : g.title === "Sentence Surgeon"
? {
    ...g,
    progress: sentenceSurgeonStats.progress,
    xp: sentenceSurgeonStats.coins,
    time: sentenceSurgeonStats.time,
  }
  : g.title === "Emoji Decoder"
? {
    ...g,
    progress: emojiDecoderStats.progress,
    xp: emojiDecoderStats.coins,
    time: emojiDecoderStats.time,
  }
  : g.title === "Pattern Prophet"
? {
    ...g,
    progress: patternProphetStats.progress,
    xp: patternProphetStats.coins,
    time: patternProphetStats.time,
  }
  : g.title === "Water Color Sort Puzzle"
? {
    ...g,
    progress: colorSortStats.progress,
    xp: colorSortStats.coins,
    time: colorSortStats.time,
  }
  : g.title === "Smart Traffic Controller"
? {
    ...g,
    progress: trafficStats.progress,
    xp: trafficStats.coins,
    time: trafficStats.time,
  }
: g.title === "Connect the Water Pipes"
? {
    ...g,
    progress: pipesStats.progress,
    xp: pipesStats.coins,
    time: pipesStats.time,
  }

: g

      return <GameCard key={g.title} game={updatedGame} index={i} />;
    })
  )}

</div>
          
    </section>
  );
});

function GameCard({ game, index }: { game: Game; index: number }) {
  const locked = !!game.locked;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={!locked ? { y: -4 } : {}}

      onClick={() => {
        localStorage.setItem("lastPlayedGame", game.title);
    if (game.title === "Logic Maze") {
      window.open("/logic_maze.html", "_blank");
    }
    if (game.title === "Brain Blast") {
    window.open("/brain_blast.html", "_blank");
  }
  if (game.title === "Trivia") {
  window.open("/trivia.html", "_blank");
}
// ✅ NEW GAMES
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

if (game.title === "Smart Traffic Controller") {
  window.open("/traffic.html", "_blank");
}

if (game.title === "Water Color Sort Puzzle") {
  window.open("/color-sort.html", "_blank");
}

if (game.title === "Help The Bee") {
  window.open("/bee2.html", "_blank");
}

if (game.title === "Sequence Builder") {
  window.open("/sequence2.html", "_blank");
}

if (game.title === "Emoji Decoder") {
  window.open("/emoji.html", "_blank");
}

if (game.title === "Fact Flash") {
  window.open("/factcards.html", "_blank");
}

if (game.title === "Pattern Prophet") {
  window.open("/pattern2.html", "_blank");
}

if (game.title === "Sentence Surgeon") {
  window.open("/sentenceSurgeon.html", "_blank");
}

  }}

      className={`group relative flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden shadow-card transition-colors ${
        !locked ? "hover:border-primary/40" : "opacity-75"
      }`}
    >
      {/* gradient header */}
      <div className={`relative h-28 sm:h-44 bg-gradient-to-br ${game.accent} border-b border-border overflow-hidden`}>
        <div className="absolute inset-0">
  {game.image ? (
    <img
      src={game.image}
      alt={game.title}
      className="h-full w-full object-cover object-top rounded-t-2xl"
    />
  ) : (
    <div className="h-full w-full grid place-items-center text-5xl">
      <motion.span
        whileHover={{ scale: 1.15, rotate: 6 }}
        transition={{ type: "spring", damping: 14 }}
      >
        {game.icon}
      </motion.span>
    </div>
  )}
</div>
        {/* <span
          className={`absolute top-3 left-3 inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${difficultyStyles[game.difficulty]}`}
        >
          {game.difficulty}
        </span> */}
        {locked && (
          <div className="absolute inset-0 grid place-items-center bg-muted/80">
            <div className="grid place-items-center h-10 w-10 rounded-full bg-surface-elevated border border-border">
              <Lock className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-3 sm:p-4 gap-2 sm:gap-3">
        <h3 className="font-display font-semibold text-sm sm:text-base leading-tight line-clamp-2">
  {game.title}
</h3>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
            <span>Progress</span>
            <span className="text-foreground font-medium">{game.progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${game.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 + index * 0.04 }}
              className={`h-full rounded-full ${game.progress === 100 ? "bg-success" : "bg-gradient-to-r from-primary to-secondary"}`}
            />
          </div>
        </div>

        {/* Meta */}
        {/* <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-1">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">🪙</span>
            <span className="font-medium text-foreground">{game.xp}</span> Coins
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {game.time}
          </div>
        </div> */}

        <motion.button
          whileHover={!locked ? { scale: 1.02 } : {}}
          whileTap={!locked ? { scale: 0.98 } : {}}
          disabled={locked}
          className={`mt-2 inline-flex items-center justify-center gap-1 sm:gap-2 h-9 sm:h-10 rounded-lg text-xs sm:text-sm font-semibold transition ${
            locked
              ? "bg-surface-elevated text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:opacity-90 hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          {locked ? (<><Lock className="h-3.5 w-3.5" /> Locked</>) : (<><Play className="h-3.5 w-3.5 fill-current" /> Play</>)}
        </motion.button>
      </div>
    </motion.article>
  );
}

