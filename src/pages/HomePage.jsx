import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Pagination,
} from "react-bootstrap";
import { setLoading, setError, setSearchResults } from "../utils/movieSlice";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    searchResults = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.movies || {});

  const [query, setQuery] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const fetchMovies = async (query, page = 1) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=59c7b0c&page=${page}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        dispatch(setSearchResults(data.Search));
        setTotalResults(Number(data.totalResults));
        dispatch(setError(null));
      } else {
        dispatch(setSearchResults([]));
        dispatch(setError(data.Error));
      }
    } catch (error) {
      dispatch(setError("An error occurred while fetching movies."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchMovies(query, currentPage);
  }, [query, currentPage]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalResults / 10);
  const maxVisiblePages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  return (
    <Container fluid className="min-h-screen py-8 bg-dark text-light">
      <h1 className="text-center mb-4 text-4xl">Movie Search App</h1>
      <Row className="justify-content-center mb-5">
        <Col md={8}>
          <SearchBar onSearch={handleSearch} />
        </Col>
      </Row>

      <Row className="justify-content-center mb-4">
        <Col md={8} className="text-center">
          <Link to="/movie/fav" className="btn btn-outline-light">
            View Favorite Movies
          </Link>
        </Col>
      </Row>

      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="light" />
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {searchResults.length > 0 && !loading && !error ? (
        <>
          <Row className="g-4">
            {searchResults.map((movie) => (
              <Col xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
                <MovieCard
                  movie={movie}
                  onClick={() => handleMovieClick(movie.imdbID)}
                />
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-center mt-4">
            <Pagination className="custom-pagination">
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="text-light bg-secondary mx-1 rounded"
              />

              {Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => startPage + i
              ).map((page) => (
                <Pagination.Item
                  key={page}
                  active={currentPage === page}
                  onClick={() => handlePageChange(page)}
                  className={`mx-1 ${
                    currentPage === page
                      ? "bg-primary text-white"
                      : "bg-secondary text-light"
                  } rounded`}
                  style={{ minWidth: "40px", textAlign: "center" }}
                >
                  {page}
                </Pagination.Item>
              ))}

              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="text-light bg-secondary mx-1 rounded"
              />
            </Pagination>
          </div>
        </>
      ) : (
        <p className="text-center text-muted mt-4">
          Start searching for movies to display results here.
        </p>
      )}
    </Container>
  );
};

export default HomePage;
