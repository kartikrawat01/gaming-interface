import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

// ─── Types ───────────────────────────────────────────────────
type WalletContextType = {
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

type WalletProviderProps = { children: ReactNode };

// ─── Provider ────────────────────────────────────────────────
export function WalletProvider({ children }: WalletProviderProps) {
  const [coins, setCoins] = useState<number>(() => {
    // Initialize from localStorage immediately — no flash
    const saved = localStorage.getItem("walletCoins");
    return saved && Number(saved) > 0 ? Number(saved) : 0;
  });

  const socketRef = useRef<Socket | null>(null);
  const initDone  = useRef(false);

  // Persist coins to localStorage whenever they change
  useEffect(() => {
    if (coins > 0) localStorage.setItem("walletCoins", String(coins));
  }, [coins]);

  // Main init — runs once only
  useEffect(() => {
    if (initDone.current) return;
    initDone.current = true;

    let mounted = true;

    // 1. Fetch real balance from API
    async function loadBalance() {
      try {
        const supabase = (window as any).supabaseClient;
        if (!supabase) return;

        const { data } = await supabase.auth.getSession();
        const token  = data?.session?.access_token;
        const userId = data?.session?.user?.id;

        if (!token) return;

        if (userId) localStorage.setItem("user_id", userId);

        const res  = await fetch("http://localhost:3000/wallet/balance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();

        if (mounted && typeof json.balance === "number") {
          setCoins(json.balance);
          localStorage.setItem("walletCoins", String(json.balance));
        }

        // 2. Connect socket ONLY after we have userId
        if (userId) connectSocket(userId);

      } catch (err) {
        console.warn("Balance fetch failed, using localStorage value:", err);
      }
    }

    loadBalance();

    // Multi-tab sync via storage events
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "walletCoins" && e.newValue && mounted) {
        setCoins(Number(e.newValue));
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      mounted = false;
      window.removeEventListener("storage", handleStorage);
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  // Socket connect — called once after userId is confirmed
  function connectSocket(userId: string) {
    if (socketRef.current) return; // already connected

    const socket = io("http://localhost:3000", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("join-wallet", userId);
    });

    socket.on("wallet-updated", (data: { balance: number }) => {
      setCoins(data.balance);
      localStorage.setItem("walletCoins", String(data.balance));
    });

    socket.on("connect_error", (err) => {
      console.warn("Socket connect error:", err.message);
    });
  }

  return (
    <WalletContext.Provider value={{ coins, setCoins }}>
      {children}
    </WalletContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────
export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used inside WalletProvider");
  return context;
}
