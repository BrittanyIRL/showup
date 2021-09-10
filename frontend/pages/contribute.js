import Link from "next/link";
import { useMemo } from "react";
import { useUser } from "../components";
import ContributorPosters from "../components/posters/contributorPosters";
const rolesAllowedToContribute = ["admin", "verified"];

export default function Account() {
  const user = useUser();

  const isVerified = useMemo(
    () => rolesAllowedToContribute.indexOf(user?.role?.name) > -1,
    [user]
  );
  return <ContributorPosters userId={user?.id} isVerified={isVerified} />;
}
