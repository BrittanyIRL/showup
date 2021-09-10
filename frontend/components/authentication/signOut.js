import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import styled from "styled-components";
import { CURRENT_USER_QUERY } from "./useUser";

const SignOutButton = styled.button`
  padding: 0;
  margin-right: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.blue};
  text-decoration: none;
  border-bottom: ${({ theme }) => `2px dashed ${theme.colors.blue}`};
  text-align: left;
  display: inline;

  &:hover {
    font-style: italic;
    border-bottom: ${({ theme }) => `2px dashed ${theme.colors.yellow}`};
  }
`;

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
  return <SignOutButton onClick={handleSignOut}>Sign out</SignOutButton>;
};
