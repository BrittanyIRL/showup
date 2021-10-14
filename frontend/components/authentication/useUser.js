import { gql, useQuery } from "@apollo/client";
import { useMemo } from "react";

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        role {
          name
        }
      }
    }
  }
`;

const rolesAllowedToContribute = ["admin", "verified"];

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);

  return useMemo(
    () => ({
      user: data?.authenticatedItem,
      isVerified:
        rolesAllowedToContribute.indexOf(data?.authenticatedItem?.role?.name) >
        -1,
    }),
    [data]
  );
}

export { CURRENT_USER_QUERY };
