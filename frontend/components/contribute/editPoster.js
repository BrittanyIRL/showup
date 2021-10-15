import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Router from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ALL_POSTERS_QUERY } from "../posters/posters";
import { CONTRIBUTOR_POSTERS_QUERY } from "../posters/contributorPosters";
import { useUser } from "..";
import DatePickerInput from "../shared/datePickerInput";

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
      artist
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
    $artist: String
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
        artist: $artist
      }
    ) {
      headliner
      supportingActs
      venue
      city
      state
      date
      artist
      id
    }
  }
`;

export default function EditPoster({ id }) {
  const { user } = useUser();
  const { data, error, loading } = useQuery(SINGLE_POSTER_QUERY, {
    variables: { id },
  });
  const [showDate, setShowDate] = useState();
  const [customErrors, setCustomErrors] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!showDate && !loading) {
      const newDate = new Date(data?.Poster.date);
      setShowDate(newDate);
    }
  }, [showDate, loading, data]);

  const handleDateChange = useCallback((date) => {
    setShowDate(date);
    setCustomErrors((existing) => ({ ...existing, showDate: undefined }));
  }, []);

  const [
    updatePoster,
    { error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_POSTER_MUTATION, {});

  const onSubmit = useCallback(
    async (data) => {
      if (!showDate) {
        setCustomErrors((existing) => ({
          ...existing,
          showDate: "Please add a valid date",
        }));
        return;
      }

      const posterData = {
        ...data,
        date: showDate.toString(),
        id,
      };
      await updatePoster({
        variables: { ...posterData },
        refetchQueries: [
          { query: CONTRIBUTOR_POSTERS_QUERY, ALL_POSTERS_QUERY },
        ],
      });
      Router.push({
        pathname: `/contribute`,
      });
    },
    [showDate, Router, CONTRIBUTOR_POSTERS_QUERY, updatePoster, id, user]
  );

  if (error) return <p>whoops</p>;
  if (loading) return <p>loading...</p>;

  return (
    <div>
      <h2 className="form-title">Update poster</h2>{" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="edit-image">
          <img src={data.Poster.image.image.publicUrlTransformed} />
        </div>
        <fieldset>
          <div>
            <label htmlFor="artist">Poster artist</label>
            <input
              placeholder="Jane Lane"
              defaultValue={data?.Poster?.artist}
              {...register("artist", { required: true, minLength: 3 })}
            />
            {errors.artist && <span>Gotta give credit where it's due!</span>}
          </div>
          <div>
            <label htmlFor="headliner">Headliner</label>
            <input
              defaultValue={data?.Poster?.headliner}
              placeholder="The Wyld Stalyns"
              {...register("headliner", { required: true, minLength: 3 })}
            />
            {errors.headliner && (
              <span>This is the main act of the event.</span>
            )}
          </div>
          <div>
            <label htmlFor="supportingActs">Supporting Act</label>
            <input
              placeholder="Dujour"
              defaultValue={data?.Poster?.supportingActs}
              {...register("supportingActs")}
            />
            <p>Enter artists with commas to add multiple</p>
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              defaultValue={data?.Poster?.venue}
              placeholder="Cantina"
              {...register("venue", { required: true, minLength: 3 })}
            />
            {errors.venue && <span>Please add the place this show is at.</span>}
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              defaultValue={data?.Poster?.city}
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
              placeholder="AZ"
              defaultValue={data?.Poster?.state}
              {...register("state", {
                required: true,
                minLength: 2,
                maxLength: 2,
              })}
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
          <button>Update Show</button>
        </fieldset>
      </form>
    </div>
  );
}
