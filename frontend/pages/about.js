import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About Showup</title>
      </Head>
      <div className="one-column-grid">
        <div>
          <h2 className="about-header">About This Project</h2>
          <p>
            Over the last 15 years I've lived in 3 major cities, throughout that
            time a key way for me to find out what shows were coming through was
            by just walking around and seeing posters bands and street teams
            would put up for events. When I started learning to make apps I
            thought it would be cool to archive this art instead of being
            destroyed. Like everyone, I got busy with my actual career and this
            project got sidelined for long enough.
          </p>
          <p>
            So now we're here. This is Show Up! I invite you to add in your own
            posters for your band, venue, or that you were commissioned to do by
            creating an account and filling in forms. Otherwise, treat this site
            as you would a street pole. Acknowledge that there is no rhyme or
            reason to the view and that you can't click or share anything - just
            a place to recognize the beauty and effort all these talented humans
            put into making art that the rain strips away.
          </p>
          <p>
            Eventually, with time and contributions, this platform will become
            more robust. So we can have things like filtering by year or city or
            decade and see how art for marketing shows has changed over time or
            location.
          </p>
          <p>Thanks for being here. &#9825;</p>
        </div>
      </div>
    </>
  );
}
