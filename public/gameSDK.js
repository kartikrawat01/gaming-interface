let socket = null;
const GameSDK = {
  currentUser: null,
  async init() {

  const {
    data: { session }
  } =
  await supabaseClient.auth.getSession();

  if (!session?.user) {

    window.location.href =
      "../login.html";

    return;
  }

  console.log(
    "User logged in:",
    session.user.id
  );

  this.currentUser =
    session.user;

  await this.setupSocket();

  // WAIT thoda taaki auth fully ready ho jaye
  setTimeout(async () => {

    const balance =
      await fetchWalletBalance();

    console.log(
      "Fetched balance:",
      balance
    );

    this.updateWallet(balance);
    window.addEventListener(
  "walletUpdated",
  (event) => {
    const balance =
      event.detail.balance;

    console.log(
      "Wallet auto updated:",
      balance
    );

    this.updateWallet(balance);
  }
);

  }, 1000);
},
  // async init() {
  //   const {
  //     data: { session }
  //   } =
  //   await supabaseClient.auth.getSession();
  //   if (!session?.user) {
  //     window.location.href =
  //       "../login.html";
  //     return;
  //   }
  //   this.currentUser =
  //     session.user;
  //   await this.setupSocket();
  //   const balance =
  //     await fetchWalletBalance();
  //   this.updateWallet(balance);
  // },

  async setupSocket() {
    socket =
      io("https://wallet-api-backend-production.up.railway.app");
    socket.emit(
      "join-wallet",
      this.currentUser.id
    );
   socket.off("wallet-updated");

socket.on(
  "wallet-updated",
  (data) => {
    this.updateWallet(
      data.balance
    );
  }
);
  },
  async rewardCoins(data) {

  return await window.rewardCoins(data);

},
async spendCoins(data) {
  return await window.spendCoins(data);
},

  updateWallet(balance) {
    localStorage.setItem(
      "walletCoins",
      String(balance)
    );
   window.dispatchEvent(
      new CustomEvent(
        "walletUpdated",
        {
          detail: {
            balance
          }}
      ) );
  }
};
supabaseClient.auth.onAuthStateChange(
  async (event, session) => {

    console.log(
      "Auth changed:",
      event
    );

    if (session?.user) {

      console.log(
        "Authenticated User:",
        session.user.id
      );

      GameSDK.currentUser =
        session.user;

      const balance =
        await fetchWalletBalance();

      GameSDK.updateWallet(
        balance
      );
    }
  }
);
window.gameSDK =
  GameSDK;