import Link from "next/link";

export default function Custom404() {
  return (
    <div className="one-column-grid">
      <div>
        <h2 className="sr-only">404 - page not found</h2>;
        <h3>Shoulda stayed at the bus station.</h3>
        <Link href="/" passHref>
          <a>Main Content</a>
        </Link>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/gtl7utkHApo?start=70"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}
