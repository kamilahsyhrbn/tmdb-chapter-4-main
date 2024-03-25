import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '94d5a1d8423851d4c5e487d3ebb00485';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(API_URL);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  useEffect(() => {
    const updateVisibleCards = () => {
      setVisibleCards(movies.slice(currentIndex, currentIndex + 3));
    };
    updateVisibleCards();
  }, [currentIndex, movies]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(movies.length - 3, prevIndex + 1));
  };

  return (
    <div className="container mx-1 px-4 bg-gray-800 min-h-screen">
      <h1 className="text-3xl font-semibold text-white my-1 py-3 text-center">
        Popular Movies
      </h1>
      <div className="flex justify-between mb-4">
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          onClick={handlePrevClick}
          disabled={currentIndex === 0}
        >
          Prev
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          onClick={handleNextClick}
          disabled={currentIndex === movies.length - 3}
        >
          Next
        </button>
      </div>
      <div className="flex flex-row justify-start gap-8 overflow-x-auto">
        {visibleCards.map((movie) => (
          <div
            key={movie.id}
            className="bg-black rounded-lg overflow-hidden shadow-md w-80 sm:w-96 hover:shadow-xl transition duration-300 ease-in-out"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                {movie.title}
              </h2>
              <p className="text-gray-700 line-clamp-3 text-gray-500 dark:text-gray-300">
                {movie.overview}
              </p>
              <div className="bg-gray-900 px-4 py-2 mt-2 rounded-b-lg">
                <span className="text-gray-700 text-sm dark:text-gray-400">
                  {movie.release_date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
