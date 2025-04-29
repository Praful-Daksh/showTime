import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ isAuth }) => {
    return (
        <div className="nav-head-wrap">
            <nav>
                <div className="nav-logo">
                    <h1><Link to={'/'}><span>SHOW</span>Time</Link></h1>
                </div>
                <div className="nav-search">
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
                </div>
                {!isAuth ?
                    <div className="nav-buttons">
                        <Link to={'/login'}>Sign In</Link>
                        <Link to={'/register'}>Sign Up</Link>
                    </div> :
                    <div className="nav-buttons">
                        <Link to={'/dashboard/home'}>Dashboard</Link>
                    </div>
                }
                <div className="nav-icon-login">
                    <a className="fa fa-right-to-bracket" href="/login"></a>
                </div>
            </nav>
        </div>
    )
}

export default Navbar