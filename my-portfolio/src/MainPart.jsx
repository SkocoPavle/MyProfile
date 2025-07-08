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
    },
    {
        image: secondProject,
        link: "https://vercel.com/skocopavles-projects/html-css-js-page",
        alt: "Project 2",
    },
    {
        image: thirdProject,
        link: "https://vercel.com/skocopavles-projects/react-project",
        alt: "Project 3",
    },
];

    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === slides.length - 1? 0 : prev + 1))
        }, 5000)

        return () => clearInterval(interval);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => prev === slides.length - 1? 0 : prev + 1)
    };

    const prevSlid = () => {
        setCurrentIndex((prev) => prev === 0 ? slides.length - 1: prev - 1)
    }
    return (
        <>
        <div className="all-container">
            {slides.map((slide, index) => {
                return (
                    <a
                        key={index}
                        href={slide.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`slide ${index === currentIndex ? "active" : ""}`}
                    >
                        <img src={slide.image} alt={slide.alt} className="img-container" />

                    </a>
                );
            })}
        </div>
        </>
    )
}