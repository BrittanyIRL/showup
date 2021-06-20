import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useCallback, useEffect, useState } from "react";
import { ErrorMessage } from "..";

const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation REQUEST_PASSWORD_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      message
      code
    }
  }
`;
export const RequestReset = () => {
  const [formValues, setFormValues] = useState({
    email: "",
  });

  const [requestReset, { data }] = useMutation(
    REQUEST_PASSWORD_RESET_MUTATION,
    {
      variables: formValues,
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const updateInput = useCallback((event, updateKey) => {
    event.preventDefault();
    setFormValues((existingValues) => {
      return { ...existingValues, [updateKey]: event.target.value };
    });
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const res = await requestReset();
    console.log({ res });
  }, []);
  console.log({ data });

  const error = undefined;

  console.log({ error });
  return (
    <div>
      <h2>Reset Password</h2>
      <form method="POST" onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="name">Email</label>
          <input
            name="email"
            id="email"
            autoComplete="email"
            type="text"
            placeholder="ramona.flowers77@gmail.com"
            value={formValues?.email || ""}
            onChange={(e) => updateInput(e, "email")}
          />
          <button>Reset Password</button>
          {data?.sendUserPasswordResetLink === null && (
            <p>Check your email for a link to finish resetting your password</p>
          )}
          <ErrorMessage error={error} />
        </fieldset>
      </form>
    </div>
  );
};
