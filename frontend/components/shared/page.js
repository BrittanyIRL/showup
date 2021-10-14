import { Header } from "./";

export default function Page({ children }) {
  return (
    <div className="main">
      <Header />
      {children}
    </div>
  );
}
