import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useCallback, useEffect, useState } from "react";
import { CURRENT_USER_QUERY } from "./useUser";
import { ErrorMessage } from "..";
import { SIGNIN_MUTATION } from "./signIn";
import { useRouter } from "next/router";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;
export const SignUp = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const [signUp, { data }] = useMutation(SIGNUP_MUTATION, {
    variables: formValues,
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
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
  console.log({ data });

  const handleLogin = useCallback(async () => {
    await signIn({
      variables: formValues,
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    router.push("/contribute");
  }, [formValues]);

  useEffect(() => {
    if (data?.createUser) {
      handleLogin();
    }
  }, [data]);

  const error =
    data?.authenticateUserWithPassword?.code === "FAILURE"
      ? data.authenticateUserWithPassword
      : undefined;

  console.log({ error });
  return (
    <div>
      <h2>Sign Up</h2>{" "}
      <form method="POST" onSubmit={handleSubmit}>
        <fieldset>
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
          <button>Sign up</button>
          <ErrorMessage error={error} />
        </fieldset>
      </form>
    </div>
  );
};
