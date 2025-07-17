import { useEffect, useState } from "react";
import "./MainPart.css";
import firstProject from "./img/Movie-project-slika-pocetne-stranice.png"
import secondProject from "./img/Snimak ekrana 2025-06-26 144846.png"
import thirdProject from "./img/react-slika.png"

export function Main () {
    const slides = [
    {
        image: firstProject,
        link: "https://vercel.com/skocopavles-projects/movie-project",
        alt: "Project 1",
        paragraph: "Movie Project is built with React." +  
        "Its main goal is to allow users to browse available movies, see details, and save favorites.",
        htmlparagraph: <button className="htmlbtn1">HTML</button>,
        cssparagraph: <button className="cssbtn1">CSS</button>,
        jsparagraph: <button className="jsbtn1">JavaScript</button>,
    },
    {
        image: secondProject,
        link: "https://vercel.com/skocopavles-projects/html-css-js-page",
        alt: "Project 2",
        paragraph: "This is a Single Page Application." + 
        "The project aims to demonstrate a clean structure, responsive layout, and interactive elements using core web technologies.",
        htmlparagraph: <button className="htmlbtn2">HTML</button>,
        cssparagraph: <button className="cssbtn2">CSS</button>,
        jsparagraph: <button className="jsbtn2">JavaScript</button>,
    },
    {
        image: thirdProject,
        link: "https://vercel.com/skocopavles-projects/react-project",
        alt: "Project 3",
        paragraph : "Todo project is SPA built with React," + 
        "designed to help users manage their daily tasks efficiently through a simple and intuitive interface.",
        htmlparagraph: <button className="htmlbtn3">HTML</button>,
        cssparagraph: <button className="cssbtn3">CSS</button>,
        jsparagraph: <button className="jsbtn3">JavaScript</button>,
    },
];
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        setAnimate(true)
    }, [])

    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === slides.length - 1? 0 : prev + 1))
        }, 5000)

        return () => clearInterval(interval);
    }, []);

    const currentSlide = slides[currentIndex];

    const nextSlide = () => {
        setCurrentIndex((prev) => prev === slides.length - 1? 0 : prev + 1)
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => prev === 0 ? slides.length - 1: prev - 1)
    }
return (
    <>
        <div className="all-container">
            <div className="all-paragraps">
                <div className="main-paragraph">
                    <p className="main-p">About project</p>
                </div>
                <div className="description-paragraph">
                    <p className="description-p">{currentSlide.paragraph}</p>
                </div>
                <div className="statistic-paragraphs">

                </div>
            </div>
            <div className="image-container">
                <a
                    href={currentSlide.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-to-projects"
                    >
                    <img className="main-pic" src={currentSlide.image} alt={currentSlide.alt}/>
                </a>
            </div>
            
            <div className="button-container">
                <button className="left-button" onClick={prevSlide}>Prev</button>
                <button className="right-button" onClick={nextSlide}>Next</button>
            </div>
        </div>
    </>
    );
}