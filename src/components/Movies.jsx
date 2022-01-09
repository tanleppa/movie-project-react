import React, { useEffect, useRef, useState } from 'react';
import Nav from './Home_components/Nav';
import SearchResults from './Movies_components/SearchResults';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import loadingImage from '../assets/undraw_videographer_nnc7.svg'

const Movies = ({landingSearch, setLandingSearch}) => {
    const [movies, setMovies] = useState([])
    const [fetchData, setFetchData] = useState({})
    const [pageLimit, setPageLimit] = useState(2)
    const [searchInput, setSearchInput] = useState("")
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [pageNum, setPageNum] = useState(1)

    async function fetchMovies() {
        const { data } = await axios.get(`http://www.omdbapi.com/?apikey=3d312dbd&s=${search}&page=${pageNum}`)
        setMovies(data.Search)
        setFetchData(data)
        setPageLimit(parseInt(data.totalResults) / 10)
        setLoading(false)
        console.log(data)
    }

    function handleSearch() {
        if (pageNum === 1) {
            setLoading(true)
            fetchMovies()
        } else {
            setPageNum(1)
        }
    }

    useEffect(() => {
        if (!!landingSearch) {
            setSearchInput(landingSearch)
            setSearch(landingSearch)
        }
    }, [])

    const searchUseEffectInitialRender = useRef(true)
    useEffect(() => {
        if (searchUseEffectInitialRender.current) {
            searchUseEffectInitialRender.current = false
            return
        }
        handleSearch()
    }, [search]);

    const pageNumUseEffectInitialRender = useRef(true)
    useEffect(() => {
        window.scrollTo(0, 0)
        if (pageNumUseEffectInitialRender.current) {
            pageNumUseEffectInitialRender.current = false
            return
        }
        setLoading(true)
        fetchMovies()
    }, [pageNum]);

    return (
        <>
        <div className="movies__header--bg">
            <div className="movies__header--container">
                <Nav />
                <header className='row'>
                    <h1 className="search__title">Löydä suosikkielokuvasi</h1>
                    <div className="movies__search--container">
                        <input
                        type="text"
                        className="movies__search"
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && setSearch(searchInput)}/>
                        <figure
                        className="movies__search--btn"
                        onClick={() => setSearch(searchInput)}>
                            <FontAwesomeIcon icon="search" className='btn__icon--gold'/>
                        </figure>
                    </div>
                </header>
            </div>
        </div>
        <div className="movies__results--bg">
            {
            loading
            ? 
            (<><div className="movies__loading-bar--loading"></div>
            <figure className="loading__spinner--wrapper">
                <FontAwesomeIcon icon="spinner" className='loading__spinner'/>
            </figure></>)
            : 
            (<><div className="movies__loading-bar--static"></div></>)
            }
            {
                (movies && movies.length !== 0 && !loading)
                ?(<>
                <SearchResults movies={movies} prevSearch={search}
                 setLandingSearch={setLandingSearch}/>
                <div className="movies__next-page--container">
                    {
                        pageNum > 1
                        &&
                        (<figure className="previous-page__btn"
                        onClick={() => setPageNum(prevState => prevState - 1)}>
                        <FontAwesomeIcon icon="caret-left" />
                        </figure>)
                    }
                    <div className="current-page">
                        <h1 className="current-page__num">{pageNum}</h1>
                    </div>
                    {
                        pageNum < pageLimit
                        &&
                        <figure className="next-page__btn"
                        onClick={() => setPageNum(prevState => prevState + 1)}>
                            <FontAwesomeIcon icon="caret-right" />
                        </figure>

                    }
                </div>
                </>)
                :
                !loading
                &&
                <>
                {fetchData.Error === "Too many results."
                && <h2 className='results__title'>Liikaa tuloksia haulla: "{search}"</h2>}

                {(fetchData.Error === "Movie not found!" || fetchData.Error === "Incorrect IMDb ID.")
                && <h2 className='results__title'>Ei tuloksia haulla: "{search}"</h2>}

                {!fetchData.Error
                && <h2 className='results__title'>Etsi elokuvaa</h2>}

                <figure className='loading__img--wrapper'>
                    <img src={loadingImage} alt="" className='loading__img'/>
                </figure>
                </>
            }
        </div>
        </>
    );
}

export default Movies;
