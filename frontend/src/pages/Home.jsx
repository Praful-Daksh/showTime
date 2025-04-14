import React from 'react';
import Navbar from '../Components/Navbar.jsx'
import Hero from '../Components/Hero.jsx'
import '../styles/Home.css'
const Home = () => {
    return (
        <>
            <Navbar/>
            <section id="showcase">
                <video autoPlay muted loop>
                    <source src="/media/showcaseVid.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </section>
            <Hero/>
        </>
    );
};

export default Home;
