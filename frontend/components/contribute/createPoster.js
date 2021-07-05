import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { ALL_POSTERS_QUERY } from "../";
import Router from "next/router";
import useForm from "../hooks/useForm";
import { useUser } from "../authentication";
import { CONTRIBUTOR_POSTERS_QUERY } from "../posters/contributorPosters";

const CREATE_POSTER_MUTATION = gql`
  mutation CREATE_POSTER_MUTATION(
    $headliner: String!
    $venue: String!
    $image: Upload
    $altText: String
    $creator: String!
    $createdDate: String
    $city: String!
    $state: String!
    $date: String
    $supportingActs: String!
  ) {
    createPoster(
      data: {
        headliner: $headliner
        venue: $venue
        creator: $creator
        createdDate: $createdDate
        city: $city
        state: $state
        date: $date
        supportingActs: $supportingActs
        image: { create: { image: $image, altText: $altText } }
      }
    ) {
      id
    }
  }
`;

export default function CreatePoster() {
  const user = useUser();

  const { inputs, handleChange, resetForm } = useForm({
    image: "",
    altText: "some alt text for poster",
    headliner: "New Order",
    supportingActs: "Pet Shop Boys",
    venue: "Crocodile",
    city: "Cloud city",
    state: "CA",
    createdDate: "todo because dates are always hard",
    date: "todo because dates are always hard",
  });

  const [createPoster, { loading, error, data }] = useMutation(
    CREATE_POSTER_MUTATION,
    {
      variables: { ...inputs, creator: user?.id },
      refetchQueries: [{ query: CONTRIBUTOR_POSTERS_QUERY }],
    }
  );
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await createPoster();
        Router.push({
          pathname: `/contribute`,
        });

        resetForm();
      }}
    >
      <fieldset>
        <label htmlFor="image">Poster</label>
        <input
          required
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
        />
        <label htmlFor="altText">Poster Description</label>
        <input
          name="altText"
          id="altText"
          type="text"
          placeholder="The Wyld Stalyns"
          value={inputs.altText}
          onChange={handleChange}
        />
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

// TODO add validation on input fields
