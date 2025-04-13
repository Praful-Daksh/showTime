import React from 'react'

const Hero = () => {
    return (
        <section className="hero">
            <div className="main">
                <h1>All Event Operations At One Place.</h1>
                <h4>Organise, Manage, Buy & Sell Tickets</h4>
                <div className="options">
                    <a href="/login">Organise an Event</a>
                    <a href="/shows" id="book-show">Book a Show</a>
                </div>
            </div>
        </section>
    )
}

export default Hero