import React, { useState, useEffect } from 'react'
import axios from './axios';
import styled from 'styled-components'

const base_url = "https://image.tmdb.org/t/p/original/"

function Row({title, fetchUrl }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    console.log(movies);

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
        max-height: 100px;
        margin-right: 10px;
        transition: transform 450ms;
        
        &:hover {
            transform: scale(1.08);
        }
    `

    return (
        <div className="row">
            <h2>{title}</h2>
            <Rowposters>
                {/* {posters} */}
                {movies.map(movie => (
                    <Rowposter
                        key={movie.id}
                        className="row_poster"
                        src={`${base_url}${movie.poster_path}`} 
                        alt={movie.name}
                    />
                ))}
            </Rowposters>
        </div>
    )
    

}

export default Row;
