import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import React, { useCallback } from "react";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [requestReset, { data, error }] = useMutation(
    REQUEST_PASSWORD_RESET_MUTATION
  );

  const onSubmit = useCallback(
    async (data) => {
      await requestReset({
        variables: { ...data },
      });
    },
    [requestReset]
  );

  return (
    <div className="full-length-rows">
      <h2 className="form-title">Update Password</h2>
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <div>
            <label htmlFor="name">Email</label>
            <input
              placeholder="ramona.flowers77@gmail.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span>We need your email to send you a password reset.</span>
            )}
          </div>
          <div>
            <button>Reset Password</button>
          </div>
          {data?.sendUserPasswordResetLink === null && (
            <p>Check your email for a link to finish resetting your password</p>
          )}
          <ErrorMessage error={error} />
        </fieldset>
      </form>
    </div>
  );
};
