import movies from './data/movies.json';
import MovieCard from "./components/MovieCard";
import { useState } from 'react';

function App() {
  const [watched, setWatched] = useState<number[]>([]);
  const [filter, setFilter] = useState("all");

  const filteredMovies = movies.filter((movie) => {
    if (filter === "watched") {
      return watched.includes(movie.id);
    }
    if (filter === "unwatched") {
      return !watched.includes(movie.id);
    }
    return true;
  });

  return (
    <>
      <p>Obejrzane: {watched.length}/{movies.length}</p>

      <button onClick={() => setFilter("all")}>Wszystkie</button>
      <button onClick={() => setFilter("watched")}>Obejrzane</button>
      <button onClick={() => setFilter("unwatched")}>Nieobejrzane</button>

      {filteredMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          year={movie.year}
          genre={movie.genre}
          onWatched={() => {
            if (!watched.includes(movie.id)) {
              setWatched([...watched, movie.id]);
            }
          }}
        />
      ))}
    </>
  );
}

export default App;
