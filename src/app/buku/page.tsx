"use client";

import React from "react";

export default function BukuPage() {
  return (
    <main
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        overflow: "hidden",
        backgroundColor: "#171a24"
      }}
    >
      <iframe
        title="Complete Shelf"
        src="/landing-pages/complete-shelf-v2.html"
        allow="autoplay; fullscreen; gamepad"
        sandbox="allow-forms allow-modals allow-downloads allow-popups allow-scripts allow-same-origin"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          border: 0,
        }}
      />
    </main>
  );
}
