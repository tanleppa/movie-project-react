import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cinemaImg from '../../assets/undraw_home_cinema_l7yl.svg'
import { useNavigate } from 'react-router-dom';

const Landing = ({setLandingSearch, landingSearch}) => {
    const navigate = useNavigate()

    function startRecording() {
        const rec = document.querySelector(".rec")
        rec.style.animation = 'blinkingRec 800ms infinite'
    }
    function stopRecording() {
        const rec = document.querySelector(".rec")
        rec.style.animation = 'none'
    }

    useEffect(() => {
        setLandingSearch("")
    }, [])

    return (
        <main id="landing">
            <div className="row landing__row">
                <div className="container">
                    <h1 className="landing__title">
                        Suomen suosituin ja arvovaltaisin lähde kaikelle elokuvasisällölle
                    </h1>
                    <h2 className="landing__subtitle">
                        LÖYDÄ SUOSIKKIELOKUVASI APUNASI
                        <span className='gold'> 5TAR</span>
                    </h2>
                    <div className="landing__search--container">
                        <div className="input__search--wrapper">
                            <div className="rec">
                                <FontAwesomeIcon icon="circle" className='rec__circle'/>
                                <h1 className='rec__text'>REC</h1>
                            </div>
                            <input
                            type="text"
                            className="landing__search"
                            placeholder='Etsi elokuvaa...'
                            onFocus={startRecording}
                            onBlur={stopRecording}
                            value={landingSearch}
                            onChange={(e) => setLandingSearch(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && navigate("/movies")}/>
                        </div>
                        <figure className="landing__search--btn"
                        onClick={() => navigate("/movies")}>
                            <FontAwesomeIcon icon="search" className='btn__icon'/>
                        </figure>
                    </div>
                    <figure className='landing__img--wrapper'>
                        <img src={cinemaImg} alt="" className='landing__img'/>
                    </figure>
                </div>
            </div>
        </main>
    );
}

export default Landing;
