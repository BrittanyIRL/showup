import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CURRENT_USER_QUERY } from "./useUser";
import { ErrorMessage } from "..";
import { SIGNIN_MUTATION } from "./signIn";
import { useRouter } from "next/router";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $affiliation: String!
    $reason: String!
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(
      data: {
        affiliation: $affiliation
        reason: $reason
        email: $email
        name: $name
        password: $password
      }
    ) {
      id
      affiliation
      reason
      email
      name
    }
  }
`;
export const SignUp = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    affiliation: "",
    reason: "",
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const canSubmit = useMemo(
    () => Object.values(formValues).every((val) => val.length > 4),
    [formValues]
  );

  const [signUp, { data, error }] = useMutation(SIGNUP_MUTATION, {
    variables: formValues,
    errorPolicy: "all",
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const [signIn] = useMutation(SIGNIN_MUTATION);

  const updateInput = useCallback((event, updateKey) => {
    event.preventDefault();
    setFormValues((existingValues) => {
      return { ...existingValues, [updateKey]: event.target.value };
    });
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    await signUp();
  }, []);

  const handleLogin = useCallback(async () => {
    const returnedSignIn = await signIn({
      variables: formValues,
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    if (returnedSignIn) {
      router.push("/contribute");
    }
  }, [formValues]);

  useEffect(() => {
    if (data?.createUser) {
      handleLogin();
    }
  }, [data]);

  // TODO consolidate with other error up above
  const error2 =
    data?.authenticateUserWithPassword?.code === "FAILURE"
      ? data.authenticateUserWithPassword
      : undefined;

  return (
    <div className="form-container">
      <h2>Sign Up</h2>{" "}
      <form method="POST" onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="reason">What brings you here to contribute?</label>
          <textarea
            name="reason"
            id="reason"
            rows="5"
            placeholder="Are you an artist or band member? Member of a street team or work at a venue? Basically, convince me you aren't a bot or a troll."
            value={formValues?.reason || ""}
            onChange={(e) => updateInput(e, "reason")}
          />
          <label htmlFor="affiliation">
            If you're affiliated with a label, band, company, etc - please list
            it here.
          </label>
          <input
            name="affiliation"
            id="affiliation"
            type="text"
            placeholder="Wyld Stalyns Street Team"
            value={formValues?.affiliation || ""}
            onChange={(e) => updateInput(e, "affiliation")}
          />
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            autoComplete="name"
            type="text"
            placeholder="Ramona Flowers"
            value={formValues?.name || ""}
            onChange={(e) => updateInput(e, "name")}
          />
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
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="holdontoyourbutts"
            value={formValues?.password || ""}
            onChange={(e) => updateInput(e, "password")}
          />
          <button className="form-button" disabled={!canSubmit}>
            Sign up
          </button>
          <ErrorMessage error={error || error2} />
        </fieldset>
      </form>
    </div>
  );
};
