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
import { getAllData, getStory } from "../../apis/Story";
import { getDataByCategory, getAllSlidesForUser } from "../../apis/Story";
import { getBookmarks } from "../../apis/Bookmark";
import BookmarkStory from "../bookmark/BookmarkStory";
import edit from '../../assets/edit.png';
import { userLogin } from "../../apis/Auth";

function Homepage() {
    const categories = ["All", "Food", "Health and Fitness", "Travel", "Movies", "Education"]
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    // const [userCards, setUserCards] = useState([]);
    const [bm, setBm] = useState(false);
    const [showFood, setShowFood] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [showHealth, setShowHealth] = useState(false);
    const [showTravel, setShowTravel] = useState(false);
    const [showMovies, setShowMovies] = useState(false);
    const [showEducation, setShowEducation] = useState(false);
    const [story, setStory] = useState(false)
    // const [login, setLogin] = useState(false)
    const [login, setLogin] = useState(localStorage.getItem('token') !== null); // Check if token is available
    const [selectBookmark, setSelectBoookmark] = useState(false)
    const [showLogout, setShowLogout] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [showRegistration, setShowRegistration] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [addStory, setAddStory] = useState(false)
    const [showLogoutMob, setShowLogoutMob] = useState(false)
    const [showBookmarks, setShowBookmarks] = useState(false);
    const [bookmarkCards, setBookmarkCards] = useState([])
    const [foodCards, setFoodCards] = useState([]);
    const [healthCards, setHealthCards] = useState([]);
    const [travelCards, setTravelCards] = useState([]);
    const [movieCards, setMovieCards] = useState([]);
    const [eduCards, setEduCards] = useState([]);
    const [content, setContent] = useState(false);
    const [bmStory, setbmStory] = useState(false);
    const [yourStories, setYourStories] = useState([]);
    const [storyMob, setStoryMob] = useState(false)
    const [showAddStory, setShowAddStory] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);
    const [bmset, setbm] = useState(false)



    useEffect(() => {
        const handleStorageChange = () => {
            setLogin(localStorage.getItem('token') !== null);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const fetchYourStories = async () => {
        try {
            const userId = localStorage.getItem("userId");
            // Make an API call to fetch stories created by the user
            const response = await getAllSlidesForUser(userId);
            console.log("yeur", response)
            const cardsData = response.map(item => ({
                id: item._id,
                heading: item.slides[0].heading,
                description: item.slides[0].description,
                imageUrl: item.slides[0].imageUrl,
                userId: item.userId
            }));
            console.log("cardsData", cardsData)
            setYourStories(cardsData);
        } catch (error) {
            console.error(error);
        }
    };


    const fetchCardsData = async () => {
        try {
            const foodResponse = await getDataByCategory("food");
            if (foodResponse && Array.isArray(foodResponse) && foodResponse.length > 0) {
                const cardsData = foodResponse.map(item => ({
                    id: item._id,
                    heading: item.slides[0].heading,
                    description: item.slides[0].description,
                    imageUrl: item.slides[0].imageUrl,
                    userId: item.userId
                }));
                setFoodCards(cardsData);
            }

            const healthResponse = await getDataByCategory("health and fitness");
            if (healthResponse && Array.isArray(healthResponse) && healthResponse.length > 0) {
                const cardsData = healthResponse.map(item => ({
                    id: item._id,
                    heading: item.slides[0].heading,
                    description: item.slides[0].description,
                    imageUrl: item.slides[0].imageUrl,
                    userId: item.userId
                }));
                setHealthCards(cardsData);
            }

            const travelResponse = await getDataByCategory("travel");
            console.log('travel', travelResponse)
            if (travelResponse && Array.isArray(travelResponse) && travelResponse.length > 0) {
                const cardsData = travelResponse.map(item => ({
                    id: item._id,
                    heading: item.slides[0].heading,
                    description: item.slides[0].description,
                    imageUrl: item.slides[0].imageUrl,
                    userId: item.userId
                }));
                setTravelCards(cardsData);
            }

            const movieResponse = await getDataByCategory("movies");
            console.log('movies', movieResponse)
            if (movieResponse && Array.isArray(movieResponse) && movieResponse.length > 0) {
                const cardsData = movieResponse.map(item => ({
                    id: item._id,
                    heading: item.slides[0].heading,
                    description: item.slides[0].description,
                    imageUrl: item.slides[0].imageUrl,
                    userId: item.userId
                }));
                setMovieCards(cardsData);
            }

            const eduResponse = await getDataByCategory("education");
            if (eduResponse && Array.isArray(eduResponse) && eduResponse.length > 0) {
                const cardsData = eduResponse.map(item => ({
                    id: item._id,
                    heading: item.slides[0].heading,
                    description: item.slides[0].description,
                    imageUrl: item.slides[0].imageUrl,
                    userId: item.userId
                }));
                setEduCards(cardsData);
            }

        } catch (error) {
            console.error(error);
        }
    };

    const fetchBookmarksData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const bookmarkResponse = await getBookmarks(token);
                console.log("bookmarks", bookmarkResponse)
                setBookmarkCards(bookmarkResponse);
                // Set bookmarked stories to the state
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCardsData();
        fetchBookmarksData();
        fetchYourStories(); // Fetch bookmark data when the component mounts
    }, []);


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
            case "healthandfitness":
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

    const toggleShowUser = () => {
        setShowUser(!showUser);
    };



    const toggleShowbm = () => {
        setBm(!bm)
    }
    const handleNavBar = () => {
        const token = localStorage.getItem('token');
        if (token) {
            localStorage.setItem('isLoggedIn', 'true');
            setLogin(true);
            window.location.reload()
        }
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        setLogin(false);
        setShowLogout(false);
        window.location.reload();
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

    const handleAddStory = () => {
        setAddStory(true)
    }

    const handleCloseStory = () => {
        setAddStory(false)
        fetchCardsData();
        window.location.reload()
    }


    const handleClick = () => {
        setSelectBoookmark(!selectBookmark);
        setShowBookmarks(!showBookmarks);
        setContent(!content)
    };

    const handleShowLogout = () => {
        setShowLogout(!showLogout)
    }

    const handleStory = (cardId) => {
        setStory(cardId);
    };
    const handleShowLogoutMob = () => {
        setShowLogoutMob(true)
    }

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        toggleShow(category.toLowerCase());
    };

    const handleStorybm = (card, storyId) => {
        const cardId = card._id;
        console.log("card", cardId)
        setbmStory(cardId);
        setbm(storyId)
    }

    const handleReload = () => {
        setStory(false)
        window.location.reload()
    }
    const [isYourStoryActive, setIsYourStoryActive] = useState(false);
    const loggedInUserId = localStorage.getItem("userId")

    const handleYourStory = () => {
        setStoryMob(!storyMob)
        setIsYourStoryActive(!isYourStoryActive);
    }

    let userStories = yourStories.filter(story => story.userId.$oid === loggedInUserId);


    const handleUpdate = (cardId) => {
        setSelectedStory(cardId);
        setShowAddStory(true);
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
                        <button className={`${styles.logout} ${isYourStoryActive ? styles.active : ''}`} onClick={handleYourStory}>
                            Your Stories
                        </button>                        <button className={styles.register} onClick={handleAddStory}>Add story</button>
                        <div className={`${styles.bookmarkBox} ${selectBookmark ? styles.selectedb : ''}`} onClick={handleClick}>
                            <img src={bookmark} alt="bookmark" className={styles.bookmark} />
                            <span className={styles.text}>Bookmarks</span>
                        </div>
                        <button className={styles.logout} onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            )}

            {showBookmarks && content && (
                <div className={styles.bookmarksContainer}>
                    <h2 className={styles.top}>Your Bookmarks</h2>
                    <div className={styles.cardContainer}>
                        {bookmarkCards.slice(0, bm ? bookmarkCards.length : 4).map((card, index) => (

                            <div className={styles.card} key={index}>
                                <div className={styles.cardImage} style={{ backgroundImage: `url(${card.imageUrl})` }}>

                                    <div className={styles.toplay} onClick={() => handleStorybm(card, card.storyId)}></div>

                                    <div className={styles.cardContent}>
                                        <span className={styles.heading}>{card.heading}</span>
                                        <span className={styles.description}>{card.description}</span>
                                    </div>
                                </div>


                                {/* <span className={styles.editBox2}>
                                    {(() => {
                                        handleuserId(card.storyId)
                                            .then(userId => {
                                                if (userId === loggedInUserId) {
                                                    return (
                                                        <div className={styles.editBoxbm}>
                                                            <img src={edit} alt="editImg" />
                                                            <span className={styles.edit}>Edit</span>
                                                        </div>
                                                    );
                                                }
                                            })
                                            .catch(error => {
                                                console.error(error);
                                            });
                                    })()}
                                </span> */}

                            </div>
                        ))
                        }
                    </div>
                    <div className={styles.centeredButton}>
                        {!bm && bookmarkCards.length > 4 && (
                            <button className={styles.more} onClick={() => toggleShowbm()}>
                                See More
                            </button>
                        )}
                    </div>
                </div>
            )}

            {isMobile && storyMob && (
                <div className={styles.yourStories} style={{ display: selectedCategory === "All" ? "block" : "none" }}>
                    <h2 className={styles.top}>Your Stories</h2>
                    <div className={styles.cardContainer}>
                        {selectedCategory === "All" ?
                            userStories.length === 0 ? (
                                <div className={styles.noStories}>
                                    <span className={styles.notext}>No Stories Available</span>
                                </div>) : (
                                userStories.slice(0, showUser ? userStories.length : 4).map((card, index) => (
                                    <div className={styles.card} key={index} >
                                        {console.log("loggedInUserId:", loggedInUserId)}
                                        {console.log(`Card ID: ${card.id.$oid}, User ID: ${card.userId.$oid}`)}                                  <div className={styles.cardImage} style={{ backgroundImage: `url(${card.imageUrl})` }}>
                                            <div className={styles.toplay} onClick={() => handleStory(card.id.$oid)}></div>
                                            <div className={styles.cardContent}>
                                                <span className={styles.heading}>{card.heading}</span>
                                                <span className={styles.description}>{card.description}</span>
                                            </div>
                                        </div>
                                        {card.userId.$oid === loggedInUserId && (
                                            <div className={styles.editBox} onClick={() => { handleUpdate(card.id.$oid) }}>
                                                <img src={edit} alt="editImg" />
                                                <span className={styles.edit}>Edit</span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )
                            : null
                        }

                    </div>
                    <div className={styles.centeredButton}>
                        {!showUser && userStories.length > 4 && (
                            <button className={styles.more} onClick={() => toggleShowUser()}>
                                See More
                            </button>
                        )}
                    </div>

                </div>

            )}

            {!content && !storyMob && (<div>
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

                {login && userStories.length > 0 && !isMobile && (
                    <div className={styles.yourStories} style={{ display: selectedCategory === "All" ? "block" : "none" }}>
                        <h2 className={styles.top}>Your Stories</h2>
                        <div className={styles.cardContainer}>
                            {selectedCategory === "All" ?
                                userStories.slice(0, showUser ? userStories.length : 4).map((card, index) => (
                                    <div className={styles.card} key={index} >
                                        <div className={styles.cardImage} style={{ backgroundImage: `url(${card.imageUrl})` }}>
                                            <div className={styles.toplay} onClick={() => handleStory(card.id.$oid)}></div>
                                            <div className={styles.cardContent}>
                                                <span className={styles.heading}>{card.heading}</span>
                                                <span className={styles.description}>{card.description}</span>
                                            </div>
                                        </div>
                                        {card.userId.$oid === loggedInUserId && (
                                            <div className={styles.editBox} onClick={() => handleUpdate(card.id.$oid)}>
                                                <img src={edit} alt="editImg" />
                                                <span className={styles.edit}>Edit</span>
                                            </div>
                                        )}
                                    </div>
                                ))

                                : null
                            }

                        </div>
                        <div className={styles.centeredButton}>
                            {!showUser && userStories.length > 4 && (
                                <button className={styles.more} onClick={() => toggleShowUser()}>
                                    See More
                                </button>
                            )}
                        </div>
                    </div>
                )}


                <div className={styles.foodCards} style={{ display: selectedCategory === "All" || selectedCategory === "Food" ? "block" : "none" }}>
                    {/* {!isMobile && ( */}
                    <h2 className={styles.top}>Top Stories About Food</h2>
                    {/* // )} */}
                    <div className={styles.cardContainer}>
                        {selectedCategory === "All" || selectedCategory === "Food" ?
                            foodCards.length === 0 ? (
                                <div className={styles.noStories}>
                                    <span className={styles.notext}>No Stories Available</span>
                                </div>) : (
                                foodCards.slice(0, showFood ? foodCards.length : 4).map((card, index) => (
                                    <div className={styles.card} key={index}>
                                        <div className={styles.cardImage} style={{ backgroundImage: `url(${card.imageUrl})` }}>
                                            <div className={styles.toplay} onClick={() => handleStory(card.id)}></div>
                                            <div className={styles.cardContent}>
                                                <span className={styles.heading}>{card.heading}</span>
                                                <span className={styles.description}>{card.description}</span>
                                            </div>
                                        </div>
                                        {card.userId === loggedInUserId && login && (
                                            <div className={styles.editBox} onClick={() => handleUpdate(card.id)}>
                                                <img src={edit} alt="editImg" />
                                                <span className={styles.edit}>Edit</span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )
                            : null
                        }

                    </div>
                    <div className={styles.centeredButton}>
                        {!showFood && foodCards.length > 4 && (
                            <button className={styles.more} onClick={() => toggleShow("food")}>
                                See More
                            </button>
                        )}
                    </div>
                </div>



                <div className={styles.healthCards} style={{ display: selectedCategory === "All" || selectedCategory === "Health and Fitness" ? "block" : "none" }}>
                    <h2 className={styles.top}>Top Stories About Health & Fitness</h2>
                    <div className={styles.cardContainer}>
                        {selectedCategory === "All" || selectedCategory === "Health and Fitness" ?
                            healthCards.length === 0 ? (
                                <div className={styles.noStories}>
                                    <span className={styles.notext}>No Stories Available</span>
                                </div>
                            ) : (
                                healthCards.slice(0, showHealth ? healthCards.length : 4).map((card, index) => (
                                    <div className={styles.card} key={index} >
                                        <div className={styles.cardImage} style={{ backgroundImage: `url(${card.imageUrl})` }}>
                                            <div className={styles.toplay} onClick={() => handleStory(card.id)}></div>
                                            <div className={styles.cardContent}>
                                                <span className={styles.heading}>{card.heading}</span>
                                                <span className={styles.description}>{card.description}</span>
                                            </div>
                                        </div>
                                        {card.userId === loggedInUserId && login && (
                                            <div className={styles.editBox} onClick={() => handleUpdate(card.id)}>
                                                <img src={edit} alt="editImg" />
                                                <span className={styles.edit}>Edit</span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )
                            : null
                        }
                    </div>
                    <div className={styles.centeredButton}>
                        {!showHealth && healthCards.length > 4 && (
                            <button className={styles.more} onClick={() => toggleShow("healthandfitness")}>
                                See More
                            </button>
                        )}
                    </div>
                </div>


                <div className={styles.travelCards} style={{ display: selectedCategory === "All" || selectedCategory === "Travel" ? "block" : "none" }}>
                    <h2 className={styles.top}>Top Stories About Travel</h2>
                    <div className={styles.cardContainer}>
                        {selectedCategory === "All" || selectedCategory === "Travel" ?
                            travelCards.length === 0 ? (
                                <div className={styles.noStories}>
                                    <span className={styles.notext}>No Stories Available</span>
                                </div>
                            ) : (
                                travelCards.slice(0, showTravel ? travelCards.length : 4).map((card, index) => (
                                    <div className={styles.card} key={index}>
                                        <div className={styles.cardImage} style={{ backgroundImage: `url(${card.imageUrl})` }}>
                                            <div className={styles.toplay} onClick={() => handleStory(card.id)}></div>
                                            <div className={styles.cardContent}>
                                                <span className={styles.heading}>{card.heading}</span>
                                                <span className={styles.description}>{card.description}</span>
                                            </div>
                                        </div>
                                        {card.userId === loggedInUserId && login && (
                                            <div className={styles.editBox} onClick={() => handleUpdate(card.id)}>
                                                <img src={edit} alt="editImg" />
                                                <span className={styles.edit}>Edit</span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )
                            : null
                        }
                    </div>
                    <div className={styles.centeredButton}>
                        {!showTravel && travelCards.length > 4 && (
                            <button className={styles.more} onClick={() => toggleShow("travel")}>
                                See More
                            </button>
                        )}
                    </div>
                </div>


                <div className={styles.movieCards} style={{ display: selectedCategory === "All" || selectedCategory === "Movies" ? "block" : "none" }}>
                    <h2 className={styles.top}>Top Stories About Movies</h2>
                    <div className={styles.cardContainer}>
                        {selectedCategory === "All" || selectedCategory === "Movies" ?
                            movieCards.length === 0 ? (
                                <div className={styles.noStories}>
                                    <span className={styles.notext}>No Stories Available</span>
                                </div>
                            ) : (
                                movieCards.slice(0, showMovies ? movieCards.length : 4).map((card, index) => (
                                    <div className={styles.card} key={index}>
                                        <div className={styles.cardImage} style={{ backgroundImage: `url(${card.imageUrl})` }}>
                                            <div className={styles.toplay} onClick={() => handleStory(card.id)}></div>
                                            <div className={styles.cardContent}>
                                                <span className={styles.heading}>{card.heading}</span>
                                                <span className={styles.description}>{card.description}</span>
                                            </div>
                                        </div>
                                        {card.userId === loggedInUserId && login && (
                                            <div className={styles.editBox} onClick={() => handleUpdate(card.id)}>
                                                <img src={edit} alt="editImg" />
                                                <span className={styles.edit}>Edit</span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )
                            : null
                        }
                    </div>
                    <div className={styles.centeredButton}>
                        {!showMovies && movieCards.length > 4 && (
                            <button className={styles.more} onClick={() => toggleShow("movies")}>
                                See More
                            </button>
                        )}
                    </div>
                </div>

                <div className={styles.eduCards} style={{ display: selectedCategory === "All" || selectedCategory === "Education" ? "block" : "none" }}>
                    <h2 className={styles.top}>Top Stories About Education</h2>
                    <div className={styles.cardContainer}>
                        {selectedCategory === "All" || selectedCategory === "Education" ?
                            eduCards.length === 0 ? (
                                <div className={styles.noStories}>
                                    <span className={styles.notext}>No Stories Available</span>
                                </div>
                            ) : (
                                eduCards.slice(0, showEducation ? eduCards.length : 4).map((card, index) => (
                                    <div className={styles.card} key={index} >
                                        <div className={styles.cardImage} style={{ backgroundImage: `url(${card.imageUrl})` }}>
                                            <div className={styles.toplay} onClick={() => handleStory(card.id)}></div>
                                            <div className={styles.cardContent}>
                                                <span className={styles.heading}>{card.heading}</span>
                                                <span className={styles.description}>{card.description}</span>
                                            </div>
                                        </div>
                                        {card.userId === loggedInUserId && login && (
                                            <div className={styles.editBox} onClick={() => handleUpdate(card.id)}>
                                                <img src={edit} alt="editImg" />
                                                <span className={styles.edit}>Edit</span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )
                            : null
                        }
                    </div>
                    <div className={styles.centeredButton}>
                        {!showEducation && eduCards.length > 4 && (
                            <button className={styles.more} onClick={() => toggleShow("education")}>
                                See More
                            </button>
                        )}
                    </div>
                </div>

            </div>)}


            {bmStory !== false && (
                <BookmarkStory cardId={bmStory} storyId={bmset} onClose={() => setbmStory(false)} />
            )
            }

            {story !== false && (
                <Story cardId={story} onClose={handleReload} />
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

            {showAddStory && (
                <AddStory
                    storyId={selectedStory}
                    onClose={() => { setShowAddStory(false); window.location.reload() }}
                />
            )}

        </div>
    )
}

export default Homepage;