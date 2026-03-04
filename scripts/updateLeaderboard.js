import fs from "fs";

const API_KEY = process.env.BITFORTUNE_API_KEY;

const now = new Date();

// start of current month UTC
const from = Math.floor(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1) / 1000);

// now
const to = Math.floor(Date.now() / 1000);

const url = `https://platformv2.bitfortune.com/api/v1/external/affiliates/leaderboard?api_key=${API_KEY}&from=${from}&to=${to}`;

async function update() {
  const res = await fetch(url);

  if (!res.ok) {
    console.error("API error", await res.text());
    process.exit(1);
  }

  const data = await res.json();

  // sort by wager
  const sorted = data
    .sort((a, b) => b.total_wager_usd - a.total_wager_usd)
    .map((u, i) => ({
      rank: i + 1,
      username: u.user_name,
      wagered: u.total_wager_usd
    }));

  fs.writeFileSync(
    "./public/leaderboard.json",
    JSON.stringify(sorted, null, 2)
  );

  console.log("Leaderboard updated");
}

update();