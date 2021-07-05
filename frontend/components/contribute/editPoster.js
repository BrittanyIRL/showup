import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Router from "next/router";
import React from "react";
import useForm from "../hooks/useForm";
import { CONTRIBUTOR_POSTERS_QUERY } from "../posters/contributorPosters";

const SINGLE_POSTER_QUERY = gql`
  query SINGLE_POSTER_QUERY($id: ID!) {
    Poster(where: { id: $id }) {
      id
      headliner
      supportingActs
      venue
      city
      state
      date
      image {
        altText
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const UPDATE_POSTER_MUTATION = gql`
  mutation UPDATE_POSTER_MUTATION(
    $headliner: String!
    $supportingActs: String!
    $venue: String!
    $city: String!
    $state: String!
    $date: String
    $id: ID!
  ) {
    updatePoster(
      id: $id
      data: {
        headliner: $headliner
        supportingActs: $supportingActs
        venue: $venue
        city: $city
        state: $state
        date: $date
      }
    ) {
      headliner
      supportingActs
      venue
      city
      state
      date
    }
  }
`;

export default function EditPoster({ id = "696969" }) {
  const { data, error, loading } = useQuery(SINGLE_POSTER_QUERY, {
    variables: { id },
  });

  const { inputs, handleChange, resetForm } = useForm(
    data?.Poster || {
      headliner: "",
      supportingActs: "",
      venue: "",
      city: "",
      state: "",
      date: "",
    }
  );

  const [
    updatePoster,
    { error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_POSTER_MUTATION, {
    variables: {
      ...inputs,
      id,
    },
    refetchQueries: [{ query: CONTRIBUTOR_POSTERS_QUERY }],
  });

  if (error) return <p>whoops</p>;
  if (loading) return <p>loading...</p>;

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await updatePoster();

        Router.push({
          pathname: `/contribute`,
        });

        resetForm();
      }}
    >
      <fieldset>
        <img src={data.Poster.image.image.publicUrlTransformed} />
        <label htmlFor="headliner">Headliner</label>
        <input
          name="headliner"
          id="headliner"
          type="text"
          placeholder="The Wyld Stalyns"
          value={inputs.headliner}
          onChange={handleChange}
        />
        <label htmlFor="supportingActs">Supporting Act</label>
        <p>Enter artists with commas to add multiple</p>
        <input
          name="supportingActs"
          id="supportingActs"
          type="text"
          placeholder="Dujour"
          value={inputs.supportingActs}
          onChange={handleChange}
        />
        <label htmlFor="venue">Venue</label>
        <input
          name="venue"
          id="venue"
          type="text"
          placeholder="Valley Bar"
          value={inputs.venue}
          onChange={handleChange}
        />
        <label htmlFor="city">City</label>
        <input
          name="city"
          id="city"
          type="text"
          placeholder="Phoenix"
          value={inputs.city}
          onChange={handleChange}
        />
        <label htmlFor="state">State</label>
        <input
          name="state"
          id="state"
          type="text"
          placeholder="AZ"
          value={inputs.state}
          onChange={handleChange}
        />
        {/* TODO this needs to get converted to a true date or YYY-MM-DD */}
        {/* <label htmlFor="date">Date of Show</label>
      <input
        name="date"
        id="date"
        type="date"
        value={inputs.date}
        onChange={handleChange}
      /> */}

        <button>Add Show</button>
      </fieldset>
    </form>
  );
}
