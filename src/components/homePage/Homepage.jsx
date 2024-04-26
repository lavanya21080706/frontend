import React, { useState, useEffect } from "react";
import styles from './Homepage.module.css'
import Story from '../story/Story'
import bookmark from '../../assets/bookmark.png'
import profile from '../../assets/profile.png'
import hamburger from '../../assets/hamburger.png'
import Register from '../register/Register'
import Login from '../login/Login'
import AddStory from "../addStory/AddStory";
import cancel from '../../assets/cancelImg.png'

function Homepage() {
    const categories = ["All", "Food", "Health and Fitness", "Travel", "Movies", "Education"]
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [showFood, setShowFood] = useState(false);
    const [showHealth, setShowHealth] = useState(false);
    const [showTravel, setShowTravel] = useState(false);
    const [showMovies, setShowMovies] = useState(false);
    const [showEducation, setShowEducation] = useState(false);
    const [story, setStory] = useState(false)
    const [login, setLogin] = useState(false)
    const [selectBookmark, setSelectBoookmark] = useState(false)
    const [showLogout, setShowLogout] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [showRegistration, setShowRegistration] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [addStory, setAddStory] = useState(false)
    const [showLogoutMob, setShowLogoutMob] = useState(false)


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            setLogin(true);
        }
    }, []);

    const userName = localStorage.getItem('username');

    const toggleShow = (section) => {
        switch (section) {
            case "food":
                setShowFood(!showFood);
                break;
            case "health":
                setShowHealth(!showHealth);
                break;
            case "travel":
                setShowTravel(!showTravel);
                break;
            case "movies":
                setShowMovies(!showMovies);
                break;
            case "education":
                setShowEducation(!showEducation);
                break;
            default:
                break;
        }
    };

    const handleNavBar = () => {
        const token = localStorage.getItem('token');
        if (token) {
            localStorage.setItem('isLoggedIn', 'true');
            setLogin(true);
        }
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        setLogin(false);
        setShowLogout(false);
    };

    const handleRegisterClick = () => {
        setShowRegistration(true);
    };

    const handleCloseRegistration = () => {
        setShowRegistration(false);
        handleNavBar();
    };

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
        handleNavBar();
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleAddStory = () => {
        setAddStory(true)
    }

    const handleCloseStory = () => {
        setAddStory(false)
    }

    const handleClick = () => {
        setSelectBoookmark(true)
    }

    const handleShowLogout = () => {
        setShowLogout(!showLogout)
    }
    const cards = [
        {
            heading: "Delicious Pizza",
            description: "Enjoy the taste of our freshly baked pizza topped with your favorite ingredients.",
            images: [
                "https://i.pinimg.com/736x/5e/77/b5/5e77b58088c2123a778d6c6a00941b75.jpg",
                "pizza2.jpg",
                "pizza3.jpg"
            ]
        },
        {
            heading: "Tasty Burger",
            description: "Savor the juiciness of our signature burger, made with the finest ingredients.",
            images: [
                "https://i.pinimg.com/originals/ad/4c/02/ad4c02f4b76fdcfb885bb911d697a84d.jpg",
                "burger2.jpg",
                "burger3.jpg"
            ]
        },
        {
            heading: "Tasty Burger",
            description: "Savor the juiciness of our signature burger, made with the finest ingredients.",
            images: [
                "https://i.pinimg.com/564x/a9/da/b5/a9dab5bfa391198b3f8b144e7374b17c.jpg",
                "burger2.jpg",
                "burger3.jpg"
            ]
        },
        {
            heading: "Tasty Burger",
            description: "Savor the juiciness of our signature burger, made with the finest ingredients.",
            images: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1-XRn0RNNTylhGZ0QVDVY2AgllUeRFsxVV8v5yu0m3A&s",
                "burger2.jpg",
                "burger3.jpg"
            ]
        },

        {
            heading: "Tasty Burger",
            description: "Savor the juiciness of our signature burger, made with the finest ingredients.",
            images: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1-XRn0RNNTylhGZ0QVDVY2AgllUeRFsxVV8v5yu0m3A&s",
                "burger2.jpg",
                "burger3.jpg"
            ]
        },
        {
            heading: "Tasty Burger",
            description: "Savor the juiciness of our signature burger, made with the finest ingredients.",
            images: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1-XRn0RNNTylhGZ0QVDVY2AgllUeRFsxVV8v5yu0m3A&s",
                "burger2.jpg",
                "burger3.jpg"
            ]
        },
        {
            heading: "Tasty Burger",
            description: "Savor the juiciness of our signature burger, made with the finest ingredients.",
            images: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1-XRn0RNNTylhGZ0QVDVY2AgllUeRFsxVV8v5yu0m3A&s",
                "burger2.jpg",
                "burger3.jpg"
            ]
        },
        {
            heading: "Tasty Burger",
            description: "Savor the juiciness of our signature burger, made with the finest ingredients.",
            images: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1-XRn0RNNTylhGZ0QVDVY2AgllUeRFsxVV8v5yu0m3A&s",
                "burger2.jpg",
                "burger3.jpg"
            ]
        },
    ];

    const handleStory = () => {
        setStory(true);
    }

    const handleShowLogoutMob = () => {
        setShowLogoutMob(true)
    }


    return (
        <div className={styles.container}>
            <div className={styles.navBar}>
                {isMobile && (
                    <span className={styles.swip}>SwipTory</span>
                )}
                {!isMobile && (
                    <span className={styles.swip}>SwipTory</span>
                )}
                {isMobile && (
                    <img src={hamburger} className={styles.hamburger} alt="hamburger" onClick={handleShowLogoutMob} />
                )}
                {!isMobile && login && (
                    <div className={styles.btnslogin}>
                        <div className={`${styles.bookmarkBox} ${selectBookmark ? styles.selectedb : ''}`} onClick={handleClick}>
                            <img src={bookmark} alt="bookmark" className={styles.bookmark} />
                            <span className={styles.text}>Bookmarks</span>
                        </div>
                        <button className={styles.register} onClick={handleAddStory}>Add story</button>
                        <img src={profile} alt="Profile" className={styles.profileImg} />
                        <img src={hamburger} className={styles.hamburger} alt="hamburger" onClick={handleShowLogout} />
                    </div>
                )}
                {!isMobile && !login && (
                    <div className={styles.btns}>
                        <button className={styles.register} onClick={handleRegisterClick}>Register Now</button>
                        <button className={styles.login} onClick={handleLoginClick}>Sign In</button>
                    </div>
                )}
            </div>
            {showLogout && !isMobile && (
                <div className={styles.logoutBox}>
                    <span className={styles.name}>{userName}</span>
                    <button className={styles.logout} onClick={handleLogout}>Logout</button>
                </div>
            )}

            {showLogoutMob && isMobile && (
                <div className={styles.loginBox}>
                    <div className={styles.cancelBox}>
                        <img src={cancel} alt="cancelImg" className={styles.cancelImg} onClick={() => { setShowLogoutMob(false) }} />
                    </div>
                    <div className={styles.btnsMob}>
                        <button className={styles.login} onClick={handleLoginClick}>Login</button>
                        <button className={styles.register} onClick={handleRegisterClick}>Register</button>
                    </div>
                </div>
            )}

            {showLogoutMob && isMobile && login && (
                <div className={styles.loginBox}>
                    <div className={styles.cancelBoxlog}>
                        <div className={styles.profileBox}>
                            <img src={profile} alt="Profile" className={styles.profileImg} />
                            <span className={styles.name}>{userName}</span>
                        </div>
                        <div className={styles.cancelBoxLogg}>
                            <img src={cancel} alt="cancelImg" className={styles.cancelImg} onClick={() => { setShowLogoutMob(false) }} />
                        </div>                   
                         </div>
                    <div className={styles.btnsMobLog}>
                        <button className={styles.logout}>Your Story</button>
                        <button className={styles.register} onClick={handleAddStory}>Add story</button>
                        <div className={`${styles.bookmarkBox} ${selectBookmark ? styles.selectedb : ''}`} onClick={handleClick}>
                            <img src={bookmark} alt="bookmark" className={styles.bookmark} />
                            <span className={styles.text}>Bookmarks</span>
                        </div>
                        <button className={styles.logout} onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            )}

            <div className={styles.categoriesContainer}>
                <div className={styles.categories}>
                    {categories.map((item, index) => (
                        <div
                            className={`${styles.category} ${styles[item.toLowerCase().replace(/\s/g, '')]} ${selectedCategory === item ? styles.selected : ''}`}
                            onClick={() => handleCategoryClick(item)}
                            key={index}
                        >
                            <div className={styles.overlay}>
                                <span className={styles.item}>{item}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.foodCards}>
                {!isMobile && (
                    <h2 className={styles.top}>Top Stories About Food</h2>
                )}
                <div className={styles.cardContainer}>
                    {cards.slice(0, showFood ? cards.length : 4).map((card, index) => (
                        <div className={styles.card} key={index} onClick={() => handleStory(index)}>
                            <div className={styles.cardImage} style={{ backgroundImage: `url(${card.images[0]})` }}>
                                <div className={styles.toplay} ></div>
                                <div className={styles.cardContent}>
                                    <span className={styles.heading}>{card.heading}</span>
                                    <span className={styles.description}>{card.description}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {!showFood && cards.length > 4 && (
                    <button className={styles.more} onClick={() => toggleShow("food")}>
                        See More
                    </button>
                )}
            </div>

            <div className={styles.healthCards}>
                <h2 className={styles.top}>Top Stories About Health & Fitness</h2>
                <div className={styles.cardContainer}>
                    {cards.slice(0, showHealth ? cards.length : 4).map((card, index) => (
                        <div className={styles.card} key={index}>
                            <div className={styles.cardImage} style={{ backgroundImage: `url(${card.images[0]})` }}>
                                <div className={styles.toplay}></div>
                                <div className={styles.cardContent}>
                                    <span className={styles.heading}>{card.heading}</span>
                                    <span className={styles.description}>{card.description}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {!showHealth && cards.length > 4 && (
                    <button className={styles.more} onClick={() => toggleShow("health")}>
                        See More
                    </button>
                )}
            </div>


            <div className={styles.travelCards}>
                <h2 className={styles.top}>Top Stories About Travel</h2>
                <div className={styles.cardContainer}>
                    {cards.slice(0, showTravel ? cards.length : 4).map((card, index) => (
                        <div className={styles.card} key={index}>
                            <div className={styles.cardImage} style={{ backgroundImage: `url(${card.images[0]})` }}>
                                <div className={styles.toplay}></div>
                                <div className={styles.cardContent}>
                                    <span className={styles.heading}>{card.heading}</span>
                                    <span className={styles.description}>{card.description}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {!showTravel && cards.length > 4 && (
                    <button className={styles.more} onClick={() => toggleShow("travel")}>
                        See More
                    </button>
                )}
            </div>


            <div className={styles.movieCards}>
                <h2 className={styles.top}>Top Stories About Movies</h2>
                <div className={styles.cardContainer}>
                    {cards.slice(0, showMovies ? cards.length : 4).map((card, index) => (
                        <div className={styles.card} key={index}>
                            <div className={styles.cardImage} style={{ backgroundImage: `url(${card.images[0]})` }}>
                                <div className={styles.toplay}></div>
                                <div className={styles.cardContent}>
                                    <span className={styles.heading}>{card.heading}</span>
                                    <span className={styles.description}>{card.description}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {!showMovies && cards.length > 4 && (
                    <button className={styles.more} onClick={() => toggleShow("movies")}>
                        See More
                    </button>
                )}
            </div>

            <div className={styles.eduCards}>
                <h2 className={styles.top}>Top Stories About Education</h2>
                <div className={styles.cardContainer}>
                    {cards.slice(0, showEducation ? cards.length : 4).map((card, index) => (
                        <div className={styles.card} key={index}>
                            <div className={styles.cardImage} style={{ backgroundImage: `url(${card.images[0]})` }}>
                                <div className={styles.toplay}></div>
                                <div className={styles.cardContent}>
                                    <span className={styles.heading}>{card.heading}</span>
                                    <span className={styles.description}>{card.description}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {!showEducation && cards.length > 4 && (
                    <button className={styles.more} onClick={() => toggleShow("education")}>
                        See More
                    </button>
                )}
            </div>

            {story !== false && (
                <Story onClose={() => setStory(false)} />
            )}

            {showRegistration && (
                <Register onClose={handleCloseRegistration} />
            )}

            {showLogin && (
                <Login onClose={handleCloseLogin} />
            )}

            {addStory && (
                <AddStory onClose={handleCloseStory} />
            )}

        </div>
    )
}

export default Homepage;