"use client";

import { useRef } from "react";

const routeMap = {
  "dashboard.html": "/dashboard",
  "suppliers.html": "/suppliers",
  "products.html": "/products",
  "stock_in.html": "/stock-in",
  "stock_out.html": "/stock-out",
  "batches.html": "/batches",
  "expire_returns.html": "/expire-returns",
  "expired_history.html": "/expired-history",
  "damaged_manage.html": "/damaged-manage",
  "analysis_expire_damage.html": "/analysis-expire-damage",
  "login.html": "/login"
};

export default function LegacyFrame({ src, title }) {
  const frameRef = useRef(null);

  function handleLoad() {
    const frame = frameRef.current;
    const doc = frame?.contentDocument;
    if (!doc) return;

    doc.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      const route = routeMap[href];
      if (!route) return;

      link.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = route;
      });
    });
  }

  return (
    <iframe
      ref={frameRef}
      title={title || "Legacy"}
      src={src}
      onLoad={handleLoad}
      style={{
        width: "100%",
        height: "100vh",
        border: 0,
        display: "block",
        background: "#fff"
      }}
    />
  );
}

