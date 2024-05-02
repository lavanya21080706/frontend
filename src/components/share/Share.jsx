import React, { useState, useEffect } from "react";
import styles from './Share.module.css';
import left from '../../assets/leftArrow.png';
import right from '../../assets/right.png';
import cancel from '../../assets/cross.png'
import share from '../../assets/share.png'
import like from '../../assets/like.png'
import bookmark from '../../assets/bookmark.png'
import liked from '../../assets/red.png'
import bookmarked from '../../assets/blue.png'
import { getStory } from "../../apis/Story";
import { addBookmark, getBookmarks, deleteBookmark } from "../../apis/Bookmark";
import Login from "../login/Login";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { likeSlide } from '../../apis/Story'
import { dislikeSlide } from '../../apis/Story';

function Share({ cardId, onClose }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [likedSlides, setLikedSlides] = useState([]);
    const [bookmarkedSlides, setBookmarkedSlides] = useState([]);
    const [isStoryOpen, setIsStoryOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [cardData, setCardData] = useState(null);
    const [loginPrompt, setLoginPrompt] = useState(false)
    const [toastmsg, setToast] = useState(false)

    // const baseURL = 'https://lavanya21080706.github.io/frontend/';

    const handlesharelink = (id, storyId) => {

        setLoginPrompt(true);
    };

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
        const fetchCardData = async () => {
            try {
                const data = await getStory(cardId);
                setCardData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCardData();
    }, [cardId]);

    useEffect(() => {
        if (!cardData || !cardData.slides || cardData.slides.length === 0) return;
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                return nextIndex < cardData.slides.length ? nextIndex : prevIndex;
            });
            setProgress(0);
        }, 2500);

        return () => clearInterval(intervalId);
    }, [cardData]);


    useEffect(() => {
        if (!cardData || !cardData.slides || cardData.slides.length === 0) return;
        const animationDuration = 1000;
        const progressInterval = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + (1000 / animationDuration) * 100;
                return newProgress >= 100 ? 100 : newProgress;
            });
        }, 1000 / 60);

        return () => clearInterval(progressInterval);
    }, [currentImageIndex, cardData]);

    useEffect(() => {
        // Retrieve bookmarked slides from localStorage when component mounts
        const storedBookmarkedSlides = JSON.parse(localStorage.getItem('bookmarkedSlides'));
        if (storedBookmarkedSlides) {
            setBookmarkedSlides(storedBookmarkedSlides);
        }
    }, []);

    const handleLikeClick = async () => {
            setLoginPrompt(true);
       
        const isCurrentlyLiked = likedSlides.includes(currentImageIndex);
        try {
            if (isCurrentlyLiked) {
                setLikedSlides(likedSlides.filter(index => index !== currentImageIndex));
                // Call the dislikeSlide API to decrement the like count
                await dislikeSlide(cardId, cardData.slides[currentImageIndex]._id);
                // Fetch the updated story data after disliking
                const updatedStory = await getStory(cardId);
                // Update the like count in the state
                setCardData(updatedStory);
            } else {
                setLikedSlides([...likedSlides, currentImageIndex]);
                // Call the likeSlide API to increment the like count
                await likeSlide(cardId, cardData.slides[currentImageIndex]._id);
                // Fetch the updated story data after liking
                const updatedStory = await getStory(cardId);
                // Update the like count in the state
                setCardData(updatedStory);
            }
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };

    const handleBookmarkClick = async () => {
        setLoginPrompt(true);
        const isCurrentlyBookmarked = bookmarkedSlides.includes(currentImageIndex);
        
        try {
            if (isCurrentlyBookmarked) {
                // Unbookmark the slide
                setBookmarkedSlides(bookmarkedSlides.filter(index => index !== currentImageIndex));
                await deleteBookmark(cardData.slides[currentImageIndex]._id, token);
            } else {
                // Bookmark the slide
                setBookmarkedSlides([...bookmarkedSlides, currentImageIndex]);
                await addBookmark(cardId, cardData.slides[currentImageIndex]._id, token);
            }
        } catch (error) {
            console.error("Error handling bookmark:", error);
        }
    };


    const handleNextSlide = () => {
        if (!cardData || !cardData.slides || cardData.slides.length === 0) return;
        setCurrentImageIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            return nextIndex < cardData.slides.length ? nextIndex : prevIndex; // No looping behavior
        });
    };

    const handlePrevSlide = () => {
        if (!cardData || !cardData.slides || cardData.slides.length === 0) return;
        setCurrentImageIndex((prevIndex) => {
            const nextIndex = prevIndex - 1;
            return nextIndex >= 0 ? nextIndex : prevIndex; // No looping behavior
        });
    };

    const handleImageClick = (e) => {
        const { clientX } = e;
        const { left: containerLeft, width: containerWidth } = e.target.getBoundingClientRect();
        const clickPosition = clientX - containerLeft;
        if (clickPosition < containerWidth / 2) {
            // Clicked on the left half of the image
            handlePrevSlide();
        } else {
            // Clicked on the right half of the image
            handleNextSlide();
        }
    };


    const handleCancelClick = () => {
        setIsStoryOpen(false);
        onClose();
    };

    if (!isStoryOpen || !cardData || !cardData.slides || cardData.slides.length === 0) {
        return null;
    }

    const handleLoginSubmit = () => {
        setLoginPrompt(false);
    };



    return (
        <>
            {loginPrompt && (
                <Login onClose={handleLoginSubmit} />
            )}
            {isMobile ? (
                <div className={styles.container} onClick={handleImageClick}>
                    <div className={styles.images}>
                        <img src={cardData.slides[currentImageIndex].imageUrl} alt={`Image ${currentImageIndex}`} className={styles.imgs} />
                        <div className={styles.icons}>
                            <div>
                                <div className={styles.sliders}>
                                    {cardData.slides.map((slide, index) => (
                                        <div key={index} className={styles.slide}>
                                            <div className={styles.progressBar} style={{ width: `${index === currentImageIndex ? progress : 0}%`, backgroundColor: index === currentImageIndex ? '#fff' : '#474545' }}></div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.shareBox}>
                                    <img src={cancel} alt="cancel Image" className={styles.cancel} onClick={handleCancelClick} />
                                    <img src={share} alt="share Image" className={styles.share} onClick={() => { handlesharelink(cardData.slides[currentImageIndex]._id, cardId) }} />
                                </div>
                            </div>
                            <div>
                                <div className={styles.cardContent}>
                                    <span className={styles.heading}>{cardData.slides[currentImageIndex].heading}</span>
                                    <span className={styles.description}>{cardData.slides[currentImageIndex].description}</span>
                                </div>
                                <div className={styles.book}>
                                    <img src={bookmarkedSlides.includes(currentImageIndex) ? bookmarked : bookmark} alt="bookmark Image" className={styles.bm} onClick={handleBookmarkClick} />
                                    <div className={styles.likeBox}>
                                        <img src={likedSlides.includes(currentImageIndex) ? liked : like} alt="like Image" className={styles.like} onClick={handleLikeClick} />
                                        <span className={styles.likeCount}>{cardData.slides[currentImageIndex].likes}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {toastmsg && (
                        <div className={styles.toast}>
                            <span className={styles.message}>Link copied to clipboard</span>
                        </div>
                    )

                    }
                </div>
            ) : (
                <div className={styles.overlay}>
                    <div className={styles.container}>
                        <img src={left} alt="left arrow" onClick={handlePrevSlide} />
                        <div className={styles.images}>
                            <img src={cardData.slides[currentImageIndex].imageUrl} alt={`Image ${currentImageIndex}`} className={styles.imgs} />
                            <div className={styles.icons}>
                                <div>
                                    <div className={styles.sliders}>
                                        {cardData.slides.map((slide, index) => (
                                            <div key={index} className={styles.slide}>
                                                <div className={styles.progressBar} style={{ width: `${index === currentImageIndex ? progress : 0}%`, backgroundColor: index === currentImageIndex ? '#fff' : '#474545' }}></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.shareBox}>
                                        <img src={cancel} alt="cancel Image" className={styles.cancel} onClick={handleCancelClick} />
                                        <img src={share} alt="share Image" className={styles.share} onClick={() => { handlesharelink(cardData.slides[currentImageIndex]._id, cardId) }} />
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.cardContent}>
                                        <span className={styles.heading}>{cardData.slides[currentImageIndex].heading}</span>
                                        <span className={styles.description}>{cardData.slides[currentImageIndex].description}</span>
                                    </div>
                                    <div className={styles.book}>
                                        <img src={bookmarkedSlides.includes(currentImageIndex) ? bookmarked : bookmark} alt="bookmark Image" className={styles.bm} onClick={handleBookmarkClick} />
                                        <div className={styles.likeBox}>
                                            <img src={likedSlides.includes(currentImageIndex) ? liked : like} alt="like Image" className={styles.like} onClick={handleLikeClick} />
                                            <span className={styles.likeCount}>{cardData.slides[currentImageIndex].likes}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img src={right} alt="right arrow" onClick={handleNextSlide} />
                    </div>
                    {toastmsg && (
                        <div className={styles.toast}>
                            <span className={styles.message}>Link copied to clipboard</span>
                        </div>
                    )

                    }
                </div>
            )}
        </>
    );
}

export default Share;


