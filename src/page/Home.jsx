// import { useState } from "react";
import Faqsec from "../components/Faqsec";
import { Link } from "react-router-dom";
// import image from "../assets/pxfuel.jpg";
function Home() {
    return (
        <div className="min-h-screen ">
            {/* hero section  */}
            <section>
                {/* <div className="relative" >
                <img src={image} alt="logo" />
            </div> */}
                <div className="pt-48 sm:bg-pt-24 text-center" >
                    <h1 className=" md:text-6xl text-4xl font-bold text-indigo-700">Welcome to GramFund</h1>
                    <p className="text-lg  text-gray-600 mt-4 mb-6">
                        A transparent way to track village development funds and raise your voice.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/fund"
                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                        View Fund Details
                    </Link>
                    <Link
                        to="/complain"
                        className="bg-white text-indigo-600 border border-indigo-600 px-6 py-2 rounded-md hover:bg-indigo-100 transition"
                    >
                        Raise a Complaint
                    </Link>
                </div>
            </section>
            {/* Features Section */}
            <section className="pb-16 pt-36  px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-12">
                    How GramFund Helps You
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="bg-white shadow-md p-6 rounded-xl hover:scale-105 hover:shadow-lg transition duration-200">
                        <h3 className="text-xl font-bold text-indigo-600 mb-2">Track Every Rupee</h3>
                        <p className="text-gray-600">
                            See where funds are allocated, how much is used, and who spent it — clearly and publicly.
                        </p>
                    </div>
                    <div className="bg-white hover:scale-105 shadow-md p-6 rounded-xl hover:shadow-lg transition duration-200">
                        <h3 className="text-xl font-bold text-indigo-600 mb-2">Raise Queries Easily</h3>
                        <p className="text-gray-600">
                            If something looks suspicious or wrong, raise a complaint directly through the portal.
                        </p>
                    </div>
                    <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg hover:scale-105 transition duration-200">
                        <h3 className="text-xl font-bold text-indigo-600 mb-2">Community Driven</h3>
                        <p className="text-gray-600">
                            Built for villagers by villagers — to bring transparency to rural development.
                        </p>
                    </div>
                </div>
            </section>
            {/* faq section  */}
            <Faqsec />

        </div>
    )
}
export default Home;