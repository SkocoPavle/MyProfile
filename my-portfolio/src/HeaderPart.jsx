import "./HeaderPart.css";
import myImage from "./img/moja-slika2.jpg";

export function Header () {
    return (
        <>
            <header>
                <div className="my-picture">
                    <img src={myImage} alt="My picture"className="pic"/>
                </div>
                <h1>Full-Stack Web Developer</h1>
                <hr></hr>
                <div className="buttons">
                    <button>Web development</button>
                    <button>Web Applications</button>
                    <button>Web Design</button>
                    <button>Full-Stack Development</button>
                    <button>Front-End Development</button>
                    <button>Back-End Development</button>
                    <button>Front-End Frameworks</button>
                    <button>Back-End Frameworks</button>
                    <button>Computer Science</button>
                    <button>Software Development</button>
                    <button>Algorithms</button>
                    <button>Algorithm Development</button>
                </div>
            </header>
        </>
    )
}