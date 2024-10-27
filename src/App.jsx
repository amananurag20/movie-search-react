import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./components/MovieDetails";
import FavouriteMovie from "./components/FavouriteMovie";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/fav" element={<FavouriteMovie />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
