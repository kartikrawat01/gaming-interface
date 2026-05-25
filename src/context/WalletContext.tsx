import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

import { io } from "socket.io-client";

// =========================
// TYPES
// =========================
type WalletContextType = {
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
};

// =========================
// CONTEXT
// =========================
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// =========================
// PROVIDER PROPS
// =========================
type WalletProviderProps = {
  children: ReactNode;
};

// =========================
// PROVIDER
// =========================
export function WalletProvider({ children }: WalletProviderProps) {
  const [coins, setCoins] = useState<number>(0);

  // ✅ FIX 1: Ref use karo taaki storage event mein latest coins value mile
  // bina coins ko dependency mein daale (loop avoid)
  const coinsRef = useRef(coins);
  useEffect(() => {
    coinsRef.current = coins;
  }, [coins]);

  // ✅ FIX 2: localStorage write — sirf jab coins change ho
  // (yeh same-tab storage event FIRE nahi karta — browser spec)
  useEffect(() => {
    if (coins > 0) {
      localStorage.setItem("walletCoins", String(coins));
    }
  }, [coins]);

  useEffect(() => {
    // =========================
    // LOAD SAVED COINS (instant display)
    // =========================
    const savedCoins = localStorage.getItem("walletCoins");
    if (savedCoins && Number(savedCoins) > 0) {
      setCoins(Number(savedCoins));
    }

    // =========================
    // SOCKET CONNECT (pehle banao)
    // =========================
    const socket = io(
      "https://wallet-api-backend-production.up.railway.app",
      { transports: ["websocket"] }
    );

    // =========================
    // LOAD BALANCE FROM API
    // =========================
    async function loadBalance() {
      try {
        const supabase = (window as any).supabaseClient;
        if (!supabase) return;

        const { data } = await supabase.auth.getSession();
        const token = data?.session?.access_token;
        if (!token) return;

        // ✅ FIX 3: user_id save karo AUR join-wallet yahan emit karo
        // taaki socket ready ho aur userId bhi available ho
        const userId = data?.session?.user?.id;
        if (userId) {
          localStorage.setItem("user_id", userId);
          socket.emit("join-wallet", userId);
        }

        const res = await fetch(
          "https://wallet-api-backend-production.up.railway.app/wallet/balance",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const json = await res.json();
        if (typeof json.balance === "number") {
          setCoins(json.balance);
        }
      } catch (err) {
        console.warn("Balance fetch failed:", err);
        // API fail ho toh localStorage wala dikhta rahega
      }
    }

    loadBalance();

    // =========================
    // LIVE UPDATE (socket)
    // =========================
    socket.on("wallet-updated", (data) => {
      console.log("GLOBAL WALLET:", data);
      setCoins(data.balance);
    });

    // =========================
    // MULTI TAB SYNC — ✅ FIX 4: same value pe update mat karo (loop prevent)
    // =========================
    const handleStorage = (e: StorageEvent) => {
      if (
        e.key === "walletCoins" &&
        e.newValue !== null &&
        Number(e.newValue) !== coinsRef.current
      ) {
        setCoins(Number(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorage);

    // =========================
    // CLEANUP
    // =========================
    return () => {
      socket.disconnect();
      window.removeEventListener("storage", handleStorage);
    };
  }, []); // ← empty array — sirf once mount pe chalega

  return (
    <WalletContext.Provider value={{ coins, setCoins }}>
      {children}
    </WalletContext.Provider>
  );
}

// =========================
// CUSTOM HOOK
// =========================
export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used inside WalletProvider");
  }
  return context;
}
