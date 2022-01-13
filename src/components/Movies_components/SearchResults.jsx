import React, { useEffect } from 'react';
import Movie from './Movie';

const Searchresults = ({movies, prevSearch, setLandingSearch}) => {
    useEffect(() => {
        setLandingSearch(prevSearch)
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section id="results" className='row'>
            <h2 className="results__title">{`Tulokset haulla "${prevSearch}":`}</h2>
            <div className="results">
                {
                    movies.map(movie => <Movie key={movie.imdbID} movie={movie}/>)
                }
            </div>
        </section>
    );
}

export default Searchresults;
