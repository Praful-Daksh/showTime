import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation()
    const isHome = location.pathname === '/';
    const isAuth = localStorage.getItem('authToken') ? true : false;

    return (
        <>
            <div className="nav-head-wrap">
                <nav>
                    <div className="nav-logo">
                        <h1><Link to={'/'}>SHOWTime</Link></h1>
                    </div>
                    {(isHome || !isAuth) ?
                        <>
                            {isHome && (<div className="nav-search">
                                <div className="nav-searchbar">
                                    <form action="/find-show" method="POST" id="search-form">
                                        <input
                                            type="search"
                                            id="search"
                                            name="searchValue"
                                            placeholder="Search Shows Near You"
                                            required
                                            autoComplete="off"
                                        />
                                        <button className="btn bg-transparent border-0 p-0" style={{ cursor: 'pointer' }} type="submit">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>)}
                            <div className="nav-buttons">
                                <Link to={'/login'}>Sign In</Link>
                                <Link to={'/register'}>Sign Up</Link>
                            </div>
                        </>
                        : null}

                    {!isAuth && (<div className="nav-icon-login">
                        <a className="fa fa-right-to-bracket" href="/login"></a>
                    </div>)}
                </nav>
            </div>
        </>
    )
}

export default Navbar