import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { ALL_POSTERS_QUERY } from "../";
import Router from "next/router";

const CREATE_POSTER_MUTATION = gql`
  mutation CREATE_POSTER_MUTATION(
    $headliner: String!
    $venue: String!
    $image: Upload
    $altText: String
  ) {
    createPoster(
      data: {
        headliner: $headliner
        venue: $venue
        image: { create: { image: $image, altText: $altText } }
      }
    ) {
      id
    }
  }
`;

export default function CreatePoster() {
  const { headlinerValue, setHeadlinerValue } = useState("");

  const [createPoster, { loading, error, data }] = useMutation(
    CREATE_POSTER_MUTATION,
    {
      variables: {
        headliner: headlinerValue,
      },
      refetchQueries: [{ query: ALL_POSTERS_QUERY }],
    }
  );
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await createPoster();

        Router.push({
          pathname: `/poster/${response.data.createPoster.id}`,
        });
        // todo add clear
        // send to newly created poster
      }}
    >
      <fieldset>
        <label>Headliner</label>
        <input
          value={headlinerValue}
          onChange={(e) => setHeadlinerValue(e.currentTarget.value)}
        />
      </fieldset>
    </form>
  );
}
