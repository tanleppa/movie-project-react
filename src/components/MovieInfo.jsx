import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from './Home_components/Nav';
import axios from 'axios';
import noPosterImg from '../assets/no-poster.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Movieinfo = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [ loading, setLoading ] = useState(true)
    const [ movie, setMovie ] = useState({})


    const [img, setImg] = useState()

    const mountedRef = useRef(true)
    const initialRender = useRef(true)
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        const image = new Image()
        image.src = movie.Poster
        console.log("waiting")
        image.onload = () => {
            if (mountedRef.current) {
               setImg(image)
               console.log("set")
            }
        }
        return () => {
            mountedRef.current = false
        }
    }, [movie])


    async function fetchMovie() {
        const {data} = await axios.get(`https://www.omdbapi.com/?apikey=3d312dbd&i=${id}`)
        setMovie(data)
        setLoading(false)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setLoading(true)
        fetchMovie()
    }, [])
    
    return (
        <>
        <div className="nav__bg">
            <Nav />
        </div>
        <section id="info">
            {
                !img
                ?
                (<>
                <div className="row">
                    <div className="info__container">
                        <div className="skeleton__poster"></div>
                        <div className="skeleton__text--container">
                            <div className="skeleton__title"></div>
                            <div className="flex-center">
                                <div className="skeleton__subtitle"></div>
                                <div className="skeleton__subtitle"></div>
                                <div className="skeleton__rating">
                                    <FontAwesomeIcon icon="star" />
                                    <div className="skeleton__rating--text"></div>
                                </div>
                                <div className="skeleton__genre"></div>
                            </div>
                            <div className="skeleton__para"></div>
                            <div className="skeleton__para"></div>
                            <div className="skeleton__para"></div>
                            <div className="skeleton__para--short margin-top"></div>
                            <div className="skeleton__para--short"></div>
                            <div className="skeleton__para--short"></div>
                            <div className="skeleton__para--short margin-top"></div>
                            <div className="skeleton__para--short"></div>
                        </div>
                    </div>
                </div></>)
                :
                (<><div className="row">
                    <div className="info__container">
                        <figure className="info__img--wrapper">
                            <img className='info__img'
                            src={
                                movie.Poster !== "N/A"
                                ? img.src
                                : noPosterImg
                            } alt="" />
                        </figure>
                        <div className="info__text--container">

                            <h1 className='info__title'>{movie.Title}</h1>
                            <h2 className='info__release-date'><span className='white'>Julkaistu: </span>{movie.Released}</h2>
                            <h2 className='info__runtime'><span className='white'>Kesto: </span>{movie.Runtime}</h2>
                            <div className="info__rating--container">
                                <FontAwesomeIcon icon="star" className='star'/>
                                <h2 className="info__rating">IMDb Rating: {movie.imdbRating}<span className='gray'> /10</span></h2>
                            </div>
                            <ul className='info__genres--list'>
                                {
                                    movie.Genre
                                    .split(", ")
                                    .map(genre => <li key={genre} className='info__genre'>{genre}</li>)
                                }
                            </ul><span className="bold"></span>
                            <p className='info__para info__plot'>{movie.Plot}</p>
                            <p className="info__para"><span className="bold">Ohjaaja:</span> {movie.Director}</p>
                            <p className="info__para"><span className="bold">Käsikirjoittaja:</span> {movie.Writer}</p>
                            <p className="info__para"><span className="bold">Näyttelijät:</span> {movie.Actors}</p>
                            <p className="info__para info__bo"><span className="bold">Tuotot:</span> <span className="white">{movie.BoxOffice}</span></p>
                            <p className='info__para info__awards'><span className="bold">Palkinnot:</span> <span className="white">{movie.Awards}</span></p>
                            
                        </div>
                    </div>
                </div>
                <button
                className="info__back--btn"
                onClick={() => navigate('/movies')}>
                    <FontAwesomeIcon icon="caret-left" /> TAKAISIN
                </button></>)
            }
        </section>
        </>
    );
}

export default Movieinfo;
