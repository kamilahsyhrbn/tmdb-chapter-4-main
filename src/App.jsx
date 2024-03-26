import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import PopularMovies from "./bima/PopularMovies";
import TopRated from "./Kamilah/TopRated";
import GenresMovie from "./RahmatArayyan/GenresMovie";
import TrendingMovie from "./Tantrik/MovieTrending";
import Upcoming from "./aditya/upComingMovie";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/popular",
          element: <PopularMovies />,
        },
        {
          path: "/topRated",
          element: <TopRated />,
        },
        {
          path: "/genre",
          element: <GenresMovie />,
        },
        {
          path: "/trendingMovie",
          element: <TrendingMovie />,
        },
        {
          path: "/upcoming",
          element: <Upcoming />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
