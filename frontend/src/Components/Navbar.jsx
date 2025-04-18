import React from 'react'

const Navbar = () => {
    return (
        <div className="nav-head-wrap">
            <nav>
                <div className="nav-logo">
                    <h1><a href="/"><span>SHOW</span>Time</a></h1>
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
                <div className="nav-buttons">
                    <a href="/login">Sign In</a>
                    <a href="/register">Sign Up</a>
                </div>
                <div className="nav-icon-login">
                    <a className="fa fa-right-to-bracket" href="/login"></a>
                </div>
            </nav>
        </div>
    )
}

export default Navbar