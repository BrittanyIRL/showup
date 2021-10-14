import Link from "next/link";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import { SignOut, useUser } from "../";

const protectedPaths = ["/add", "/contribute"];

export default function Navigation() {
  const { user, isVerified } = useUser();

  const router = useRouter();
  const { asPath } = router;

  // TODO this should happen server side but I'm a next js baby
  // sometimes the login doesnt happen in time for this to get skipped so user goes to main
  useLayoutEffect(() => {
    if (!user && protectedPaths.indexOf(asPath) > -1) {
      router.push("/");
    } else if (!isVerified && asPath === "/add") {
      router.push("/contribute");
    }
  }, [asPath, user, router]);

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
