import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TopRated() {
  const API_KEY = "f64d98dcdbe26c0fcc5e3691bb9943a0";
  const [rated, setRated] = useState([]);
  const [selectPage, setSelectPage] = useState("");
  const [sortRated, setSortRated] = useState("vote_average.desc");

  const topRated = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${selectPage}&sort_by=${sortRated}&without_genres=99,10755&vote_count.gte=200&api_key=${API_KEY}`,
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

  const handlePage = (event) => {
    setSelectPage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    topRated();
  };

  const handleChangeRated = (event) => {
    setSortRated(event.target.value);
  };

  return (
    <div className="m-6">
      <h2 className="text-3xl font-black text-center">Top Rated Movies</h2>
      <form onSubmit={handleSubmit} className="my-5">
        <div className="container flex items-center justify-end">
          <p>Search by page number: </p>
          <select
            onChange={handlePage}
            className="p-1 mx-3 rounded-lg border border-yellow-300 select-cst"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <select
            value={sortRated}
            onChange={handleChangeRated}
            className="p-1 mr-3 rounded-lg border border-yellow-300 select-cst"
          >
            <option value="vote_average.asc">Top Rated Ascending</option>
            <option value="vote_average.desc">Top Rated Descending</option>
          </select>
          <button type="submit" className="bg-yellow-300 p-1 rounded-lg ">
            Go!
          </button>
        </div>
      </form>

      <div className="flex flex-wrap justify-center">
        {rated?.map((movie) => (
          <div key={movie.id}>
            <div className="flex flex-col transition ease-in-out relative overflow-hidden m-3 min-w-[200px] h-auto z-0 shadow-xl rounded-md hover:scale-110 ">
              <img
                src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                alt={movie.title}
                className="h-[300px]"
              />
              <div className="m-2 w-[200px]">
                <div className="font-black ">{movie.title}</div>
                <div className="flex justify-between">
                  <p>Vote Count: {movie?.vote_count}</p>
                  <span>{movie.vote_average}</span>
                </div>
                <div className="mt-2">{movie?.release_date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
