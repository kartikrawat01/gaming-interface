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

  // Persist coins to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("walletCoins", String(coins));
  }, [coins]);

  // On mount: load saved coins + multi-tab sync
  useEffect(() => {
    const savedCoins = localStorage.getItem("walletCoins");
    if (savedCoins) setCoins(Number(savedCoins));

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "walletCoins") setCoins(Number(e.newValue));
    };
    window.addEventListener("storage", handleStorage);

    // Reconnect socket if user was already logged in (e.g. page refresh)
    const savedUserId = localStorage.getItem("user_id");
    if (savedUserId) connectSocket(savedUserId);

    return () => {
      window.removeEventListener("storage", handleStorage);
      socketRef.current?.disconnect();
    };
  }, []);

  // Call this ONLY after a confirmed login — never on page load cold
  const connectSocket = (userId: string) => {
    if (socketRef.current?.connected) return; // avoid duplicates

    const socket = io(
      "https://wallet-api-backend-production.up.railway.app",
      {
        transports: ["polling", "websocket"], // polling first — far more reliable
        timeout: 5000,
        reconnectionAttempts: 2,
        reconnectionDelay: 3000,
      }
    );

    socket.on("connect", () => {
      socket.emit("join-wallet", userId);
    });

    socket.on("wallet-updated", (data) => {
      setCoins(data.balance);
    });

    socket.on("connect_error", (err) => {
      // Non-fatal — wallet still works via REST API calls
      console.warn("Socket error (non-blocking):", err.message);
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
