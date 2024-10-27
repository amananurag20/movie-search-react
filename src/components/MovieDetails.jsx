import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
  Toast,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../utils/movieSlice";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.movies);
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("yellow");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=59c7b0c`
        );
        const data = await response.json();

        if (data.Response === "True") {
          setMovieDetails(data);
          setError(null);
        } else {
          setError("Movie details not found.");
        }
      } catch (err) {
        console.log(err);
        setError("An error occurred while fetching movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const isFavorite = favorites.some(
    (fav) => fav.imdbID === movieDetails.imdbID
  );

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite({ id: movieDetails.imdbID }));
      setToastMessage("Movie removed from favorites.");
      setToastColor("red");
    } else {
      dispatch(addFavorite(movieDetails));
      setToastMessage("Movie added to favorites.");
      setToastColor("green");
    }
    setShowToast(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center my-5">
        {error}
      </Alert>
    );
  }

  return (
    <Container className="my-5">
      <Button variant="secondary" onClick={handleBack} className="mb-3">
        Back
      </Button>
      <Card className="bg-dark text-light">
        <Row className="g-0">
          <Col md={4}>
            <Card.Img
              variant="top"
              src={
                movieDetails.Poster !== "N/A"
                  ? movieDetails.Poster
                  : "https://via.placeholder.com/300x450"
              }
              alt={movieDetails.Title}
              className="h-100 rounded-start"
            />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title className="display-4">
                {movieDetails.Title}
              </Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                {movieDetails.Year} • {movieDetails.Genre} •{" "}
                {movieDetails.Runtime}
              </Card.Subtitle>
              <Card.Text className="mb-4">{movieDetails.Plot}</Card.Text>

              <Row className="mb-2">
                <Col xs={6} md={4}>
                  <strong>Director:</strong> {movieDetails.Director}
                </Col>
                <Col xs={6} md={4}>
                  <strong>Writer:</strong> {movieDetails.Writer}
                </Col>
                <Col xs={6} md={4}>
                  <strong>Actors:</strong> {movieDetails.Actors}
                </Col>
              </Row>

              <Row className="mb-2">
                <Col xs={6} md={4}>
                  <strong>Language:</strong> {movieDetails.Language}
                </Col>
                <Col xs={6} md={4}>
                  <strong>Country:</strong> {movieDetails.Country}
                </Col>
                <Col xs={6} md={4}>
                  <strong>Rated:</strong> {movieDetails.Rated}
                </Col>
              </Row>

              <Row className="mb-4">
                <Col xs={6} md={4}>
                  <strong>Released:</strong> {movieDetails.Released}
                </Col>
                <Col xs={6} md={4}>
                  <strong>Box Office:</strong> {movieDetails.BoxOffice}
                </Col>
                <Col xs={6} md={4}>
                  <strong>IMDB Rating:</strong> {movieDetails.imdbRating}
                </Col>
              </Row>

              <Row className="border-top pt-3">
                <Col>
                  <strong>Awards:</strong> {movieDetails.Awards}
                </Col>
              </Row>

              <Button
                variant={isFavorite ? "danger" : "primary"}
                onClick={handleFavoriteToggle}
                className="mt-3"
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 1,
          backgroundColor: toastColor,
          color: "white",
        }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
};

export default MovieDetails;
