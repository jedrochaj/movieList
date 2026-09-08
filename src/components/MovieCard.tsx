import { useState } from "react";

type Props = {
    title: string;
    year: number;
    genre: string;
    onWatched: () => void;
}

function MovieCard(props: Props) {
    const [isWatched, setIsWatched] = useState(false);

    return(
        <>
            <h2>{props.title}</h2>
            <p>Rok: {props.year}</p>
            <p>Gatunek: {props.genre}</p>
            <button onClick={() => {
                setIsWatched(true);
                props.onWatched();
            }}>
                {isWatched ? "✓ Obejrzany" : "Oznacz jako obejrzany"}
            </button>
        </>
    );
}

export default MovieCard;
