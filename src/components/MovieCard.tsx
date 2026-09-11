import { useState } from "react";
import "../App.css";

type Props = {
  title: string;
  year: number;
  genre: string[];
  isWatched: boolean;
  onWatched: () => void;
};

function MovieCard(props: Props) {
  const [rating, setRating] = useState(0);

  return (
    <>
      <div id="movie">
        <h2>{props.title}</h2>
        <p>Rok: {props.year}</p>
        <p>Gatunek: {props.genre.join(", ")}</p>
        <button onClick={props.onWatched} disabled={props.isWatched}>
          {props.isWatched ? "✓ Obejrzany" : "Oznacz jako obejrzany"}
        </button>
      </div>

      <div id="rating">
        {[1, 2, 3, 4, 5].map((stars) => {
          const isFilled = rating >= stars;
          return (
            <button
              key={stars}
              onClick={() => setRating(stars)}
              style={{ color: isFilled ? "gold" : "gray" }}
            >
              {isFilled ? "★" : "☆"}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default MovieCard;
