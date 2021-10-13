import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { SignOut, useUser } from "../";

const rolesAllowedToContribute = ["admin", "verified"];

export default function Navigation() {
  const user = useUser();
  const isVerified = useMemo(
    () => rolesAllowedToContribute.indexOf(user?.role?.name) > -1,
    [user]
  );
  const { asPath } = useRouter();
  return (
    <nav>
      {user && (
        <>
          <Link href="/" passHref>
            <a isActive={asPath === "/"}>Main</a>
          </Link>
          <Link href="/contribute" passHref>
            <a isActive={asPath === "/contribute"}>Contributions</a>
          </Link>
          {isVerified && (
            <Link href="/add" passHref>
              <a>Add New</a>
            </Link>
          )}

          <SignOut />
        </>
      )}
      {!user && (
        <Link href="/access" passHref>
          <a isActive={asPath === "/access"}>Access</a>
        </Link>
      )}
    </nav>
  );
}
