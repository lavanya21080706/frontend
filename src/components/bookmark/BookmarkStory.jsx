import React, { useState, useEffect } from "react";
import styles from './BookmarkStory.module.css';
import left from '../../assets/leftArrow.png';
import right from '../../assets/right.png';
import cancel from '../../assets/cross.png'
import share from '../../assets/share.png'
import like from '../../assets/like.png'
import bookmark from '../../assets/bookmark.png'
import liked from '../../assets/red.png'
import bookmarked from '../../assets/blue.png'
import { getBookmarks, deleteBookmark } from "../../apis/Bookmark";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { likeSlide } from '../../apis/Story'
import { dislikeSlide,getLikesCount } from '../../apis/Story';

function BookmarkStory({ cardId, storyId,onClose }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [bookmarkedSlideIds, setBookmarkedSlideIds] = useState([]);
    const [isStoryOpen, setIsStoryOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [slideData, setSlideData] = useState(null);
    const [bmImg, setBmImg] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [likedSlides, setLikedSlides] = useState([]);

    const baseURL = 'https://lavanya21080706.github.io/frontend/';

    const handlesharelink = (id, storyId) => {

        const url = `${baseURL}#/card/${id}/${storyId}`;
        console.log("id", id)
        console.log("story", storyId)
        navigator.clipboard
            .writeText(url)
            .then(() => {
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                }, 1000);
              
            })
            .catch((error) => {
                console.error('Failed to copy the URL to the clipboard:', error);
                toast.error('Failed to copy the Card Link', {
                    autoClose: 1000,
                    hideProgressBar: true,
                });
            });
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
        if (cardId) {
            fetchCardData(cardId);
            fetchlikes();
        }
    }, [cardId]);

    const fetchlikes = async()=>{
        const likesCount = await getLikesCount(storyId, cardId);
        setLikesCount(likesCount);
    }

    const fetchCardData = async (cardId) => {
        try {
            const token = localStorage.getItem('token');
            const data = await getBookmarks(token, cardId);
            console.log(data)
            const id = data[0]._id;
            const sliderId = localStorage.setItem("sid",id)
            setSlideData(data); 
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (slideData) {
            const intervalId = setInterval(() => {
                setCurrentImageIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;
                    return nextIndex < slideData.length ? nextIndex : 0;
                });
                setProgress(0);
            }, 5000);

            return () => clearInterval(intervalId);
        }
    }, [slideData]);

    useEffect(() => {
        const animationDuration = 1000;
        const progressInterval = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + (1000 / animationDuration) * 100;
                return newProgress >= 100 ? 100 : newProgress;
            });
        }, 1000 / 60);

        return () => clearInterval(progressInterval);
    }, [currentImageIndex]);


    

    const handleLikeClick = async () => {
        const isCurrentlyLiked = likedSlides.includes(currentImageIndex);
        try {
            if (isCurrentlyLiked) {
                setLikedSlides(likedSlides.filter(index => index !== currentImageIndex));
                await dislikeSlide(storyId, cardId);
                fetchlikes();
            } else {
                setLikedSlides([...likedSlides, currentImageIndex]);
                await likeSlide(storyId, cardId);

                fetchlikes();
            }
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };

    const handleBookmarkClick = async () => {
        setBmImg(!bmImg);
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            await deleteBookmark(localStorage.getItem("sid"), token);  
            setBookmarkedSlideIds(prevBookmarkedSlideIds => prevBookmarkedSlideIds.filter(id => id !== slideId));
            toast.success('Bookmark removed successfully', {
                autoClose: 1000,
                hideProgressBar: true,
            });
            fetchCardData(cardId); 
        } catch (error) {
            console.error(error);
        }
    };
    


    const handleNextSlide = () => {
        if (currentImageIndex === slideData.length - 1) {
            return;
        }
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrevSlide = () => {
        if (currentImageIndex === 0) {
            return;
        }
        setCurrentImageIndex((prevIndex) => prevIndex - 1);
    };

    const handleCancelClick = () => {
        setIsStoryOpen(false);
        onClose();
        window.location.reload()
    };

    if (!isStoryOpen || !slideData) {
        return null;
    }

    return (<>
        {isMobile ? (
            <div className={styles.container}>
                <div className={styles.images}>
                    <img src={slideData[currentImageIndex].imageUrl} alt={`Image ${currentImageIndex}`} className={styles.imgs} />
                    <div className={styles.icons}>
                        <div>
                            <div className={styles.sliders}>
                                {slideData.map((slide, index) => (
                                    <div key={index} className={styles.slide}>
                                        <div className={styles.progressBar} style={{ width: `${index === currentImageIndex ? progress : 0}%`, backgroundColor: index === currentImageIndex ? '#fff' : '#474545' }}></div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.shareBox}>
                                <img src={cancel} alt="cancel Image" className={styles.cancel} onClick={handleCancelClick} />
                                <img src={share} alt="share Image" className={styles.share} onClick={() => { handlesharelink(cardId, storyId) }} />
                            </div>
                        </div>
                        <div>
                            <div className={styles.cardContent}>
                                <span className={styles.heading}>{slideData[currentImageIndex].heading}</span>
                                <span className={styles.description}>{slideData[currentImageIndex].description}</span>
                            </div>
                            <div className={styles.book}>
                            <img src={bmImg ? bookmark : bookmarked} alt="bookmark Image" className={styles.bm} onClick={handleBookmarkClick} />
                                <div className={styles.likeBox}>
                                    <img src={likedSlides.includes(currentImageIndex) ? liked : like} alt="like Image" className={styles.like} onClick={handleLikeClick} />
                                    <span className={styles.likeCount}>{likesCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className={styles.overlay}>
                <div className={styles.container}>
                    <img src={left} alt="left arrow" onClick={handlePrevSlide} />
                    <div className={styles.images}>
                        <img src={slideData[currentImageIndex].imageUrl} alt={`Image ${currentImageIndex}`} className={styles.imgs} />
                        <div className={styles.icons}>
                            <div>
                                <div className={styles.sliders}>
                                    {slideData.map((slide, index) => (
                                        <div key={index} className={styles.slide}>
                                            <div className={styles.progressBar} style={{ width: `${index === currentImageIndex ? progress : 0}%`, backgroundColor: index === currentImageIndex ? '#fff' : '#474545' }}></div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.shareBox}>
                                    <img src={cancel} alt="cancel Image" className={styles.cancel} onClick={handleCancelClick} />
                                    <img src={share} alt="share Image" className={styles.share} onClick={() => { handlesharelink(cardId, storyId) }} />
                                </div>
                            </div>
                            <div>
                                <div className={styles.cardContent}>
                                    <span className={styles.heading}>{slideData[currentImageIndex].heading}</span>
                                    <span className={styles.description}>{slideData[currentImageIndex].description}</span>
                                </div>
                                <div className={styles.book}>
                                    <img src={bmImg ? bookmark : bookmarked} alt="bookmark Image" className={styles.bm} onClick={handleBookmarkClick} />
                                    <div className={styles.likeBox}>
                                    <img src={likedSlides.includes(currentImageIndex) ? liked : like} alt="like Image" className={styles.like} onClick={handleLikeClick} />
                                    <span className={styles.likeCount}>{likesCount}</span>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src={right} alt="right arrow" onClick={handleNextSlide} />
                </div>
            </div>
        )}
    </>

    );
}

export default BookmarkStory;
