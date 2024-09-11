import React, { useEffect, useState } from "react";
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [apiData, setApiData] = useState({
        name: '',
        key: '',
        published_at:'',
        type:''
    })

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTA4ODc2NzYxZDY2MzQwMDRmZjVhYzk2NTc5N2E3YyIsIm5iZiI6MTcyNjA0NDExNi43NzI3MTksInN1YiI6IjY2ZTE1NmFhMzk2ODYxOWVmODA1MTViYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q8hYphDnUVOxdf_9M-Yuj8SFrcdes9fzcXMKpnZg0Fg'
        }
    };
    
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(response => response.json())
            .then(response => setApiData(response.results[0]))
            .catch(err => console.error(err));
    }, [])
    
    return(
        <div className="player">
            <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
            <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title="Trailer" frameborder="0" allowFullScreen></iframe>
            <div className="player-info">
                <p>{apiData.published_at.slice(0,10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    )
}

export default Player;