import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const ALL_POSTERS_QUERY = gql`
  query ALL_POSTERS_QUERY {
    allPosters {
      id
      headliner
      supportingActs
      venue
      date
      city
      image {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Posters() {
  const [filterCity, setFilterCity] = useState(undefined);
  const { data, error, loading } = useQuery(ALL_POSTERS_QUERY, {
    variables: {
      city: filterCity,
    },
  });
  const gridRef = useRef();
  const gridItems = useRef({});
  const availableCities = useMemo(() => {
    return [...new Set(data?.allPosters)]
      .reduce((prevVal, { city = "" }) => {
        console.log(prevVal, city);
        if (prevVal?.indexOf(city.toLowerCase()) === -1) {
          return [...prevVal, city.toLowerCase()];
        } else {
          return prevVal;
        }
      }, [])
      .sort((a, b) => {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
      });
  }, [data]);

  const resizeGridItem = useCallback(({ item, container }) => {
    console.log(window, container);
    const rowHeight = parseInt(
      window?.getComputedStyle(container)?.getPropertyValue("grid-auto-rows")
    );
    const rowGap = parseInt(
      window?.getComputedStyle(container)?.getPropertyValue("grid-row-gap")
    );
    const rowSpan = Math.ceil(
      (item.querySelector(".content").getBoundingClientRect().height + rowGap) /
        (rowHeight + rowGap)
    );
    item.style.gridRowEnd = `span ${rowSpan}`;
  }, []);

  const resizeGridItems = useCallback(
    ({ items, container }) => {
      if (typeof window === "undefined" || window?.location?.pathname !== "/") {
        return undefined;
      }
      Object.values(items).map((item) => {
        resizeGridItem({ item, container });
      });
    },
    [resizeGridItem]
  );

  useEffect(() => {
    if (
      !gridRef?.current ||
      !gridItems?.current ||
      typeof window === "undefined"
    ) {
      return undefined;
    }

    const observer = new ResizeObserver((entries) => {
      window.requestAnimationFrame(() => {
        const last =
          entries?.length !== undefined && entries?.length > 0
            ? entries[entries.length - 1]
            : null;
        if (last) {
          resizeGridItems({
            container: gridRef.current,
            items: gridItems.current,
          });
        }
      });
    });
    observer.observe(gridRef.current);

    return () => observer.disconnect();
  }, [resizeGridItems]);

  if (loading) {
    return <p>{loading}</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {/* <div className="main-filters">
        <label for="cities">Pick a city</label>
        <select
          name="cities"
          id="cities"
          onChange={(e) => {
            setFilterCity(e.target.value);
          }}
        >
          <option value="all">All</option>
          {availableCities.map((city) => (
            <option value={city}>{city}</option>
          ))}
        </select>
      </div> */}
      <div className="main-grid" ref={gridRef}>
        {data.allPosters.map(
          ({ id, headliner, date, venue, supportingActs, image }) => (
            <div
              key={id}
              className="grid-item"
              ref={(element) => {
                gridItems.current[id] = element;
              }}
            >
              <img
                className="content"
                src={image.image.publicUrlTransformed}
                alt={`${headliner} with ${supportingActs} at ${venue}
        on ${date}`}
              />
            </div>
          )
        )}
      </div>
    </>
  );
}
