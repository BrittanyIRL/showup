import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useCallback, useState } from "react";
import { ErrorMessage } from "..";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;
export const ResetForm = ({ token }) => {
  const [formValues, setFormValues] = useState({
    token,
    email: "",
    password: "",
  });

  const [resetPassword, { data, error }] = useMutation(RESET_MUTATION, {
    variables: formValues,
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const updateInput = useCallback((event, updateKey) => {
    event.preventDefault();
    setFormValues((existingValues) => {
      return { ...existingValues, [updateKey]: event.target.value };
    });
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    await resetPassword();
  }, []);
  console.log({ data });

  const deepError = data?.redeemUserPasswordResetToken?.message
    ? data.authenticateUserWithPassword
    : undefined;

  console.log({ error });
  return (
    <div>
      <h2>Reset Password</h2>{" "}
      <form method="POST" onSubmit={handleSubmit}>
        <fieldset>
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
          {data?.redeemUserPasswordResetToken === null && (
            <p>Password reset. Login.</p>
          )}
          <ErrorMessage error={error || deepError} />
        </fieldset>
      </form>
    </div>
  );
};
