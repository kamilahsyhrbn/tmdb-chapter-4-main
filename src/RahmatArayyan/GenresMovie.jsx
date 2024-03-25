import React, { useState } from "react";
import axios from "axios";

const API_KEY = "a269fb8595736e8d67e852e949bdd293";

const GenresMovie = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const fetchMoviesByGenre = async () => {
    try {
      if (!selectedGenre) return alert("Mohon pilih genre film");
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`,
        { headers: { accept: "application/json" } }
      );
      setMovies(response.data.results);
    } catch (err) {
      console.log("error fetching data: ", err);
    }
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMoviesByGenre();
  };

  return (
    <>
      <div className="container mx-auto">
        <form onSubmit={handleSubmit} className="mt-8">
          <select
            onChange={handleGenreChange}
            className="ml-2 select-cst border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="" disabled selected hidden>
              Pilih Genre
            </option>
            <option value="28">Action</option>
            <option value="12">Advanture</option>
            <option value="16">Animation</option>
            <option value="35">Comedy</option>
            <option value="80">Crime</option>
            <option value="27">Horor</option>
            <option value="10752">War</option>
            <option value="53">Thriller</option>
            <option value="10749">Romance</option>
            <option value="878">Science Fiction</option>
          </select>
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Tampilkan
          </button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white rounded-md shadow-md p-4">
              <h2 className="text-xl font-semibold mb-2">
                {movie.original_title}
              </h2>
              <h2 className="text-lg mb-2">{movie.release_date}</h2>
              <p className="text-gray-700">{movie.overview}</p>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="mt-4 rounded-md shadow-md"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GenresMovie;
