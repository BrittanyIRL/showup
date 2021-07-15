import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useCallback } from "react";
import Router from "next/router";
import { CONTRIBUTOR_POSTERS_QUERY } from "../posters/contributorPosters";

const REMOVE_POSTER_MUTATION = gql`
  mutation REMOVE_POSTER_MUTATION($id: ID!) {
    deletePoster(id: $id) {
      id
    }
  }
`;

export default function DeletePoster({ id }) {
  const [deletePoster, { loading }] = useMutation(REMOVE_POSTER_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CONTRIBUTOR_POSTERS_QUERY }],
  });

  const handleDelete = useCallback(async () => {
    await deletePoster();
    Router.push({
      pathname: `/contribute`,
    });
  });

  return (
    <button onClick={handleDelete} disabled={loading}>
      Remove
    </button>
  );
}
