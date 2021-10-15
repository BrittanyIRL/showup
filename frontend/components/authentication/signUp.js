import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CURRENT_USER_QUERY } from "./useUser";
import { ErrorMessage } from "..";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [signUp, { data, error }] = useMutation(SIGNUP_MUTATION);

  const onSubmit = useCallback(
    async (data) => {
      await signUp({
        variables: { ...data },
        errorPolicy: "all",
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
      });
    },
    [signUp, CURRENT_USER_QUERY]
  );

  useEffect(() => {
    if (data?.createUser) {
      router.push("/access");
    }
  }, [data]);

  // TODO consolidate with other error up above
  const error2 =
    data?.authenticateUserWithPassword?.code === "FAILURE"
      ? data.authenticateUserWithPassword
      : undefined;

  return (
    <div>
      <h2 className="form-title">Sign Up</h2>{" "}
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <div>
            <label htmlFor="reason">What brings you here to contribute?</label>
            <textarea
              rows="5"
              placeholder="Are you an artist or band member? Member of a street team or work at a venue? Basically, convince me you aren't a bot or a troll."
              {...register("reason", { required: true, minLength: 8 })}
            />
            {errors.reason && (
              <span>
                This helps me figure out who is using this tool and who to reach
                out to.
              </span>
            )}
          </div>
          <div>
            <label htmlFor="affiliation">
              If you're affiliated with a label, band, company, etc - please
              list it here.
            </label>
            <input
              placeholder="Wyld Stalyns Street Team"
              {...register("affiliation", { required: true })}
            />
            {errors.reason && (
              <span>
                Please include this, it helps me know you're legit. If it
                doesn't apply to you - use this field to say why.
              </span>
            )}
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              placeholder="Ramona Flowers"
              {...register("name", { required: true })}
            />
            {errors.name && <span>This feels obvious...</span>}
          </div>
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
            {errors.password && <span>This feels obvious...</span>}
          </div>
          <button className="form-button">Sign up</button>
          <ErrorMessage error={error || error2} />
        </fieldset>
      </form>
    </div>
  );
};
