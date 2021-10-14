import { Navigation } from "./";

export default function Header() {
  return (
    <header>
      <h1 className="sr-only">Show Up</h1>
      <button>TOGGLE TODO </button>
      <Navigation />
    </header>
  );
}
