import { useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import { format } from "date-fns";
import gql from "graphql-tag";

import Router from "next/router";
import { useForm } from "react-hook-form";
import { useUser } from "../authentication";
import { ALL_POSTERS_QUERY } from "../posters";
import { CONTRIBUTOR_POSTERS_QUERY } from "../posters/contributorPosters";
import DatePickerInput from "../shared/datePickerInput";

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
    }
  }
`;

export default function CreatePoster() {
  const { user } = useUser();
  const [showDate, setShowDate] = useState(null);
  const [showPoster, setShowPoster] = useState(null);
  const [customErrors, setCustomErrors] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(
    async (data) => {
      const timestamp = format(new Date(), "yyyy-MM-dd");
      if (!showDate) {
        setCustomErrors((existing) => ({
          ...existing,
          showDate: "Please add a valid date",
        }));
      }
      if (!showPoster) {
        setCustomErrors((existing) => ({
          ...existing,
          showPoster: "Please add an image for your poster",
        }));
      }
      if (!showDate || !showPoster) {
        return;
      }

      const posterData = {
        ...data,
        date: showDate.toString(),
        creator: user?.id,
        image: showPoster,
        createdDate: timestamp,
      };
      await createPoster({ variables: { ...posterData } });
      Router.push({
        pathname: `/contribute`,
      });
    },
    [showDate, showPoster, Router, createPoster]
  );

  const handleFileChange = useCallback(({ target }) => {
    setShowPoster(target.files[0]);
    setCustomErrors((existing) => ({ ...existing, showPoster: undefined }));
  }, []);

  const handleDateChange = useCallback((date) => {
    setShowDate(date);
    setCustomErrors((existing) => ({ ...existing, showDate: undefined }));
  }, []);

  const [createPoster] = useMutation(CREATE_POSTER_MUTATION, {
    refetchQueries: [{ query: CONTRIBUTOR_POSTERS_QUERY, ALL_POSTERS_QUERY }],
  });

  return (
    <div>
      <h2 className="form-title">Add poster</h2>
      <p>All fields are required for the sake of archival purposes</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="two-column-grid">
          <div>
            <label htmlFor="image">Poster</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
            />
            {customErrors.showPoster && <span>{customErrors.showPoster}</span>}
          </div>
          <div>
            <label htmlFor="altText">Poster Description</label>
            <input
              placeholder="The earth as viewed from the moon, there's a cow floating in a helmet."
              {...register("altText", { required: true, minLength: 3 })}
            />
            {errors.altText && (
              <span>
                A poster description is important for users who can't see the
                poster
              </span>
            )}
          </div>
          <div>
            <label htmlFor="artist">Who made this poster?</label>
            <input
              placeholder="Jane Lane"
              {...register("artist", { required: true, minLength: 3 })}
            />
            {errors.artist && <span>Gotta give credit where it's due!</span>}
          </div>
          <div>
            <label htmlFor="headliner">Headliner</label>
            <input
              placeholder="The Wyld Stalyns"
              {...register("headliner", { required: true, minLength: 3 })}
            />
            {errors.headliner && (
              <span>This is the main act of the event.</span>
            )}
          </div>
          <div>
            <label htmlFor="supportingActs">Supporting Act</label>
            <input placeholder="Dujour" {...register("supportingActs")} />
            <span>Enter artists with commas to add multiple</span>
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              placeholder="Cantina"
              {...register("venue", { required: true, minLength: 3 })}
            />
            {errors.venue && <span>Please add the place this show is at.</span>}
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              placeholder="Mos Eisley"
              {...register("city", { required: true, minLength: 3 })}
            />
            {errors.city && (
              <span>
                Please add the city (or nearest city) this event occurs.
              </span>
            )}
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              {...register("state", {
                required: true,
                minLength: 2,
                maxLength: 2,
              })}
              placeholder="AZ"
            />
            {errors.state && (
              <span>
                Please add the city (or nearest city) this event occurs.
              </span>
            )}
          </div>
          <div>
            <label htmlFor="date">Date of Show</label>
            <DatePickerInput
              value={showDate}
              handleDateChange={handleDateChange}
            />
            {customErrors.showDate && <span>{customErrors.showDate}</span>}
          </div>
          <button>Add Show</button>
        </fieldset>
      </form>
    </div>
  );
}

// TODO add validation on input fields
