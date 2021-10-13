import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { CURRENT_USER_QUERY } from "./useUser";

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;
export const SignOut = () => {
  const router = useRouter();
  const [signOut] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSignOut = useCallback(async (event) => {
    event.preventDefault();
    await signOut();
    router.push("/");
  });
  return <button onClick={handleSignOut}>Sign out</button>;
};
