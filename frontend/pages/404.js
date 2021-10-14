import Link from "next/link";

export default function Custom404() {
  return (
    <div>
      <h2 className="sr-only">404 - page not found</h2>;
      <h3>Shoulda stayed at the bus stop</h3>
      <Link href="/" passHref>
        <a>Main Content</a>
      </Link>
    </div>
  );
}
