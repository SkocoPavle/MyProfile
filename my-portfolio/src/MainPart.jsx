import "./MainPart.css";
import firstProject from "./img/Movie-project-slika-pocetne-stranice.png"
import secondProject from "./img/Snimak ekrana 2025-06-26 144846.png"
import thirdProject from "./img/react-slika.png"

export function Main () {
    const slides = [
    {
        image: {firstProject},
        link: "https://vercel.com/skocopavles-projects/movie-project",
        alt: "Project 1",
    },
    {
        image: {secondProject},
        link: "https://vercel.com/skocopavles-projects/html-css-js-page",
        alt: "Project 2",
    },
    {
        image: {thirdProject},
        link: "https://vercel.com/skocopavles-projects/react-project",
        alt: "Project 3",
    },
];
    return (
        <>
        </>
    )
}