import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Router from "next/router";
import { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import useForm from "../hooks/useForm";
import { ALL_POSTERS_QUERY } from "../posters/posters";
import { CONTRIBUTOR_POSTERS_QUERY } from "../posters/contributorPosters";
import { useUser } from "..";
import { findAndUpdate } from "../../lib/findAndUpdate";

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
    }
  }
`;

export default function EditPoster({ id }) {
  const { user } = useUser();
  const { data, error, loading } = useQuery(SINGLE_POSTER_QUERY, {
    variables: { id },
  });
  const [showDate, setShowDate] = useState();
  useEffect(() => {
    if (!showDate && !loading) {
      const newDate = new Date(data?.Poster.date);
      setShowDate(newDate);
    }
  }, [showDate, loading, data]);

  const { inputs, handleChange, resetForm } = useForm(
    data?.Poster || {
      artist: "",
      headliner: "",
      supportingActs: "",
      venue: "",
      city: "",
      state: "",
    }
  );

  const handleDateChange = useCallback((date) => {
    console.log(date, typeof date, date.toString());
    setShowDate(date);
  }, []);

  const [
    updatePoster,
    { error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_POSTER_MUTATION, {
    variables: {
      ...inputs,
      date: showDate?.toString(),
      id,
    },
    refetchQueries: [{ query: CONTRIBUTOR_POSTERS_QUERY, ALL_POSTERS_QUERY }],
    update(cache, { data: { updatePoster } }) {
      try {
        const { allPosters } = cache.readQuery({
          query: CONTRIBUTOR_POSTERS_QUERY,
          variables: { userId: user.id },
        });
        const updatedData = allPosters.map(findAndUpdate(id, updatePoster));
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

  if (error) return <p>whoops</p>;
  if (loading) return <p>loading...</p>;

  return (
    <div>
      <h2 className="form-title">Update poster</h2>{" "}
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
        <div className="edit-image">
          <img src={data.Poster.image.image.publicUrlTransformed} />
        </div>
        <fieldset>
          <div>
            <label htmlFor="artist">Poster artist</label>
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
          <button>Update Show</button>
        </fieldset>
      </form>
    </div>
  );
}
