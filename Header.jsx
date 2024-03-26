import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="text-white flex justify-between text-xl bg-transparent px-16 py-8">
      <p className="flex items-center text-3xl">
        <Link to="/">
          <strong>PRIME</strong>MOVIES
        </Link>
      </p>
      <div className="flex items-center">
        <ul className="flex justify-center align-center">
          <Link to="/" className="mx-5 hover:underline hover:text-white">
            Home
          </Link>
          <Link to="/popular" className="mx-5 hover:underline hover:text-white">
            Popular
          </Link>
          <Link
            to="/topRated"
            className="mx-5 hover:underline hover:text-white"
          >
            Top Rated
          </Link>
          <Link to="/genre" className="mx-5 hover:underline hover:text-white">
            Genre
          </Link>
          <Link
            to="/trendingMovie"
            className="mx-5 hover:underline hover:text-white"
          >
            Trending Movie
          </Link>
          <Link
            to="/upcoming"
            className="mx-5 hover:underline hover:text-white"
          >
            Upcoming
          </Link>
        </ul>
      </div>
    </div>
  );
}
