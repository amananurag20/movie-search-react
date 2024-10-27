import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const FavouriteMovie = () => {
  const { favorites } = useSelector((state) => state.movies);

  if (favorites.length === 0) {
    return (
      <Container className="my-5">
        <Alert variant="info" className="text-center">
          No favorite movies found.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Link to="/" className="mb-3">
        <Button variant="secondary">Back</Button>
      </Link>

      <Row>
        {favorites.map((movie) => (
          <Col xs={12} sm={6} md={4} key={movie.imdbID} className="mb-4">
            <Link
              to={`/movie/${movie.imdbID}`}
              style={{ textDecoration: "none" }}
            >
              <Card className="bg-dark text-light h-100">
                <Card.Img
                  variant="top"
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/300x450"
                  }
                  alt={movie.Title}
                  style={{ height: "300px", objectFit: "cover" }}
                  s
                />
                <Card.Body>
                  <Card.Title className="h5">{movie.Title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {movie.Year} • {movie.Genre}
                  </Card.Subtitle>
                  <Card.Text className="text-truncate">{movie.Plot}</Card.Text>
                  <Card.Text>
                    <strong>IMDB Rating:</strong> {movie.imdbRating}
                  </Card.Text>
                  <Card.Text>
                    <strong>Director:</strong> {movie.Director}
                  </Card.Text>
                  <Card.Text>
                    <strong>Actors:</strong> {movie.Actors}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FavouriteMovie;
