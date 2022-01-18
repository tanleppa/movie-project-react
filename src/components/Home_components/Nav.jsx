import React from 'react';
import movieLogo from '../../assets/movielogo.png'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Nav = () => {
    function toggleMenu() {
        document.body.classList.toggle("menu--open")
    }

    return (
        <nav className='row'>
            <Link to="/">
            <figure className="nav__logo--wrapper">
                <img src={movieLogo} alt="" className="nav__logo" />
            </figure>
            </Link>
            <ul className="nav__link--list">
                <Link to="/"><li className="nav__link nav__link--hover-effect--gold"><span className='gold'>Home</span></li></Link>
                <Link to="/movies"><li className="nav__link nav__link--hover-effect--white"><span className='white'>Movies</span></li></Link>
                <li className="nav__link"><button className='nav__link--primary'>CONTACT</button></li>
            </ul>
            <button className="menu__btn"
            onClick={toggleMenu}>
                <FontAwesomeIcon icon="bars" />
            </button>

            <div className="menu">
                <figure className="close-menu__btn"
                onClick={toggleMenu}>
                    <FontAwesomeIcon icon="times" />
                </figure>
                <ul className="nav__link--list--menu">
                    <Link to="/"><li className="nav__link--menu" onClick={toggleMenu}><span className='black'>Home</span></li></Link>
                    <Link to="/movies"><li className="nav__link--menu" onClick={toggleMenu}><span className='black'>Movies</span></li></Link>
                    <li className="nav__link--menu no-underline"><button className='nav__link--primary--menu'>CONTACT</button></li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
