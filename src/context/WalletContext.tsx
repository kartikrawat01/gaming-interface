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
  setCoins: React.Dispatch<
    React.SetStateAction<number>
  >;
};

// =========================
// CONTEXT
// =========================
const WalletContext =
  createContext<
    WalletContextType | undefined
  >(undefined);

// =========================
// PROVIDER PROPS
// =========================
type WalletProviderProps = {
  children: ReactNode;
};

// =========================
// PROVIDER
// =========================
export function WalletProvider({
  children,
}: WalletProviderProps) {

  const [coins, setCoins] =
    useState<number>(0);
    useEffect(() => {

  localStorage.setItem(
    "walletCoins",
    String(coins)
  );

}, [coins]);

  useEffect(() => {

    // =========================
    // LOAD SAVED COINS
    // =========================
    const savedCoins =
      localStorage.getItem(
        "walletCoins"
      );

    if (savedCoins) {

      setCoins(
        Number(savedCoins)
      );

    }

    // =========================
    // SOCKET CONNECT
    // =========================
   const socket = io(
  "https://wallet-api-backend-production.up.railway.app",
  {
    transports: ["websocket"],
  }
);

    // =========================
    // USER ID
    // =========================
    const userId =
      localStorage.getItem(
        "user_id"
      );

    // =========================
    // JOIN WALLET ROOM
    // =========================
    if (userId) {
        socket.emit(
      "join-wallet",
      userId
    );
}

    // =========================
    // LIVE UPDATE
    // =========================
    socket.on(
      "wallet-updated",
      (data) => {

        console.log(
          "GLOBAL WALLET:",
          data
        );

        setCoins(
          data.balance
        );

      }
    );

    // =========================
    // MULTI TAB SYNC
    // =========================
    const handleStorage = (
      e: StorageEvent
    ) => {

      if (
        e.key === "walletCoins"
      ) {

        setCoins(
          Number(e.newValue)
        );

      }

    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    // =========================
    // CLEANUP
    // =========================
    return () => {

      socket.disconnect();

      window.removeEventListener(
        "storage",
        handleStorage
      );

    };

  }, []);

  return (

    <WalletContext.Provider
      value={{
        coins,
        setCoins,
      }}
    >

      {children}

    </WalletContext.Provider>

  );

}

// =========================
// CUSTOM HOOK
// =========================
export function useWallet() {

  const context =
    useContext(
      WalletContext
    );

  if (!context) {

    throw new Error(
      "useWallet must be used inside WalletProvider"
    );

  }

  return context;

}