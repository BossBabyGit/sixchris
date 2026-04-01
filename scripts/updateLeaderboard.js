import fs from "fs";

// April 2026 UTC range:
// 2026-04-01 00:00:00 UTC -> 2026-05-01 00:00:00 UTC
const FROM = 1775001600; // April 1, 2026 00:00:00 UTC
const TO = 1777593600;   // May 1, 2026 00:00:00 UTC

const API_KEY = process.env.BITFORTUNE_API_KEY;
const MAX_ROWS = 10;

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

  // Normalize, sort, and take top real users
  const leaderboard = (Array.isArray(data) ? data : [])
    .map((u) => ({
      user_name: u.user_name ?? "hidden",
      total_wager_usd: Number(u.total_wager_usd ?? 0),
    }))
    .sort((a, b) => b.total_wager_usd - a.total_wager_usd)
    .slice(0, MAX_ROWS)
    .map((u, i) => ({
      rank: i + 1,
      username: u.user_name,
      wagered: u.total_wager_usd,
    }));

  // Fill missing spots with placeholder users
  while (leaderboard.length < MAX_ROWS) {
    leaderboard.push({
      rank: leaderboard.length + 1,
      username: "No user",
      wagered: 0,
    });
  }

  fs.writeFileSync(
    "./public/leaderboard.json",
    JSON.stringify(leaderboard, null, 2)
  );

  console.log(`Leaderboard updated. Rows: ${leaderboard.length}`);
}

update().catch((e) => {
  console.error("Unexpected failure:", e);
  process.exit(1);
});
