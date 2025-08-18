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

    // State za trenutno prikazanu sliku (indeks)
    const [currentIndex, setCurrentIndex] = useState(0);

    // Dva indeksa za animaciju
    const [prevIndex, setPrevIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(0);

    // Da li animacija traje
    const [isAnimating, setIsAnimating] = useState(false);

    // Smer animacije - 'left' ili 'right'
    const [direction, setDirection] = useState(null);

    // Startovanje slajdera kad je vidljiv
    const [startSlides, setStartSlides] = useState(false);
    const containerRef = useRef(null);
    const intervalRef = useRef(null);

    // IntersectionObserver za start slides
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
        );

        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, []);

    // Automatsko menjanje slajdova svakih 3s
    useEffect(() => {
        if (!startSlides) return;

        intervalRef.current = setInterval(() => {
            changeSlides((currentIndex + 1) % slides.length, 'left');
        }, 3000);

        return () => clearInterval(intervalRef.current);
    }, [startSlides, currentIndex, slides.length]);

    // Reset interval kad se klikne dugme
    const resetInterval = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            changeSlides((currentIndex + 1) % slides.length, 'left');
        }, 5000);
    };

    // Funkcija za promenu slajda sa animacijom i smerom
    const changeSlides = (newIndex, dir) => {
        if (isAnimating) return;

        setPrevIndex(currentIndex);
        setNextIndex(newIndex);
        setDirection(dir);
        setIsAnimating(true);

        setTimeout(() => {
            setCurrentIndex(newIndex);
            setIsAnimating(false);
        }, 600); // dužina animacije mora biti 600ms u CSS-u
    };

    // Klik na desno dugme (sledeća slika)
    const nextSlide = () => {
        resetInterval();
        const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        changeSlides(newIndex, 'left');
    };

    // Klik na levo dugme (prethodna slika)
    const prevSlide = () => {
        resetInterval();
        const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        changeSlides(newIndex, 'right');
    };

    // Za tekst i progress bar prikazujemo currentIndex
    const currentSlide = slides[currentIndex];

    return (
    <>
        <div className={`all-container ${startSlides ? "visible" : ""}`} ref={containerRef}>
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
                <a href={slides[currentIndex].link} target="_blank" rel="noopener noreferrer" style={{ position: "relative", display: "block", width: "1100px", height: "600px", overflow: "hidden" }}>
                    {/* Stara slika klizi napolje */}
                    <img
                        src={slides[prevIndex].image}
                        alt={slides[prevIndex].alt}
                        className={`slide-image slide-out-${direction} ${isAnimating ? 'animating' : ''}`}
                        style={{ position: 'absolute', top: 0, left: 0 }}
                    />
                    {/* Nova slika klizi unutra */}
                    <img
                        src={slides[nextIndex].image}
                        alt={slides[nextIndex].alt}
                        className={`slide-image slide-in-${direction} ${isAnimating ? 'animating' : ''}`}
                        style={{ position: 'absolute', top: 0, left: 0 }}
                    />
                </a>
            </div>

            <div className="button-container">
                <button className="left-button" onClick={prevSlide}>
                    <img src={leftArrow} alt="left arrow" className="leftArrow" />
                </button>
                <button className="right-button" onClick={nextSlide}>
                    <img src={rightArrow} alt="right arrow" className="rightArrow" />
                </button>
            </div>
        </div>

        <div className="footer-section">
            <h2 className="about-me">Hello, I'm Pavle</h2>
            <h2 className="skills">WEB DEVELOPER * WEB DESIGNER * CONSULTANT</h2>
            <div className="text">
            </div>
        </div>
    </>
    );
}
