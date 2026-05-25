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
    this.currentUser =
      session.user;
    await this.setupSocket();
    const balance =
      await fetchWalletBalance();
    this.updateWallet(balance);
  },

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
window.gameSDK =
  GameSDK;