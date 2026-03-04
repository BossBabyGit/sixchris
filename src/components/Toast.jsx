import React, { useEffect } from "react";

export default function Toast({ show, text, onHide, duration = 1500 }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => onHide?.(), duration);
    return () => clearTimeout(t);
  }, [show, duration, onHide]);

  return (
    <div className={`toast ${show ? "show" : ""}`} role="status" aria-live="polite">
      {text}
    </div>
  );
}