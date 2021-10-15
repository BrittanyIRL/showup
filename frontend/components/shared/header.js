import { useState } from "react";
import { Navigation } from "./";

export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <header
      className={[
        isExpanded ? "header-expanded" : "header-collapsed",
        "header-base",
      ].join(" ")}
    >
      <h1 className="sr-only">Show Up</h1>
      <button
        onClick={() => {
          setIsExpanded((currentTog) => !currentTog);
        }}
        className="toggle-button"
      >
        {isExpanded ? "close <" : "open >"}
      </button>
      {isExpanded && <Navigation />}
    </header>
  );
}
