import { Header } from "./";

export default function Page({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
