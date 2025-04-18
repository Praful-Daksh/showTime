import React from 'react';
import Navbar from '../Components/Navbar.jsx'
import Hero from '../Components/Hero.jsx'
const Home = () => {
    return (
        <div className="bodyWrap">
            <Navbar />
            <section id="showcase">
                <video autoPlay muted loop>
                    <source src="/media/showcaseVid.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </section>
            <Hero />
        </div >
    );
};

export default Home;
