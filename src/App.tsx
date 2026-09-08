import movies from './data/movies.json';

function App() {
  return (
    <>
      {movies.map((movie)=>(
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <p>Rok: {movie.year}</p>
          <p>Gatunek: {movie.genre}</p>
        </div>
      ))}
    </>
  )
}

export default App
