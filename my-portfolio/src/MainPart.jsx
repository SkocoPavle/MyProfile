import { useEffect, useState, useRef } from "react";
import "./MainPart.css";
import firstProject from "./img/Movie-project-slika-pocetne-stranice.png";
import secondProject from "./img/Snimak ekrana 2025-06-26 144846.png";
import thirdProject from "./img/react-slika.png";
import rightArrow from "./img/right-arrow.png";
import leftArrow from  "./img/left-arrow.png";
import mypic from "./img/Collage maker project (4).png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faUpwork} from "@fortawesome/free-brands-svg-icons";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass, faLaptopCode, faBars, faDatabase, faGear, faUser, faMobile,faChalkboardUser, faCode } from "@fortawesome/free-solid-svg-icons";


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
        
        <div className="services-container">
            <h3 className="naslov">── My Services ──</h3>
            <h2 className="desctription">What Solutions I Provide</h2>

            <div className="all-services">
                {/* Service 1 */}
                <div className="services">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="service-icon" />
                    </div>
                    <h2>SEO Optimization</h2>
                    <p className="desc-par">
                        Improve your website’s visibility on Google and other search engines through on-page optimization, keyword strategy, and high-authority backlink building.
                    </p>
                    <button className="direction">
                        <img src={rightArrow} alt="Right Arrow" className="rarr" />
                    </button>
                </div>

                {/* Service 2 */}
                <div className="services">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faLaptopCode} className="service-icon" />
                    </div>
                    <h2>Web Design & Development</h2>
                    <p className="desc-par">
                        Create stunning, responsive, and user-focused websites that not only look great but also provide great experiences and convert visitors into loyal customers.
                    </p>
                    <button className="direction">
                        <img src={rightArrow} alt="Right Arrow" className="rarr" />
                    </button>
                </div>

                {/* Service 3 */}
                <div className="services">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faGear} className="service-icon" />
                    </div>
                    <h2>Performance Optimization</h2>
                    <p className="desc-par">
                        Improve your website’s loading speed, responsiveness, and overall user experience to retain visitors, enhance engagement, and boost conversions across all devices.
                    </p>
                    <button className="direction">
                        <img src={rightArrow} alt="Right Arrow" className="rarr" />
                    </button>
                </div>

                {/* Service 4 */}
                <div className="services">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faUser} className="service-icon" />
                    </div>
                    <h2>UI/UX Design</h2>
                    <p className="desc-par">
                        Create engaging UI/UX designs that combine clean visual interfaces with intuitive user experiences, ensuring websites and applications are both attractive and easy to use.
                    </p>
                    <button className="direction">
                        <img src={rightArrow} alt="Right Arrow" className="rarr" />
                    </button>
                </div>

                {/* Service 5 */}
                <div className="services">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faMobile} className="service-icon" />
                    </div>
                    <h2>Responsive Web Design</h2>
                    <p className="desc-par">
                        Develop fully responsive websites that adapt seamlessly to all devices, providing a consistent and user-friendly experience on desktops, tablets, and mobile phones.
                    </p>
                    <button className="direction">
                        <img src={rightArrow} alt="Right Arrow" className="rarr" />
                    </button>
                </div>

                {/* Service 6*/}
                <div className="services">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faBars} className="service-icon" />
                    </div>
                    <h2>API Integration</h2>
                    <p className="desc-par">
                       API Integration allows your app to connect with external services, enabling secure data exchange and adding powerful features such as payments, authentication, and third-party tools.
                    </p>
                    <button className="direction">
                        <img src={rightArrow} alt="Right Arrow" className="rarr" />
                    </button>
                </div>

                {/* Service 7*/}
                <div className="services">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faDatabase} className="service-icon" />
                    </div>
                    <h2>Database & Backend</h2>
                    <p className="desc-par">
                        Build and manage SQL databases with backend development for secure data handling, efficient queries, and smooth frontend integration for dynamic applications.
                    </p>
                    <button className="direction">
                        <img src={rightArrow} alt="Right Arrow" className="rarr" />
                    </button>
                </div>

                {/* Service 8*/}

                <div className="services">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faCode} className="service-icon" />
                    </div>
                    <h2>Computer Science</h2>
                    <p className="desc-par">
                        Apply computer science principles to solve complex problems using efficient algorithms, leveraging programming languages like C and Python to build reliable and optimized solutions.
                    </p>
                    <button className="direction">
                        <img src={rightArrow} alt="Right Arrow" className="rarr" />
                    </button>
                </div>

                {/* Service 9*/}
                <div className="services">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faChalkboardUser} className="service-icon" />
                    </div>
                    <h2>Consulting & Strategy</h2>
                    <p className="desc-par">
                        Providing expert guidance on web development, design strategy, SEO, and overall digital growth to maximize your online presence and drive measurable business success.
                    </p>
                    <button className="direction">
                        <img src={rightArrow} alt="Right Arrow" className="rarr" />
                    </button>
                </div>
            </div>
        </div>

        <div className="footer-section">
            <h2 className="about-me">Hello, I'm Pavle</h2>
            <h2 className="skills">WEB DEVELOPER * WEB DESIGNER * CONSULTANT</h2>
            <div className="text">
                <p className="p4">Build Something Great — With a Full-Stack Developer Who Gets It Done.</p>
                <p className="p4">Are you looking for a developer who doesn’t just write code, but builds complete, polished digital experiences? I’m a Full-Stack Web Developer with hands-on experience creating everything from elegant single-page websites to robust, scalable web applications and online stores.</p>
                <p className="p4">My work bridges design and functionality, ensuring every site or app I build not only looks great but performs flawlessly. I specialize in bringing ideas to life on the web—whether you need a sleek landing page to showcase your services, a fully featured e-commerce platform, or a custom tool tailored to your business needs.</p>
                <h2 className="about-me-naslov">Here’s what you can expect when we work together:</h2>
            </div>

                <div className="skills-div">
                    <div className="skill-services">
                        <div className="skill-container">
                            <p className="skill-icon">✅</p>
                        </div>
                        <h2>Versatile Skill Set</h2>
                        <p className="des">
                            I work fluently with HTML, CSS, JavaScript, React, Python, JSON, and SQL. From responsive front-end visuals to robust back-end logic, I handle every aspect of web development with care.
                        </p>
                        <button className="show-direction">
                            <img src={rightArrow} alt="Right Arrow" className="rar" />
                        </button>
                    </div>

                    <div className="skill-services">
                        <div className="skill-container">
                            <p className="skill-icon">🔧</p>
                        </div>
                        <h2>Full-Cycle Development</h2>
                        <p className="des">
                             I manage the entire project lifecycle—from planning and development to launch and support—so you don’t have to juggle multiple freelancers.
                        </p>
                        <button className="show-direction">
                            <img src={rightArrow} alt="Right Arrow" className="rar" />
                        </button>
                    </div>

                    <div className="skill-services">
                        <div className="skill-container">
                            <p className="skill-icon">🧠</p>
                        </div>
                        <h2>Analytical & Algorithmic Thinking</h2>
                        <p className="des">
                            With experience in C and Python, I can tackle complex logic and data-driven features that go beyond the basics.
                        </p>
                        <button className="show-direction">
                            <img src={rightArrow} alt="Right Arrow" className="rar" />
                        </button>
                    </div>

                    <div className="skill-services">
                        <div className="skill-container">
                            <p className="skill-icon">🚀</p>
                        </div>
                        <h2>Independent & Reliable</h2>
                        <p className="des">
                            I take every task with complete ownership and responsibility, allowing you to focus on your business while I manage all technical details efficiently.
                        </p>
                        <button className="show-direction">
                            <img src={rightArrow} alt="Right Arrow" className="rar" />
                        </button>
                    </div>

                    <div className="skill-services">
                        <div className="skill-container">
                            <p className="skill-icon">📚</p>
                        </div>
                        <h2>Always Evolving</h2>
                        <p className="des">
                            I stay on top of emerging technologies, constantly learning, refining my skills, and exploring new tools to deliver modern, efficient, and future-proof solutions for every project.
                        </p>
                        <button className="show-direction">
                            <img src={rightArrow} alt="Right Arrow" className="rar" />
                        </button>
                    </div>

                    <div className="skill-services">
                        <div className="skill-container">
                            <p className="skill-icon">💬</p>
                        </div>
                        <h2>Clear, Regular Communication</h2>
                        <p className="des">
                            I believe a successful project is built on transparency, so you’ll always know where things stand and how we’re progressing.
                        </p>
                        <button className="show-direction">
                            <img src={rightArrow} alt="Right Arrow" className="rar" />
                        </button>
                    </div>
                </div>

                <div className="div-of-the-picture">
                    <img src={mypic} alt="picture of myself" className="myself-picture"></img>
                </div>

<<<<<<< HEAD
            </div>

            <div className="contacts">
                
=======
>>>>>>> my-new-branch
            </div>
    </>
    );
}
