import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import noPosterImg from '../../assets/no-poster.jpg'

const Movie = ({ movie }) => {
    return (
        <div className="movie">
            <Link to={`/movie/${movie.imdbID}`} className="movie__poster--wrapper">
                <img src={
                    movie.Poster !== "N/A"
                    ?
                    movie.Poster
                    :
                    noPosterImg
                    } alt="" className="movie__poster" />
            </Link>
            <div className="movie__title--wrapper">
                <Link to={`/movie/${movie.imdbID}`}>
                    <h2 className="movie__title">{movie.Title}</h2>
                </Link>
                <h2 className='movie__year'>{movie.Year}</h2>
            </div>
        </div>
    );
}

export default Movie;
