import { useEffect, useState } from "react";
import "./HeaderPart.css";
import myImage from "./img/moja-slika2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";


export function Header () {
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        setAnimate(true)
    }, [])

    return (
        <>
            <header>
                <div className={`my-picture ${animate ? "animate" : ""}`}>
                    <img src={myImage} alt="My picture"className="pic"/>
                </div>

                <h1 className={animate ? "animate" : ""}>Full-Stack Developer</h1>
                <hr className={animate ? "animate" : ""}></hr>
                <FontAwesomeIcon icon={ faBars } className={`bars ${animate ? "animate" : ""}`}/>
                <div className={`buttons-top ${animate ? "animate" : ""}`}>
                    <button className="btn">Web development</button>
                    <button className="btn">Web Applications</button>
                    <button className="btn">Web Design</button>
                    <button className="btn">Full-Stack Development</button>
                    <button className="btn">Front-End Development</button>
                    <button className="btn">Back-End Development</button>
                </div>
                <div className={`buttons-middle ${animate ? "animate" : ""}`}>
                    <button className="btn">Front-End Frameworks</button>
                    <button className="btn">Back-End Frameworks</button>
                </div>
                <div className={`buttons-bottom ${animate ? "animate" : ""}`}>
                    <button className="btn">Computer Science</button>
                    <button className="btn">Software Development</button>
                    <button className="btn">Algorithms</button>
                    <button className="btn">Algorithm Development</button>
                </div>
            </header>
        </>
    )
}