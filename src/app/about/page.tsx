import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
  description: "The workshop behind Wednesday — one maker, one workshop.",
};

export default function AboutPage() {
  return (
    <div className="page">
      <Nav active="about" />
      <div className="about-head">
        <span className="label" style={{ color: "var(--forest)" }}>
          About
        </span>
        <h1 className="h">
          One maker, <em>one workshop.</em>
        </h1>
      </div>

      <div className="about-intro">
        <img className="about-img" src="/photos/wednesday-01.jpeg" alt="The Wednesday workshop" />
        <div className="about-text">
          <p className="big">It started with a toolbox my grandpa gave me when I was young.</p>
          <p className="body">
            I used it to build birdhouses for the birds in our backyard and tiny villas for my hamsters. Over the years I&rsquo;ve built office desks, closets, kitchens, beds and much more.
          </p>
        </div>
      </div>

      <section className="quote-banner tone tone-forest">
        <p>
          Three years ago I built a table for our boardgaming group. We meet on Wednesdays, <em>and the name stuck.</em>
        </p>
      </section>

      <div className="about-end">
        <p className="body">
          Working with my hands is what I needed in a screen-filled world. It now not only makes me happy, but also those who use my creations daily.
        </p>
        <div className="about-ctas">
          <Link className="btn tone tone-eclipse" href="/pieces">
            See all pieces
          </Link>
          <Link className="btn btn-sage" href="/contact?topic=custom">
            I have a piece in mind
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
