import { useEffect, useState, useRef } from "react";
import "./MainPart.css";
import firstProject from "./img/Movie-project-slika-pocetne-stranice.png";
import secondProject from "./img/Snimak ekrana 2025-06-26 144846.png";
import thirdProject from "./img/react-slika.png";
import rightArrow from "./img/right-arrow.png";
import leftArrow from  "./img/left-arrow.png";

export function Main() { 
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

    const [currentIndex, setCurrentIndex] = useState(0);
    const [startSlides, setStartSlides] = useState(false);
    const containerRef = useRef(null);
    const currentSlide = slides[currentIndex];
    const intervalRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver (
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setStartSlides(true)
                    }
                });
            },
            { threshold: 0.6 }
        )

        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, [])

    useEffect(() => {
        if (!startSlides) return;

        intervalRef.current = setInterval(() => {
            setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(intervalRef.current);
    }, [startSlides, slides.length]);

    const resetInterval = () => {
    clearInterval(intervalRef.current); // Prekinemo prethodni interval
    intervalRef.current = setInterval(() => { // Ponovo pokrenemo od 0
        setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    };

    const nextSlide = () => {setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1))
        resetInterval();
    };
    const prevSlide = () => {setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1))
        resetInterval();
    };

    return (
        <div className={`all-container ${startSlides ? "visible" : ""}`}
            ref={containerRef}>
            <div className="all-paragraphs">
                <div className="main-paragraph">
                    <p className="main-p">About project</p>
                </div>

                <div className="description-paragraph">
                    <p className="description-p">{currentSlide.paragraph}</p>
                </div>

                <div className="statistic-paragraphs">
                    <div className="html-div">
                        <p className="html-p">HTML</p>
                        <div className="progress-bar">
                            <div className="progress-fillh" style={{ width: `${currentSlide.htmlProgress}%` }}></div>
                        </div>
                        <p className="progh">{currentSlide.htmlProgress}%</p>
                    </div>

                    <div className="css-div">
                        <p className="css-p">CSS</p>
                        <div className="progress-bar">
                            <div className="progress-fillc" style={{ width: `${currentSlide.cssProgress}%` }}></div>
                        </div>
                        <p className="progc">{currentSlide.cssProgress}%</p>
                    </div>

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
                <button className="left-button" onClick={prevSlide}><img src={leftArrow} alt="picture" className="leftArrow" /></button>
                <button className="right-button" onClick={nextSlide}><img src={rightArrow} alt="picture" className="rightArrow"/></button>
            </div>
        </div>
    );
}
