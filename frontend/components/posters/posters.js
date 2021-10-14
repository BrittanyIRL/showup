import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

export const ALL_POSTERS_QUERY = gql`
  query ALL_POSTERS_QUERY {
    allPosters {
      id
      headliner
      supportingActs
      venue
      date
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
  const { data, error, loading } = useQuery(ALL_POSTERS_QUERY);
  const gridRef = useRef();
  const gridItems = useRef({});

  const resizeGridItem = useCallback((item) => {
    if (!gridRef.current) {
      return;
    }
    const rowHeight = parseInt(
      window
        ?.getComputedStyle(gridRef?.current)
        .getPropertyValue("grid-auto-rows")
    );
    const rowGap = parseInt(
      window?.getComputedStyle(gridRef.current).getPropertyValue("grid-row-gap")
    );
    const rowSpan = Math.ceil(
      (item.querySelector(".content").getBoundingClientRect().height + rowGap) /
        (rowHeight + rowGap)
    );
    item.style.gridRowEnd = `span ${rowSpan}`;
  }, []);

  const resizeGridItems = useCallback(() => {
    if (!gridItems.current) {
      return undefined;
    }
    Object.values(gridItems.current).map((item) => {
      resizeGridItem(item);
    });
  }, [resizeGridItem]);

  useLayoutEffect(() => {
    if (!gridRef.current) {
      return null;
    }
    resizeGridItems();
  }, [resizeGridItems]);

  useEffect(() => {
    if (!gridRef?.current) {
      return undefined;
    }

    const observer = new ResizeObserver((entries) => {
      window.requestAnimationFrame(() => {
        const last =
          entries?.length !== undefined && entries?.length > 0
            ? entries[entries.length - 1]
            : null;
        if (last) {
          resizeGridItems();
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
  console.log("data", { data });
  return (
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
  );
}
