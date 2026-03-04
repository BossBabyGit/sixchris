import React, { useEffect, useMemo, useState } from "react";
import Toast from "../components/Toast";

const LEADERBOARD = [
  { rank: 1, username: "Bo****y", wagered: 12245.86, prize: 1000, avatarSeed: "Alpha" },
  { rank: 2, username: "Lu****a", wagered: 11802.3, prize: 850, avatarSeed: "Beta" },
  { rank: 3, username: "Mi****n", wagered: 11040.12, prize: 700, avatarSeed: "Gamma" },
  { rank: 4, username: "Ka****i", wagered: 9291.55, prize: 500, avatarSeed: "Delta" },
  { rank: 5, username: "Re****x", wagered: 9055.02, prize: 400, avatarSeed: "Epsilon" },
  { rank: 6, username: "Jo****k", wagered: 8802.66, prize: 350, avatarSeed: "Zeta" },
  { rank: 7, username: "Ne****o", wagered: 8650.1, prize: 300, avatarSeed: "Eta" },
  { rank: 8, username: "Sa****r", wagered: 8501.77, prize: 250, avatarSeed: "Theta" },
  { rank: 9, username: "Vi****y", wagered: 8420.33, prize: 200, avatarSeed: "Iota" },
  { rank: 10, username: "Xe****n", wagered: 8300.0, prize: 150, avatarSeed: "Kappa" },
];

const CODE = "sixchris";

// matches your current behavior (static single avatar file)
const AVATAR_URL = () => "/1.jpg";

const fmt$ = (n) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pad2 = (n) => String(n).padStart(2, "0");

const CROWN = (
  <svg className="crown" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 9l4 4 4-7 4 7 4-4v10H4V9z"
      stroke="rgba(227,185,61,.95)"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path d="M6 19h12" stroke="rgba(227,185,61,.8)" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export default function Leaderboard() {
  const [toast, setToast] = useState({ show: false, text: "" });
  const [activeCasino, setActiveCasino] = useState("bitfortune");

  // same logic as your HTML: END_AT = now + 36h (demo)
  const endAt = useMemo(() => Date.now() + 36 * 60 * 60 * 1000, []);
  const [t, setT] = useState({ dd: "00", hh: "00", mm: "00", ss: "00", tick: false });

  useEffect(() => {
    let prevSec = -1;
    const id = setInterval(() => {
      const remaining = Math.max(0, endAt - Date.now());
      const totalSec = Math.floor(remaining / 1000);
      if (totalSec === prevSec) return;
      prevSec = totalSec;

      const days = Math.floor(totalSec / 86400);
      const hours = Math.floor((totalSec % 86400) / 3600);
      const mins = Math.floor((totalSec % 3600) / 60);
      const secs = totalSec % 60;

      setT({
        dd: pad2(days),
        hh: pad2(hours),
        mm: pad2(mins),
        ss: pad2(secs),
        tick: true,
      });

      // remove tick quickly so animation can re-trigger
      setTimeout(() => setT((p) => ({ ...p, tick: false })), 50);
    }, 1000);

    return () => clearInterval(id);
  }, [endAt]);

  const podiumConfig = [
    { dataIndex: 1, sizeClass: "h-2nd", label: 2 },
    { dataIndex: 0, sizeClass: "h-1st", label: 1 },
    { dataIndex: 2, sizeClass: "h-3rd", label: 3 },
  ];

  const maxWager = LEADERBOARD[0]?.wagered ?? 1;

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(CODE);
    } catch {
      // ignore
    }
    setToast({ show: true, text: `Copied: ${CODE}` });
  }

  return (
    <>
      <main className="wrap">
        <section className="hero">
          <h1>$5000 BitFortune Leaderboard</h1>
          <p className="sub">
            Compete in my Monthly Leaderboard and win huge prizes. Only eligible for code <b>{CODE}</b> users.
          </p>
          <p className="sub">Wagering on dice is prohibited!</p>

          <div className="pill-row" role="tablist" aria-label="Casino selection">
            <button
              className={`pill ${activeCasino === "bitfortune" ? "active" : ""}`}
              data-casino="bitfortune"
              role="tab"
              aria-selected={activeCasino === "bitfortune"}
              onClick={() => setActiveCasino("bitfortune")}
            >
              BitFortune
            </button>
          </div>

          <div className="code">
            Code: <b>{CODE}</b>
            <button className="btn-copy" onClick={copyCode} aria-label="Copy referral code">
              Copy
            </button>
          </div>
        </section>

        <section className="podium" aria-label="Top 3 players">
          {podiumConfig.map(({ dataIndex, sizeClass, label }) => {
            const u = LEADERBOARD[dataIndex];
            const isWinner = dataIndex === 0;
            return (
              <article key={label} className={`card ${sizeClass}${isWinner ? " winner" : ""}`}>
                {isWinner ? <div className="halo" /> : null}
                <div className="card-inner">
                  {isWinner ? CROWN : <div style={{ height: 28 }} />}
                  <div className="badge">{label}</div>
                  <img className="avatar" src={AVATAR_URL(u.avatarSeed)} alt="" loading="lazy" />
                  <div className="name">{u.username}</div>
                  <div className="big">${fmt$(u.wagered)}</div>
                  <div className="meta">
                    <span>Wagered</span>
                    <span>Rank #{u.rank}</span>
                  </div>
                  <div className="prize">${fmt$(u.prize)}</div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="countdown" aria-label="Time remaining">
          <div>Leaderboard ends in:</div>
          <div className="timer">
            <div className="timebox">
              <div className="num">{t.dd}</div>
              <div className="lbl">DAYS</div>
            </div>
            <div className="timebox">
              <div className="num">{t.hh}</div>
              <div className="lbl">HRS</div>
            </div>
            <div className="timebox">
              <div className="num">{t.mm}</div>
              <div className="lbl">MIN</div>
            </div>
            <div className="timebox">
              <div className={`num ${t.tick ? "tick" : ""}`}>{t.ss}</div>
              <div className="lbl">SEC</div>
            </div>
          </div>
        </section>

        <div className="headrow" aria-hidden="true">
          <div>#</div>
          <div>Username</div>
          <div style={{ textAlign: "right" }}>Wagered</div>
          <div className="prize-head" style={{ textAlign: "right" }}>
            Reward
          </div>
        </div>

        <section className="list" aria-label="Leaderboard positions 4–10">
          {LEADERBOARD.slice(3).map((u) => {
            const pct = ((u.wagered / maxWager) * 100).toFixed(1);
            return (
              <div className="row" key={u.rank}>
                <div className="ribbon" aria-hidden="true" />
                <div className="rank">
                  <div className="chip">#{u.rank}</div>
                </div>
                <div className="user">
                  <img className="avatar-sm" src={AVATAR_URL(u.avatarSeed)} alt="" loading="lazy" />
                  <div style={{ minWidth: 0 }}>
                    <div className="uname">{u.username}</div>
                  </div>
                </div>

                <div className="val">
                  ${fmt$(u.wagered)}
                  <small>Wagered</small>
                  {/* bar exists in CSS — keep it available if you want to show it later */}
                  <div className="bar" aria-hidden="true" style={{ display: "none" }}>
                    <i style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <div className="val reward prizecol">
                  ${fmt$(u.prize)}
                  <small>Reward</small>
                </div>
              </div>
            );
          })}
        </section>
      </main>

      <footer>
        <p>
          Gamble responsibly (18+). Only gamble what you can afford to lose. This site is for entertainment and
          promotional tracking.
        </p>
        <p>© {new Date().getFullYear()} sixchris</p>
      </footer>

      <Toast
        show={toast.show}
        text={toast.text}
        onHide={() => setToast((p) => ({ ...p, show: false }))}
      />
    </>
  );
}