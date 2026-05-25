import {
  createContext,
  useContext,
  useEffect,
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

  // ✅ FIX 1: Sirf coins > 0 hone par hi localStorage update karo
  // "0" bhi save hoti thi pehle jo storage event trigger karta tha
  useEffect(() => {
    if (coins > 0) {
      localStorage.setItem("walletCoins", String(coins));
    }
  }, [coins]);

  useEffect(() => {
    // =========================
    // LOAD SAVED COINS
    // =========================
    const savedCoins = localStorage.getItem("walletCoins");
    // ✅ FIX 2: Number check karo, "0" ko ignore karo
    if (savedCoins && Number(savedCoins) > 0) {
      setCoins(Number(savedCoins));
    }

    // =========================
    // SOCKET CONNECT
    // ✅ FIX 3: polling pehle, websocket baad mein — freeze nahi hoga
    // =========================
    const socket = io(
      "https://wallet-api-backend-production.up.railway.app",
      {
        transports: ["polling", "websocket"], // ← polling first = no freeze
        reconnectionAttempts: 3,              // ← zyada retry mat karo
        timeout: 5000,                        // ← 5s mein timeout
      }
    );

    // =========================
    // USER ID
    // =========================
    const userId = localStorage.getItem("user_id");
    if (userId) {
      socket.emit("join-wallet", userId);
    }

    // =========================
    // LIVE UPDATE
    // =========================
    socket.on("wallet-updated", (data) => {
      console.log("GLOBAL WALLET:", data);
      if (typeof data.balance === "number") {
        setCoins(data.balance);
      }
    });

    // =========================
    // MULTI TAB SYNC
    // ✅ FIX 4: storage event loop band karo
    // =========================
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "walletCoins" && e.newValue && Number(e.newValue) > 0) {
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
  }, []);

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
