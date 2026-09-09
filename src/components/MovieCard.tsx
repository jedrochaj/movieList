import { useState } from "react";
import "../App.css";

type Props = {
    title: string;
    year: number;
    genre: string;
    onWatched: () => void;
}

function MovieCard(props: Props) {
    const [isWatched, setIsWatched] = useState(false);
    const [rating, setRating] = useState(0);

    return(
        <>
        <div id="movie">
            <h2>{props.title}</h2>
            <p>Rok: {props.year}</p>
            <p>Gatunek: {props.genre}</p>
            <button onClick={() => {
                setIsWatched(true);
                props.onWatched();
            }}>
                {isWatched ? "✓ Obejrzany" : "Oznacz jako obejrzany"}
            </button>
        </div>
        <div id="rating">
            <button onClick={()=>{setRating(1)}} style={{ color: rating >= 1 ? "gold" : "lightgray" }}>{rating >= 1 ? "★" : "☆"}</button>
            <button onClick={()=>{setRating(2)}} style={{ color: rating >= 2 ? "gold" : "lightgray" }}>{rating >= 2 ? "★" : "☆"}</button>
            <button onClick={()=>{setRating(3)}} style={{ color: rating >= 3 ? "gold" : "lightgray" }}>{rating >= 3 ? "★" : "☆"}</button>
            <button onClick={()=>{setRating(4)}} style={{ color: rating >= 4 ? "gold" : "lightgray" }}>{rating >= 4 ? "★" : "☆"}</button>
            <button onClick={()=>{setRating(5)}} style={{ color: rating >= 5 ? "gold" : "lightgray" }}>{rating >= 5 ? "★" : "☆"}</button>
        </div>
        </>
    );
}

export default MovieCard;
