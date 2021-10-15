import { useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import { format } from "date-fns";
import gql from "graphql-tag";
import DatePicker from "react-datepicker";
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
    $artist: String
    $creator: String!
    $createdDate: String!
    $city: String!
    $state: String!
    $date: String!
    $supportingActs: String
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
        artist: $artist
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
  const { user } = useUser();
  const timestamp = format(new Date(), "yyyy-MM-dd");
  const [showDate, setShowDate] = useState(null);
  const { inputs, handleChange, resetForm } = useForm({
    image: "",
    altText: "",
    artist: "",
    headliner: "",
    supportingActs: "",
    venue: "",
    city: "",
    state: "",
    createdDate: timestamp,
  });

  const handleDateChange = useCallback((date) => {
    setShowDate(date);
  }, []);

  const [createPoster] = useMutation(CREATE_POSTER_MUTATION, {
    variables: {
      ...inputs,
      date: showDate?.toString(),
      creator: user?.id,
    },
    refetchQueries: [{ query: CONTRIBUTOR_POSTERS_QUERY, ALL_POSTERS_QUERY }],
    update(cache, { data: { createPoster } }) {
      try {
        const { allPosters } = cache.readQuery({
          query: CONTRIBUTOR_POSTERS_QUERY,
          variables: { userId: user.id },
        });

        cache.writeQuery({
          query: CONTRIBUTOR_POSTERS_QUERY,
          data: { allPosters: [...allPosters, createPoster] },
          variables: { userId: user.id },
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div>
      <h2 className="form-title">Add poster</h2>
      <p>All fields are required for the sake of archival purposes</p>

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
        <fieldset className="two-column-grid">
          <div>
            <label htmlFor="image">Poster</label>
            <input
              required
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="altText">Poster Description</label>
            <input
              name="altText"
              id="altText"
              type="text"
              placeholder="The Wyld Stalyns"
              value={inputs.altText}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="artist">Who made this poster?</label>
            <input
              name="artist"
              id="artist"
              type="text"
              placeholder="Jane Lane"
              value={inputs.artist}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="headliner">Headliner</label>
            <input
              name="headliner"
              id="headliner"
              type="text"
              placeholder="The Wyld Stalyns"
              value={inputs.headliner}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="supportingActs">Supporting Act</label>
            <input
              name="supportingActs"
              id="supportingActs"
              type="text"
              placeholder="Dujour"
              value={inputs.supportingActs}
              onChange={handleChange}
            />
            <p>Enter artists with commas to add multiple</p>
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              name="venue"
              id="venue"
              type="text"
              placeholder="Valley Bar"
              value={inputs.venue}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              name="city"
              id="city"
              type="text"
              placeholder="Phoenix"
              value={inputs.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              name="state"
              id="state"
              type="text"
              placeholder="AZ"
              value={inputs.state}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date of Show</label>
            <DatePicker
              name="date"
              id="date"
              autoComplete="none"
              selected={showDate}
              onChange={handleDateChange}
            />
          </div>
          <button>Add Show</button>
        </fieldset>
      </form>
    </div>
  );
}

// TODO add validation on input fields
