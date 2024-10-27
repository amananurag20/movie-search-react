import React, { useState } from "react";
import { Card, Button, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../utils/movieSlice";

const MovieCard = ({ movie, onClick }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.movies);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  const fetchMovieDetails = async (id) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=59c7b0c`
      );
      const data = await response.json();

      if (data.Response === "True") {
        return data;
      } else {
        throw new Error(data.Error);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
      throw error;
    }
  };

  const handleFavoriteToggle = async (event) => {
    event.stopPropagation();

    if (isFavorite) {
      dispatch(removeFavorite({ id: movie.imdbID }));
      setToastMessage("Movie removed from favorites.");
      setToastVariant("danger");
    } else {
      try {
        const fullMovieDetails = await fetchMovieDetails(movie.imdbID);
        dispatch(addFavorite(fullMovieDetails));
        setToastMessage("Movie added to favorites.");
        setToastVariant("success");
      } catch (error) {
        setToastMessage("Failed to fetch movie details.");
        setToastVariant("danger");
      }
    }

    setShowToast(true);
  };

  return (
    <Card
      className="bg-dark text-light h-100 shadow-sm hover:shadow-lg cursor-pointer"
      onClick={onClick}
      style={{ transition: "transform 0.3s", cursor: "pointer" }}
    >
      <Card.Img
        variant="top"
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x400"
        }
        alt={movie.Title}
        style={{ height: "300px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title
          className="text-center font-weight-bold mb-2"
          style={{ fontSize: "1.1rem" }}
        >
          {movie.Title}
        </Card.Title>
        <Card.Text className="text-light text-center" style={{ opacity: 0.85 }}>
          {movie.Year} &bull;{" "}
          {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}
        </Card.Text>
        <Button
          variant={isFavorite ? "danger" : "primary"}
          onClick={handleFavoriteToggle}
          className="w-100"
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Card.Body>

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1,
          backgroundColor: toastVariant === "danger" ? "#dc3545" : "#28a745",
        }}
      >
        <Toast.Body className="text-white">{toastMessage}</Toast.Body>
      </Toast>
    </Card>
  );
};

export default MovieCard;
