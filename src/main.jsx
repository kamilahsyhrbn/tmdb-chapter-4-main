import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import MovieTrending from "./MovieTrending.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MovieTrending />
  </React.StrictMode>
);
