import fs from "fs";

// March 2026 UTC range:
// 2026-03-01 00:00:00 UTC -> 2026-04-01 00:00:00 UTC
const FROM = 1772323200;
const TO = 1775001600;

const API_KEY = process.env.BITFORTUNE_API_KEY;

if (!API_KEY) {
  console.error("Missing BITFORTUNE_API_KEY env var");
  process.exit(1);
}

const url =
  "https://platformv2.bitfortune.com/api/v1/external/affiliates/leaderboard" +
  `?api_key=${encodeURIComponent(API_KEY)}&from=${FROM}&to=${TO}`;

async function update() {
  const res = await fetch(url);

  if (!res.ok) {
    console.error("API error:", res.status, await res.text());
    process.exit(1);
  }

  const data = await res.json();

  // Normalize -> [{ rank, username, wagered }]
  const sorted = (Array.isArray(data) ? data : [])
    .map((u) => ({
      user_id: u.user_id,
      user_name: u.user_name ?? "hidden",
      total_wager_usd: Number(u.total_wager_usd ?? 0),
    }))
    .sort((a, b) => b.total_wager_usd - a.total_wager_usd)
    .map((u, i) => ({
      rank: i + 1,
      username: u.user_name,
      wagered: u.total_wager_usd,
    }));

  fs.writeFileSync("./public/leaderboard.json", JSON.stringify(sorted, null, 2));
  console.log(`Leaderboard updated. Rows: ${sorted.length}`);
}

update().catch((e) => {
  console.error("Unexpected failure:", e);
  process.exit(1);
});