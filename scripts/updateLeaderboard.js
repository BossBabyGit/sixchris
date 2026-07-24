import fs from "fs";

// Race window (UTC): 2026-04-01 -> 2026-05-01
const START_DATE = "2026-07-24";
const END_DATE = "2026-08-24";

const AFFILIATE_CODE = "sixchris";
const API_KEY = process.env.LUXDROP_API_KEY;
const MAX_ROWS = 10;

if (!API_KEY) {
  console.error("Missing LUXDROP_API_KEY env var");
  process.exit(1);
}

const url =
  "https://api.luxdrop.com/external/affiliates" +
  `?codes=${encodeURIComponent(AFFILIATE_CODE)}` +
  `&startDate=${START_DATE}&endDate=${END_DATE}`;

async function update() {
  const res = await fetch(url, {
    headers: { "x-api-key": API_KEY },
  });

  if (!res.ok) {
    console.error("API error:", res.status, await res.text());
    process.exit(1);
  }

  const data = await res.json();

  // The Luxdrop docs describe the request but not the exact response shape,
  // so this accepts a few likely layouts: a bare array of user rows, or an
  // object wrapping/keying the rows by the affiliate code.
  const rows = Array.isArray(data)
    ? data
    : Array.isArray(data?.[AFFILIATE_CODE])
    ? data[AFFILIATE_CODE]
    : Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.users)
    ? data.users
    : Array.isArray(data?.affiliates)
    ? data.affiliates
    : [];

  if (rows.length === 0) {
    console.warn("No rows found in Luxdrop response — logging raw payload for inspection:");
    console.warn(JSON.stringify(data).slice(0, 2000));
  }

  // Normalize, sort, and take top real users
  const leaderboard = rows
    .map((u) => ({
      user_name: u.user_name ?? u.username ?? u.name ?? "hidden",
      total_wager_usd: Number(
        u.total_wager_usd ?? u.totalWagered ?? u.wagered ?? u.wager ?? u.total_wagered_usd ?? 0
      ),
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
