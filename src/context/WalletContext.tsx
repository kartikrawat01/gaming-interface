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
  connectWalletSocket: (userId: string) => void;
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

  // On mount: only load saved coins + multi-tab sync. NO socket here.
  useEffect(() => {
    const savedCoins = localStorage.getItem("walletCoins");
    if (savedCoins) setCoins(Number(savedCoins));

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "walletCoins") setCoins(Number(e.newValue));
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      socketRef.current?.disconnect();
    };
  }, []);

  // Call this ONLY after confirmed login
  const connectWalletSocket = (userId: string) => {
    if (socketRef.current?.connected) {
  // Already connected, bas listener ensure karo
  socketRef.current.off("walletUpdated");
  socketRef.current.on("walletUpdated", (data) => {
    setCoins(data.balance);
    localStorage.setItem("walletCoins", String(data.balance));
  });
  return;
}

    const socket = io(
      "https://wallet-api-backend-production.up.railway.app",
      {
        transports: ["websocket", "polling"],
        timeout: 10000,
        reconnectionAttempts: 3,
      }
    );

    socket.on("connect", () => {
      socket.emit("join-wallet", userId);
    });

    socket.on("walletUpdated", (data) => {
  console.log("Realtime wallet update:", data);

  // React state update
  setCoins(data.balance);

  // localStorage update
  localStorage.setItem(
    "walletCoins",
    String(data.balance)
  );

  // Notify whole app instantly
  window.dispatchEvent(
    new CustomEvent("walletUpdated", {
      detail: {
        balance: data.balance,
      },
    })
  );
});

    socket.on("connect_error", (err) => {
      console.warn("Wallet socket error:", err.message);
    });

    socketRef.current = socket;
  };

  return (
    <WalletContext.Provider value={{ coins, setCoins, connectWalletSocket }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used inside WalletProvider");
  return context;
}
