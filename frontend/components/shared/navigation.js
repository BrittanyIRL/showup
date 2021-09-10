import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import styled from "styled-components";
import { SignOut, useUser } from "../";

const _Navigation = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  @media only screen and (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const StyledLink = styled.a`
  margin: 0 2em 0 0;
  color: ${({ isActive, theme }) => theme.colors[isActive ? "yellow" : "blue"]};
  border-color: ${({ isActive, theme }) =>
    theme.colors[isActive ? "yellow" : "blue"]};
  cursor: ${({ isActive }) => (isActive ? "default" : "pointer")};
  font-style: ${({ isActive }) => (isActive ? "italic" : "default")};
`;
const rolesAllowedToContribute = ["admin", "verified"];

export default function Navigation() {
  const user = useUser();
  const isVerified = useMemo(
    () => rolesAllowedToContribute.indexOf(user?.role?.name) > -1,
    [user]
  );
  const { asPath } = useRouter();
  return (
    <_Navigation>
      {user && (
        <>
          <Link href="/" passHref>
            <StyledLink isActive={asPath === "/"}>Main</StyledLink>
          </Link>
          <Link href="/contribute" passHref>
            <StyledLink isActive={asPath === "/contribute"}>
              Contributions
            </StyledLink>
          </Link>
          {isVerified && (
            <Link href="/add" passHref>
              <StyledLink>Add New</StyledLink>
            </Link>
          )}

          <SignOut />
        </>
      )}
      {!user && (
        <Link href="/access" passHref>
          <StyledLink isActive={asPath === "/access"}>Access</StyledLink>
        </Link>
      )}
    </_Navigation>
  );
}
