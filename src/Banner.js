import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from './axios'
import requests from './requests';

const Header = styled.div`
    color: white;
    object-fit: contain;
    height: 448px;
`

const BannerContents = styled.div`
    margin-left: 30px;
    padding-top: 140px;
    height: 190px;
`

const BannerButton = styled.div`
`

const Button = styled.button`
    cursor: pointer;
    color: #fff;
    outline: none;
    border: none;
    font-weight: 700;
    border-radius: 0.2vw;
    padding-left: 2rem;
    padding-right: 2rem;
    margin-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background-color: rgba(51,51,51,0.5);

    &:hover {
        color: #000;
        background-color: #e6e6e6;
        transition: all 0.2s;
    }
`

const BannerDescription = styled.h1`
    width: 45rem;
    line-height: 1.3;
    padding-top: 1rem;
    font-size: 0.8rem;
    font-weight: 400;
    max-width: 360px;
    height: 80px;
`

const BannerTitle = styled.h1`
    font-size: 3rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
`
const BannerFadeBottom = styled.div`
    height: 7.4rem;
    background-image: linear-gradient(
        180deg, transparent, rgba(37, 37, 37, 0.61),#111
    );
`

function Banner() {
    const [ movie, setMoive ] = useState([]);

    useEffect(() => {
        async function fetchDate() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMoive(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length -1)
                ]
            );
            return request;
            // console.log(request.data.result[Math.floor(Math.random() * request.data.results.length -1)]);
        };
        fetchDate();
    }, [])
    
    function truncate(str, n) {
        return str?.lenght > n ? str.substr(0, n - 1 ) + "..." : str;
    }
    
    return (
        <Header
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
                backgroundPosition: "center center"
            }}
        >
            <BannerContents>
                <BannerTitle>
                    {movie?.title || movie?.name || movie?.original_name}
                </BannerTitle>
                <BannerButton>
                    <Button>
                        Play
                    </Button>
                    <Button>
                        My List
                    </Button>
                </BannerButton>

                <BannerDescription>
                    {truncate(movie?.overview, 150)}
                </BannerDescription>
            </BannerContents>
            <BannerFadeBottom/>
        </Header>
    )
}
export default Banner;
