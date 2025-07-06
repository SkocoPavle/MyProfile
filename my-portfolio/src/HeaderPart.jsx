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
                <div className="buttons-top">
                    <button className="btn">Web development</button>
                    <button className="btn">Web Applications</button>
                    <button className="btn">Web Design</button>
                    <button className="btn">Full-Stack Development</button>
                    <button className="btn">Front-End Development</button>
                    <button className="btn">Back-End Development</button>
                </div>
                <div className="buttons-middle">
                    <button className="btn">Front-End Frameworks</button>
                    <button className="btn">Back-End Frameworks</button>
                </div>
                <div className="buttons-bottom">
                    <button className="btn">Computer Science</button>
                    <button className="btn">Software Development</button>
                    <button className="btn">Algorithms</button>
                    <button className="btn">Algorithm Development</button>

                </div>
            </header>
        </>
    )
}