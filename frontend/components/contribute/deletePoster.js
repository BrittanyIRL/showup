import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useCallback, useState } from "react";
import Router from "next/router";
import { CONTRIBUTOR_POSTERS_QUERY } from "../posters/contributorPosters";
import { useUser } from "..";
import { set } from "date-fns";

const REMOVE_POSTER_MUTATION = gql`
  mutation REMOVE_POSTER_MUTATION($id: ID!) {
    deletePoster(id: $id) {
      id
    }
  }
`;

export default function DeletePoster({ id }) {
  const [confirmationView, setConfirmationView] = useState(false);

  const user = useUser();

  const [deletePoster, { loading }] = useMutation(REMOVE_POSTER_MUTATION, {
    variables: { id },
    update(cache, { data: { updatePoster } }) {
      try {
        const { allPosters } = cache.readQuery({
          query: CONTRIBUTOR_POSTERS_QUERY,
          variables: { userId: user.id },
        });
        const updatedData = allPosters.filter((poster) => {
          console.log(poster);
          return poster.id !== id;
        });
        cache.writeQuery({
          query: CONTRIBUTOR_POSTERS_QUERY,
          data: { allPosters: updatedData },
          variables: { userId: user.id },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onDeleteConfirmation = useCallback(async () => {
    await deletePoster();
    setConfirmationView(false);
    Router.push({
      pathname: `/contribute`,
    });
  });

  const handleDelete = useCallback(async () => {
    setConfirmationView(true);
  });

  return confirmationView ? (
    <div className="delete-confirmation">
      <p>you sure?</p>
      <button onClick={onDeleteConfirmation} disabled={loading}>
        Yes
      </button>
      <button onClick={() => setConfirmationView(false)}>Nevermind</button>
    </div>
  ) : (
    <button onClick={handleDelete}>Remove</button>
  );
}
