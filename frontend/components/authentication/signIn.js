import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import React, { useCallback, useEffect, useState } from "react";
import { CURRENT_USER_QUERY } from "./useUser";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [signIn, { data, error }] = useMutation(SIGNIN_MUTATION);

  const onSubmit = useCallback(
    async (data) => {
      await signIn({
        variables: { ...data },
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        errorPolicy: "all",
      });
    },
    [CURRENT_USER_QUERY, signIn]
  );

  useEffect(() => {
    if (data?.authenticateUserWithPassword) {
      router.push("/contribute");
    }
  }, [data]);

  const error2 =
    data?.authenticateUserWithPassword?.code === "FAILURE"
      ? data.authenticateUserWithPassword
      : undefined;

  return (
    <div>
      <h2 className="sr-only">Sign In</h2>
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <div>
            <label htmlFor="email">Email</label>
            <input
              placeholder="ramona.flowers77@gmail.com"
              {...register("email", { required: true, minLength: 8 })}
            />
            {errors.email && <span>This feels obvious...</span>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="holdontoyourbutts"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && (
              <span>
                If you forgot, you can reset it by clicking "reset password" to
                your left.
              </span>
            )}
          </div>

          <button>Sign in</button>
          <ErrorMessage error={error || error2} />
        </fieldset>
      </form>
    </div>
  );
};
