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
            </header>
        </>
    )
}