async function rewardCoins({
  amount,
  description,
  game,
  level,
  score,
  streak,
  mode,
  difficulty,
}) {

  try {

    // GET SUPABASE SESSION
    const { data, error } =
      await supabaseClient.auth.getSession();

    if (error) {

      console.error(
        "Session Error:",
        error
      );

      return;
    }

    const token =
      data.session?.access_token;

    if (!token) {

      console.error(
        "No access token found"
      );

      return;
    }

    console.log(
      "Sending reward with token:",
      token
    );

    const response = await fetch(
      "https://wallet-api-backend-production.up.railway.app/wallet/earn/event",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          amount,
          description,
          game,
          level,
          score,
          streak,
          mode,
          difficulty,
          completedAt: Date.now(),
        }),
      }
    );

    if (!response.ok) {
const errText =
    await response.text();
      console.error(
        "Reward API failed",
        errText
      );

      return;
    }

    const result =
      await response.json();

    console.log(
      "Reward API Result:",
      result
    );

    return result;

  } catch (error) {

    console.error(
      "rewardCoins ERROR:",
      error
    );

  }

}
async function spendCoins({
  amount,
  description,
  game
}) {

  try {

    const { data, error } =
      await supabaseClient.auth.getSession();

    if (error) return;

    const token =
      data.session?.access_token;

    if (!token) return;

    const response = await fetch(
      "https://wallet-api-backend-production.up.railway.app/wallet/spend/event",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          amount,
          description,
          game
        }),
      }
    );

    const text = await response.text();

    if (!response.ok) {

      console.error(
        "Spend API failed:",
        text
      );

      return;
    }

    try {

      return JSON.parse(text);

    } catch (e) {

      console.error(
        "Invalid JSON:",
        text
      );

    }

  } catch(err) {

    console.error(
      "spendCoins ERROR:",
      err
    );

  }

}
async function fetchWalletBalance() {

  try {

    const { data, error } =
      await supabaseClient.auth.getSession();

    if (error) {

      console.error(
        "Session Error:",
        error
      );

      return 0;
    }

    const token =
      data.session?.access_token;

    if (!token) return 0;

    const response = await fetch(
      "https://wallet-api-backend-production.up.railway.app/wallet/balance",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    const dataJson =
      await response.json();

    if (
      dataJson.balance !== undefined
    ) {

      localStorage.setItem(
        "walletCoins",
        String(dataJson.balance)
      );

      window.dispatchEvent(
        new CustomEvent(
          "walletUpdated",
          {
            detail: {
              balance:
                dataJson.balance
            }
          }
        )
      );

      return dataJson.balance;

    }

  } catch (err) {

    console.error(
      "Wallet fetch failed:",
      err
    );

  }

  return 0;

}
window.rewardCoins = rewardCoins;
window.spendCoins = spendCoins;
window.fetchWalletBalance = fetchWalletBalance;

fetchWalletBalance() 