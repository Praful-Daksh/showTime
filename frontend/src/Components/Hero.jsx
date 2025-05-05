import React from 'react'
import {Link} from 'react-router-dom'
const Hero = () => {
    return (
        <section className="hero">
            <div className="main">
                <h1>All Event Operations At One Place.</h1>
                <h4>Organise, Manage, Buy & Sell Tickets</h4>
                <div className="options">
                <Link to={'/login'}>Organise an Event</Link>
                <Link to={'/explore/events'}>Book a Show</Link>
                </div>
            </div>
        </section>
    )
}

export default Hero