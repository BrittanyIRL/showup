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
            <a className="headerContent" isActive={asPath === "/"}>
              Main
            </a>
          </Link>
          <Link href="/contribute" passHref>
            <a className="headerContent" isActive={asPath === "/contribute"}>
              Contributions
            </a>
          </Link>
          {isVerified && (
            <Link href="/add" passHref>
              <a className="headerContent">Add New</a>
            </Link>
          )}

          <SignOut />
        </>
      )}
      {!user && (
        <>
          <Link href="/requestAccess" passHref>
            <a className="headerContent" isActive={asPath === "/access"}>
              Get Started
            </a>
          </Link>
          <Link href="/access" passHref>
            <a className="headerContent" isActive={asPath === "/access"}>
              Access
            </a>
          </Link>
        </>
      )}
    </nav>
  );
}
