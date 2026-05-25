import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

type WalletContextType = {
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  connectSocket: (userId: string) => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

type WalletProviderProps = { children: ReactNode };

export function WalletProvider({ children }: WalletProviderProps) {
  const [coins, setCoins] = useState<number>(0);
  const socketRef = useRef<Socket | null>(null);

  // Persist coins to localStorage
  useEffect(() => {
    localStorage.setItem("walletCoins", String(coins));
  }, [coins]);

  // Load saved coins on mount
  useEffect(() => {
    const savedCoins = localStorage.getItem("walletCoins");
    if (savedCoins) setCoins(Number(savedCoins));

    // Multi-tab sync
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "walletCoins") setCoins(Number(e.newValue));
    };
    window.addEventListener("storage", handleStorage);

    // If user was already logged in (page refresh), reconnect socket
    const savedUserId = localStorage.getItem("user_id");
    if (savedUserId) connectSocket(savedUserId);

    return () => {
      window.removeEventListener("storage", handleStorage);
      socketRef.current?.disconnect();
    };
  }, []);

  // Call this ONLY after successful login
  const connectSocket = (userId: string) => {
    // Don't create duplicate connections
    if (socketRef.current?.connected) return;

    const socket = io(
      "https://wallet-api-backend-production.up.railway.app",
      {
        transports: ["polling", "websocket"], // polling first — more reliable
        timeout: 5000,
        reconnectionAttempts: 3,
        reconnectionDelay: 2000,
      }
    );

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("join-wallet", userId);
    });

    socket.on("wallet-updated", (data) => {
      console.log("GLOBAL WALLET:", data);
      setCoins(data.balance);
    });

    socket.on("connect_error", (err) => {
      console.warn("Socket connection error (non-blocking):", err.message);
      // Don't crash — wallet still works via REST API
    });

    socketRef.current = socket;
  };

  return (
    <WalletContext.Provider value={{ coins, setCoins, connectSocket }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used inside WalletProvider");
  return context;
}
