import React, { useEffect, useRef, useState } from "react";
import './TitleCards.css';
import cards_data from "../../assets/cards/Cards_data"


const TitleCards = ({ title, category }) => {
    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTA4ODc2NzYxZDY2MzQwMDRmZjVhYzk2NTc5N2E3YyIsIm5iZiI6MTcyNjA0NDExNi43NzI3MTksInN1YiI6IjY2ZTE1NmFhMzk2ODYxOWVmODA1MTViYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q8hYphDnUVOxdf_9M-Yuj8SFrcdes9fzcXMKpnZg0Fg'
        }
    };

    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category?category : 'now_playing'}?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => setApiData(response.results))
            .catch(err => console.error(err));
        
        cardsRef.current.addEventListener('wheel', handleWheel);
    },[])
    return (
        <div className="titlecards">
            <h2>{title?title:'Popular on Netflix'}</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <div className="card" key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`} alt="" />
                        <p>{card.original_title}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default TitleCards;