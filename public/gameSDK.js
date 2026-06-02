// let socket = null;
// const GameSDK = {
//   currentUser: null,
//   async init() {

//   const {
//     data: { session }
//   } =
//   await supabaseClient.auth.getSession();

//   if (!session?.user) {

//     window.location.href =
//       "../login.html";

//     return;
//   }

//   console.log(
//     "User logged in:",
//     session.user.id
//   );

//   this.currentUser =
//     session.user;

//   await this.setupSocket();

//   // WAIT thoda taaki auth fully ready ho jaye
//   setTimeout(async () => {

//     const balance =
//       await fetchWalletBalance();

//     console.log(
//       "Fetched balance:",
//       balance
//     );

//     this.updateWallet(balance);

//   }, 1000);
// },
//   // async init() {
//   //   const {
//   //     data: { session }
//   //   } =
//   //   await supabaseClient.auth.getSession();
//   //   if (!session?.user) {
//   //     window.location.href =
//   //       "../login.html";
//   //     return;
//   //   }
//   //   this.currentUser =
//   //     session.user;
//   //   await this.setupSocket();
//   //   const balance =
//   //     await fetchWalletBalance();
//   //   this.updateWallet(balance);
//   // },

//   async setupSocket() {
//     socket =
//       io("https://wallet-api-backend-production.up.railway.app");
//     socket.emit(
//       "join-wallet",
//       this.currentUser.id
//     );
//    socket.off("wallet-updated");

// socket.on(
//   "wallet-updated",
//   (data) => {
//     this.updateWallet(
//       data.balance
//     );
//   }
// );
//   },
//   async rewardCoins(data) {

//   return await window.rewardCoins(data);

// },
// async spendCoins(data) {
//   return await window.spendCoins(data);
// },

//   updateWallet(balance) {
//     localStorage.setItem(
//       "walletCoins",
//       String(balance)
//     );
//    window.dispatchEvent(
//       new CustomEvent(
//         "walletUpdated",
//         {
//           detail: {
//             balance
//           }}
//       ) );
//   }
// };
// supabaseClient.auth.onAuthStateChange(
//   async (event, session) => {

//     console.log(
//       "Auth changed:",
//       event
//     );

//     if (session?.user) {

//       console.log(
//         "Authenticated User:",
//         session.user.id
//       );

//       GameSDK.currentUser =
//         session.user;

//       const balance =
//         await fetchWalletBalance();

//       GameSDK.updateWallet(
//         balance
//       );
//     }
//   }
// );
// window.gameSDK =
//   GameSDK;

window.gameSDK = {
  socket: null,

  async init() {
    await this.connectSocket();
    return true;
  },

  async getBalance() {
    if (typeof fetchWalletBalance !== "function") {
      console.error("fetchWalletBalance function not found");
      return null;
    }

    return await fetchWalletBalance();
  },

  async rewardCoins(data) {
    if (typeof rewardCoins !== "function") {
      console.error("rewardCoins function not found");
      return null;
    }

    const result = await rewardCoins(data);

    if (result?.balance !== undefined) {
      localStorage.setItem("walletCoins", String(result.balance));

      window.dispatchEvent(
        new CustomEvent("walletUpdated", {
          detail: { balance: result.balance },
        })
      );
    }

    return result;
  },

  async connectSocket() {
    if (typeof io === "undefined") {
      console.warn("Socket.io not loaded");
      return;
    }

    const API_URL =
      window.WALLET_API_URL ||
      "https://wallet-api-backend-production.up.railway.app";

    this.socket = io(API_URL, {
      transports: ["websocket"],
    });

    this.socket.on("walletUpdated", (data) => {
      if (data?.balance !== undefined) {
        localStorage.setItem("walletCoins", String(data.balance));

        window.dispatchEvent(
          new CustomEvent("walletUpdated", {
            detail: { balance: data.balance },
          })
        );
      }
    });
  },

};

// Auto wallet socket setup — har game mein automatically kaam karega
async function setupWalletSocket() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session?.user) return;

  const socket = io("https://wallet-api-backend-production.up.railway.app");
  socket.emit("join-wallet", session.user.id);

  socket.on("walletUpdated", (data) => {
    if (data?.balance !== undefined) {
      window.dispatchEvent(
        new CustomEvent("walletUpdated", { detail: { balance: data.balance } })
      );
    }
  });
}

// Page load hote hi call ho jaye
setupWalletSocket();

