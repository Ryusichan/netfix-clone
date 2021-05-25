import React, { useState, useEffect } from 'react'
import axios from './axios';
import styled from 'styled-components'
import YouTube from 'react-youtube';
import movieTrailer from "movie-trailer";

const RowContent = styled.div`
    margin-left: 20px;
    color: #fff;
`

const Rowposters = styled.div`
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    padding: 20px;

    &::-webkit-scrollbar {
        display: none;
    }
`
    
const Rowposter = styled.img`
    object-fit: contain;
    width: 100%;
    max-height: ${props => props.isLarge ? '250px' : '100px'};
    margin-right: 10px;
    transition: transform 450ms;
    
    &:hover {
        transform: ${props => props.isLarge ? 'scale(1.09)' : 'scale(1.08)'};
    }
`
const base_url = "https://image.tmdb.org/t/p/original/"

function Row({title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    }

    const handleClick = async (movie) => {
        if (trailerUrl) {
          setTrailerUrl("");
        } else {
          let trailerurl = await axios.get(
            `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
          );
          setTrailerUrl(trailerurl.data.results[0]?.key);
        }
        console.log(movie.id)
      };


    return (
        <RowContent >
            <h2>{title}</h2>
            <Rowposters >
                {movies.map((movie) => (
                    <Rowposter
                        isLarge={isLargeRow}
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name}
                    />
                ))}
            </Rowposters>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </RowContent>
    )
    

}

export default Row;
