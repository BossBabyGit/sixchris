import React, { useEffect, useRef, useState } from "react";
import Toast from "../components/Toast";

const CODE = "sixchris";

export default function Signup() {
  const [toast, setToast] = useState({ show: false, text: "" });
  const wrapRef = useRef(null);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    root.querySelectorAll(".step, .cta-section").forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, []);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(CODE);
    } catch {}
    setToast({ show: true, text: `Copied: ${CODE}` });
  }

  return (
    <>
      <main className="wrap" ref={wrapRef}>
        <section className="hero">
          <h1>How to Sign Up</h1>
          <p className="sub">
            Getting started takes less than 2 minutes. Follow these steps, use code <b>{CODE}</b>, and start competing
            for prizes.
          </p>
        </section>

        <div className="steps">
          {/* Step 1 */}
          <div className="step">
            <div className="step-text">
              <div className="step-num" data-n="1">
                Step One
              </div>
              <h2>Create Your Account</h2>
              <p>
                Head over to BitFortune and click the <strong>Sign Up</strong> button. Fill in your details to get your
                account created in seconds. Make sure you use a valid email so you can verify your account right away.
              </p>
              <div className="step-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(227,185,61,.8)" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Takes less than 60 seconds
              </div>
            </div>

            <div className="step-img">
              <div className="orb orb-tl" />
              <div className="img-card">
                <div className="mock">
                  <div className="mock-icon">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(227,185,61,.9)"
                      strokeWidth="1.8"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="mock-bars">
                    <div className="mock-bar">
                      <i style={{ width: "80%" }} />
                    </div>
                    <div className="mock-bar">
                      <i style={{ width: "60%" }} />
                    </div>
                    <div className="mock-bar">
                      <i style={{ width: "70%" }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="float-badge">
                Account <b>Created</b>
              </div>
              <div className="orb orb-br" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="step">
            <div className="step-img">
              <div className="orb orb-tl" />
              <div className="img-card">
                <div className="mock">
                  <div className="mock-icon">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(227,185,61,.9)"
                      strokeWidth="1.8"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div
                      style={{
                        fontFamily: "'Allerta Stencil',sans-serif",
                        color: "var(--gold)",
                        fontSize: 18,
                        letterSpacing: 2,
                      }}
                    >
                      {CODE}
                    </div>
                    <div
                      style={{
                        height: 2,
                        width: 80,
                        background: "linear-gradient(90deg,transparent,rgba(227,185,61,.7),transparent)",
                        borderRadius: 999,
                      }}
                    />
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>Referral Code</div>
                  </div>
                </div>
              </div>
              <div className="float-badge">
                Code <b>Applied</b>
              </div>
              <div className="orb orb-br" />
            </div>

            <div className="step-text">
              <div className="step-num" data-n="2">
                Step Two
              </div>
              <h2>Enter the Referral Code</h2>
              <p>
                During registrationor in your account settings, find the Referral Code field and enter{" "}
                <strong style={{ color: "var(--gold)" }}>{CODE}</strong>. This is required to be eligible for the monthly
                leaderboard and any exclusive bonuses tied to the code.
              </p>
              <div className="step-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(227,185,61,.8)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                No code = no leaderboard eligibility
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="step">
            <div className="step-text">
              <div className="step-num" data-n="3">
                Step Three
              </div>
              <h2>Make Your First Deposit</h2>
              <p>
                Head to the cashier and make your first deposit using any of the supported payment methods. BitFortune
                supports crypto and other methods for fast, easy funding. Even a small deposit gets you on the board and
                competing.
              </p>
              <div className="step-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(227,185,61,.8)" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                Crypto &amp; more accepted
              </div>
            </div>

            <div className="step-img">
              <div className="orb orb-tl" />
              <div className="img-card">
                <div className="mock">
                  <div className="mock-icon">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(227,185,61,.9)"
                      strokeWidth="1.8"
                    >
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div className="mock-bars">
                    <div className="mock-bar">
                      <i style={{ width: "90%" }} />
                    </div>
                    <div className="mock-bar">
                      <i style={{ width: "45%" }} />
                    </div>
                    <div className="mock-bar">
                      <i style={{ width: "65%" }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="float-badge">
                Deposit <b>Confirmed</b>
              </div>
              <div className="orb orb-br" />
            </div>
          </div>

          {/* Step 4 */}
          <div className="step">
            <div className="step-img">
              <div className="orb orb-tl" />
              <div className="img-card">
                <div className="mock">
                  <div className="mock-icon">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(227,185,61,.9)"
                      strokeWidth="1.8"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 140 }}>
                    {[
                      { n: "#1", bg: "rgba(227,185,61,.25)", br: "rgba(227,185,61,.4)", bar: "rgba(227,185,61,.35)" },
                      { n: "#2", bg: "rgba(255,255,255,.07)", br: "rgba(255,255,255,.10)", bar: "rgba(255,255,255,.12)" },
                      { n: "#3", bg: "rgba(255,255,255,.07)", br: "rgba(255,255,255,.10)", bar: "rgba(255,255,255,.08)" },
                    ].map((x) => (
                      <div key={x.n} style={{ display: "flex", gap: 6, alignItems: "center", width: "100%" }}>
                        <div
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 999,
                            background: x.bg,
                            border: `1px solid ${x.br}`,
                            display: "grid",
                            placeItems: "center",
                            fontSize: 9,
                            fontFamily: "'Allerta Stencil',sans-serif",
                          }}
                        >
                          {x.n}
                        </div>
                        <div style={{ height: 8, flex: 1, borderRadius: 999, background: x.bar }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="float-badge">
                You&apos;re <b>Competing</b>
              </div>
              <div className="orb orb-br" />
            </div>

            <div className="step-text">
              <div className="step-num" data-n="4">
                Step Four
              </div>
              <h2>Start Playing &amp; Climb the Board</h2>
              <p>
                Now the fun starts. Play any eligible games on BitFortune and your wager total will automatically count
                toward the monthly leaderboard. The more you wager, the higher you climb. Top spots win up to{" "}
                <strong style={{ color: "var(--gold)" }}>$2,000</strong> every month.
              </p>
              <div className="step-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(227,185,61,.8)" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Top 10 win prizes every month
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section" id="ctaSection">
          <div className="cta-box">
            <h2>Ready to Start?</h2>
            <p>
              Sign up at BitFortune, use code <b style={{ color: "var(--gold)" }}>{CODE}</b>, and you&apos;re in the
              running for this month&apos;s $5,000 prize pool.
            </p>

            <div className="code-strip">
              Code: <b>{CODE}</b>
              <button className="btn-copy" onClick={copyCode}>
                Copy
              </button>
            </div>

            <button className="btn-main" onClick={() => window.open("#", "_blank")}>
              Sign Up at BitFortune →
            </button>
          </div>
        </div>
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