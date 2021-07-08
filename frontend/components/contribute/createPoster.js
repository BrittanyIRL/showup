import { useMutation } from "@apollo/client";
import { format } from "date-fns";
import gql from "graphql-tag";
import Router from "next/router";
import useForm from "../hooks/useForm";
import { useUser } from "../authentication";
import { ALL_POSTERS_QUERY } from "../posters";
import { CONTRIBUTOR_POSTERS_QUERY } from "../posters/contributorPosters";

const CREATE_POSTER_MUTATION = gql`
  mutation CREATE_POSTER_MUTATION(
    $headliner: String!
    $venue: String!
    $image: Upload
    $altText: String
    $creator: String!
    $createdDate: String!
    $city: String!
    $state: String!
    $date: String!
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
      headliner
      venue
      creator
      createdDate
      city
      state
      date
      supportingActs
      # image
      # altText
    }
  }
`;

export default function CreatePoster() {
  const user = useUser();
  const timestamp = format(new Date(), "yyyy-MM-dd");

  const { inputs, handleChange, resetForm } = useForm({
    image: "",
    altText: "some alt text for poster",
    headliner: "New Order",
    supportingActs: "Pet Shop Boys",
    venue: "Crocodile",
    city: "Cloud city",
    state: "CA",
    createdDate: timestamp,
    date: null,
  });

  const [createPoster] = useMutation(CREATE_POSTER_MUTATION, {
    variables: {
      ...inputs,
      date: format(new Date(inputs.date), "yyyy-MM-dd"),
      creator: user?.id,
    },
    update(cache, { data: { createPoster } }) {
      try {
        const { allPosters } = cache.readQuery({
          query: ALL_POSTERS_QUERY,
        });

        cache.writeQuery({
          query: ALL_POSTERS_QUERY,
          data: allPosters.concat([createPoster]),
        });
      } catch (error) {
        console.error(error);
      }
    },
    refetchQueries: [
      {
        query: CONTRIBUTOR_POSTERS_QUERY,
        variables: { userId: user?.id || null },
      },
    ],
  });
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

        <label htmlFor="date">Date of Show</label>
        <input
          name="date"
          id="date"
          type="date"
          value={inputs.date}
          onChange={handleChange}
        />

        <button>Add Show</button>
      </fieldset>
    </form>
  );
}

// TODO add validation on input fields
