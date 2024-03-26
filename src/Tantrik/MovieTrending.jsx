import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "acf7d069f0cf491ee86bd7170bf8a259";

const MovieTrending = () => {
  const [movies, setMovies] = useState([]);
  const [selectYear, setSelectYear] = useState("");

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
        setMovies(response.data.results);
      } catch (err) {
        console.log("error fetching data: ", err);
      }
    };
    fetchMovies();
  }, []);

  const handleYearChange = (event) => {
    setSelectYear(event.target.value);
  };

  // filter movie berdasarkan tahun
  const filteredMovies = movies.filter((movie) => {
    if (selectYear === "all") {
      return true; // tampilkan semua movie
    } else if (selectYear) {
      const movieYear = new Date(movie.release_date).getFullYear();
      return movieYear.toString() === selectYear;
    }
    return true; // tampilkan semua movie
  });

  return (
    <div className="text-center text-white">
      <h1 className="text-3xl font-bold mb-4">Trending Movies</h1>
      <select onChange={handleYearChange} className="mx-5 select-cst">
        <option selected disabled>
          Tahun Rilis
        </option>
        <option value="all"> All </option>
        <option value="1989">1989</option>
        <option value="2021">2021</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
      <div className="flex flex-wrap justify-center gap-8 pb-2 my-5">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="flex flex-col border-2  gap-y-3 max-w-[400px] min-w-[280px] max-sm:min-w-[250px] shadow-[0_0_2px_1px_rgb(0,0,0,0.3)] rounded-lg items-center"
          >
            <div className="bg-cover min-h-[250px] w-full rounded-t-md flex flex-col items-center pt-5 relative">
              <img
                className="absolute -z-20 max-h-[250px] object-cover w-full top-0 left-0 filter blur-[3px]"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
              />
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="max-w-44 rounded-sm"
              />
            </div>
            <h2 className="font-bold px-5">{movie.title}</h2>
            <h2 className="font-bold px-5">
              {" "}
              Release date : {movie.release_date}{" "}
            </h2>
            <h2 className="p-4"> Release{movie.overview.slice(0, 150)}...</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieTrending;
