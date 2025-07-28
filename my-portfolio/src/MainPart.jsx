import { useEffect, useState } from "react";
import "./MainPart.css";
import firstProject from "./img/Movie-project-slika-pocetne-stranice.png";
import secondProject from "./img/Snimak ekrana 2025-06-26 144846.png";
import thirdProject from "./img/react-slika.png";

export function Main() { 
    // 1️⃣ Slajdovi
    const slides = [
        {
            image: firstProject,
            link: "https://vercel.com/skocopavles-projects/movie-project",
            alt: "Project 1",
            paragraph: "Movie Project is built with React. It's main goal is to allow users to browse available movies, see details, and save favorites.",
            htmlProgress: 2.6,
            cssProgress: 41.8,
            jsProgress: 55.6,
        },
        {
            image: secondProject,
            link: "https://vercel.com/skocopavles-projects/html-css-js-page",
            alt: "Project 2",
            paragraph: "This is a Single Page Application. The project aims to demonstrate a clean structure, responsive layout, and interactive elements using core web technologies.",
            htmlProgress: 52,
            cssProgress: 47,
            jsProgress: 1,
        },
        {
            image: thirdProject,
            link: "https://vercel.com/skocopavles-projects/react-project",
            alt: "Project 3",
            paragraph: "Todo project is SPA built with React, designed to help users manage their daily tasks efficiently through a simple and intuitive interface.",
            htmlProgress: 3.6,
            cssProgress: 1,
            jsProgress: 95.4,
        },
    ];

    // 2️⃣ State za slajdove i animaciju
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentSlide = slides[currentIndex];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    // 5️⃣ Dugmad za menjanje slajda
    const nextSlide = () => setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));

    return (
        <div className="all-container">
            <div className="all-paragraphs">
                <div className="main-paragraph">
                    <p className="main-p">About project</p>
                </div>

                <div className="description-paragraph">
                    <p className="description-p">{currentSlide.paragraph}</p>
                </div>

                <div className="statistic-paragraphs">
                    {/* HTML */}
                    <div className="html-div">
                        <p className="html-p">HTML</p>
                        <div className="progress-bar">
                            <div className="progress-fillh" style={{ width: `${currentSlide.htmlProgress}%` }}></div>
                        </div>
                        <p className="progh">{currentSlide.htmlProgress}%</p>
                    </div>

                    {/* CSS */}
                    <div className="css-div">
                        <p className="css-p">CSS</p>
                        <div className="progress-bar">
                            <div className="progress-fillc" style={{ width: `${currentSlide.cssProgress}%` }}></div>
                        </div>
                        <p className="progc">{currentSlide.cssProgress}%</p>
                    </div>

                    {/* JS */}
                    <div className="js-div">
                        <p className="js-p">JavaScript</p>
                        <div className="progress-bar">
                            <div className="progress-fillj" style={{ width: `${currentSlide.jsProgress}%` }}></div>
                        </div>
                        <p className="progj">{currentSlide.jsProgress}%</p>
                    </div>
                </div>
            </div>

            <div className="image-container">
                <a href={currentSlide.link} target="_blank" rel="noopener noreferrer">
                    <img className="main-pic" src={currentSlide.image} alt={currentSlide.alt} />
                </a>
            </div>

            <div className="button-container">
                <button className="left-button" onClick={prevSlide}>Prev</button>
                <button className="right-button" onClick={nextSlide}>Next</button>
            </div>
        </div>
    );
}
