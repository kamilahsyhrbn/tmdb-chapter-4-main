import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

export default function Home() {
  const API_KEY = "94d5a1d8423851d4c5e487d3ebb00485";
  const [movies, setMovies] = useState([]);
  const [rated, setRated] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  //POPULAR MOVIES
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  //TOP RATED
  const topRated = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${API_KEY}`,
        { header: { accept: "application/json" } }
      );
      //   console.log("Response topRated: ", response.data);
      setRated(response.data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    topRated();
  }, []);

  //TRENDING MOVIES
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            params: {
              api_key: API_KEY,
            },
          }
        );
        console.log("response data ", response.data);
        setTrending(response.data.results);
      } catch (err) {
        console.log("error fetching data: ", err);
      }
    };
    fetchMovies();
  }, []);

  //UPCOMING
  async function upcomingMovies() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to Fetch Data");
      }
      const items = await response.json();
      console.log("Data received with Async/Await:", items.results);
      setUpcoming(items.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    upcomingMovies();
  }, []);

  //Accordion
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="slider-container px-16">
      <h2 className="text-2xl text-white font-black my-4">Popular Movies</h2>
      <Slider {...settings}>
        {movies?.map((e) => (
          <div key={e?.id}>
            <div className="flex justify-center">
              <img src={`https://image.tmdb.org/t/p/w500${e.backdrop_path}`} />
            </div>
          </div>
        ))}
      </Slider>
      <h2 className="text-2xl text-white font-black mb-4 mt-5">Top Rated</h2>
      <Slider {...settings}>
        {rated?.map((e) => (
          <div key={e?.id}>
            <div className="flex justify-center">
              <img src={`https://image.tmdb.org/t/p/w500${e.backdrop_path}`} />
            </div>
          </div>
        ))}
      </Slider>
      <h2 className="text-2xl text-white font-black my-4 mt-5">
        Trending Movies
      </h2>
      <Slider {...settings}>
        {trending?.map((e) => (
          <div key={e?.id}>
            <div className="flex justify-center">
              <img src={`https://image.tmdb.org/t/p/w500${e.backdrop_path}`} />
            </div>
          </div>
        ))}
      </Slider>
      <h2 className="text-2xl text-white font-black my-4 mt-5">
        Upcoming Movies
      </h2>
      <Slider {...settings}>
        {upcoming?.map((e) => (
          <div key={e?.id}>
            <div className="flex justify-center">
              <img src={`https://image.tmdb.org/t/p/w500${e.backdrop_path}`} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
