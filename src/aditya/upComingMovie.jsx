import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const API_KEY = "77b3a402465e7a82a0baf4ac6fbae43d";

export default function upComingMovie() {
  const [data, setData] = useState([]);
  const [query, setSearchQuery] = useState("");
  const [numOfItems, setNumOfItems] = useState(5);

  // Search Function
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //to lowerchase & filtering
  const filteredData = data
    .filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
    .slice(0, numOfItems);

  //Fetch Data API UpComing TMDB
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
      setData(items.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    upcomingMovies();
  }, []);

  //convert Date
  function convertDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  }

  // Function to handle changes in the number of items select
  const handleNumOfItemsChange = (event) => {
    setNumOfItems(parseInt(event.target.value));
  };

  //Accordion
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className=" text-white px-16">
      <div className="">
        <div>
          <div className="py-12">
            <strong className=" text-2xl">Up Coming</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <div className="mt-4">
              <div className="slider-container">
                <Slider {...settings}>
                  {data?.map((e) => (
                    <div key={e?.id}>
                      <div className="flex justify-center">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Show Data */}
      <div className="mt-2">
        <div className="py-5">
          <div className="text-center mb-8">
            <strong className="text-2xl">PRE-RELEASE</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </div>
          <div className="flex justify-end p-5">
            {/* Search */}
            <div className="flex justify-end ">
              <input
                className="border p-2 rounded-md text-black"
                type="text"
                name="search"
                placeholder="Search"
                value={query}
                onChange={handleSearchChange}
              />
            </div>
            {/* Num of Items */}
            <div className="flex justify-end me-12 ps-5 ">
              <select
                id="numOfItems"
                className="text-black rounded-md"
                value={numOfItems}
                onChange={handleNumOfItemsChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 pb-2">
            {filteredData?.map((e) => (
              <div key={e?.id} className="bg-[#272531] text-center  rounded-md">
                <img
                  src={`https://image.tmdb.org/t/p/w300${e.poster_path}`}
                  alt=""
                />
                <p className="p-4 text-xl">
                  <strong>{e?.title}</strong>
                </p>
                <p>Release : {convertDate(e?.release_date)}</p>
                <p className="w-[300px] p-4 text-justify">{e?.overview}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
