import React from 'react';
import Landing from './Home_components/Landing';
import Nav from './Home_components/Nav';

const Home = ({setLandingSearch, landingSearch}) => {
    return (
        <div>
            <div className="nav__bg">
                <Nav />
            </div>
            <Landing setLandingSearch={setLandingSearch} landingSearch={landingSearch}/>
        </div>
    );
}

export default Home;
