import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { useUser, CURRENT_USER_QUERY } from "./useUser";
import { ErrorMessage } from "..";
import { useRouter } from "next/router";

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;
export const SignIn = () => {
  const router = useRouter();
  const { user } = useUser();
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const [signIn, { data }] = useMutation(SIGNIN_MUTATION, {
    variables: formValues,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const updateInput = useCallback((event, updateKey) => {
    event.preventDefault();
    setFormValues((existingValues) => {
      return { ...existingValues, [updateKey]: event.target.value };
    });
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      await signIn();
    },
    [router]
  );

  useLayoutEffect(() => {
    if (user) {
      router.push("/contribute");
    }
  }, [user]);

  const error =
    data?.authenticateUserWithPassword?.code === "FAILURE"
      ? data.authenticateUserWithPassword
      : undefined;

  return (
    <div>
      <h2 className="sr-only">Sign In</h2>
      <form method="POST" onSubmit={handleSubmit}>
        <fieldset>
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              autoComplete="email"
              type="text"
              placeholder="ramona.flowers77@gmail.com"
              value={formValues?.email || ""}
              onChange={(e) => updateInput(e, "email")}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="holdontoyourbutts"
              value={formValues?.password || ""}
              onChange={(e) => updateInput(e, "password")}
            />
          </div>

          <button>Sign in</button>
          <ErrorMessage error={error} />
        </fieldset>
      </form>
    </div>
  );
};
