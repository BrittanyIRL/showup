import Link from "next/link";
import { SignOut, useUser } from "../";

export default function Navigation() {
  const user = useUser();
  return (
    <>
      <Link href="/">basic shit</Link>
      {user && (
        <>
          <Link href="/contribute">Contribute</Link>
          <SignOut />
        </>
      )}
      {!user && (
        <>
          <Link href="/access">Access</Link>
        </>
      )}
    </>
  );
}
