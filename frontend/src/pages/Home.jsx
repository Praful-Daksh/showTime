import React from 'react';
import Navbar from '../Components/Navbar.jsx';
import Hero from '../Components/Hero.jsx';
import { useLocation } from 'react-router-dom';
import SeoMeta from '../Components/seoMeta.jsx';

const Home = () => {
    const location = useLocation();
    const { isAuth } = location.state || false;

    return (
        <>
            <SeoMeta />
            <div className='homePageWrap'>
                <div className="bodyWrap">
                    <Navbar isAuth={isAuth} />
                    <section id="showcase" className="relative w-full h-[70vh] overflow-hidden">
                        <video autoPlay muted playsInline loop className="w-full h-full object-cover">
                            <source src="/media/showcaseVid.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </section>

                    <Hero />
                </div>

                <section id="about" className="bg-white py-20 px-6">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">Welcome to ShowTime</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            ShowTime is your all-in-one solution for event monetization and management. Whether you're a solo artist,
                            a community group, a startup, or a full-scale event organizer, ShowTime gives you the power to launch your own events,
                            sell tickets directly, and analyze real-time performance — without relying on middlemen.
                        </p>
                        <img src="/media/eventManage.avif" alt="ShowTime Dashboard" className="mx-auto rounded-lg shadow-lg w-full max-w-3xl" />
                    </div>
                </section>

                <section id="how-it-works" className="bg-gray-100 py-20 px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-gray-800 mb-10">How It Works</h2>
                        <div className="grid md:grid-cols-3 gap-10 text-left">
                            <div className="bg-white p-6 rounded shadow">
                                <h3 className="text-2xl font-semibold mb-2 text-blue-600">1. Create Your Event</h3>
                                <p className="text-gray-600">Use our intuitive dashboard to add event details like time, venue, pricing, and categories. Add custom branding, seating maps, and ticket tiers.</p>
                            </div>
                            <div className="bg-white p-6 rounded shadow">
                                <h3 className="text-2xl font-semibold mb-2 text-blue-600">2. Sell Tickets</h3>
                                <p className="text-gray-600">Easily publish your event and start selling tickets directly. Share your unique event link, embed it on websites, or promote via social media.</p>
                            </div>
                            <div className="bg-white p-6 rounded shadow">
                                <h3 className="text-2xl font-semibold mb-2 text-blue-600">3. Track Sales & Analytics</h3>
                                <p className="text-gray-600">Access real-time analytics to monitor revenue, ticket sales, attendee demographics, and conversion rates — all from one clean dashboard.</p>
                            </div>
                        </div>
                    </div>
                </section>


                <section id="features" className="bg-white py-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Why Use ShowTime?</h2>
                        <div className="grid md:grid-cols-2 gap-10 items-center">
                            <ul className="space-y-6 text-lg text-gray-700">
                                <li>✅ Beautiful, responsive ticketing pages</li>
                                <li>✅ Secure payments and real-time updates</li>
                                <li>✅ Detailed event insights and sales analytics</li>
                                <li>✅ Fully mobile-friendly for organizers and guests</li>
                                <li>✅ Export guest lists, download reports, manage check-ins</li>
                            </ul>
                            <img src="/media/analytics.avif" alt="Analytics" className="w-full max-w-lg mx-auto rounded-lg shadow-lg" />
                        </div>
                    </div>
                </section>


                <section id="testimonials" className="bg-gray-100 py-20 px-6">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-10 text-gray-800">Trusted by Independent Organizers & Communities</h2>
                        <div className="space-y-10">
                            <div className="bg-white p-6 rounded shadow-md">
                                <p className="text-gray-700 italic">"I launched a 300-person tech meetup in less than 10 minutes. ShowTime gave me everything I needed — ticket sales, analytics, and communication tools."</p>
                                <p className="mt-4 font-semibold text-gray-900">— Priya R., Community Manager</p>
                            </div>
                            <div className="bg-white p-6 rounded shadow-md">
                                <p className="text-gray-700 italic">"Being able to track my ticket sales in real-time helped us adjust pricing and increase turnout. A must-have for independent creators."</p>
                                <p className="mt-4 font-semibold text-gray-900">— Lucas T., Event Host</p>
                            </div>
                        </div>
                    </div>
                </section>


                <footer className="bg-gray-900 text-gray-300 py-10 px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <p className="mb-4">&copy; 2025 ShowTime. All rights reserved.</p>
                        <div className="space-x-4">
                            <a href="#about" className="hover:text-white">About</a>
                            <a href="#how-it-works" className="hover:text-white">How it Works</a>
                            <a href="#features" className="hover:text-white">Features</a>
                            <a href="#testimonials" className="hover:text-white">Testimonials</a>
                            <a href="#cta" className="hover:text-white">Start Now</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Home;
