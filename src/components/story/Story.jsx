import React, { useState, useEffect } from "react";
import styles from './Story.module.css';
import left from '../../assets/leftArrow.png';
import right from '../../assets/right.png';
import cancel from '../../assets/cross.png'
import share from '../../assets/share.png'
import like from '../../assets/like.png'
import bookmark from '../../assets/bookmark.png'
import liked from '../../assets/red.png'
import bookmarked from '../../assets/blue.png'



function Story({ onClose }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [likedSlides, setLikedSlides] = useState([]);
    const [bookmarkedSlides, setBookmarkedSlides] = useState([]);
    const [isStoryOpen, setIsStoryOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const slidesData = [
        {
            "image": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFsnLF0kBH5jtyIVepF-voFFLfDB3zhymg9f0DpzLDlA&s',
            "heading": "Slide 1 Heading",
            "description": "Description for Slide 1"
        },
        {
            "image": 'https://freefiremobile-a.akamaihd.net/common/web_event/official2.ff.garena.all/img/20228/586a6c352ff1c2201c3df9e0b4a97fe4.jpg',
            "heading": "Slide 2 Heading",
            "description": "Description for Slide 2"
        },
        {
            "image": 'https://freefiremobile-a.akamaihd.net/common/web_event/official2.ff.garena.all/img/20228/64e8b129e5fb11a6f7bff1f48ac0516f.jpg',
            "heading": "Slide 3 Heading",
            "description": "Description for Slide 3"
        }
    ]


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                return nextIndex < slidesData.length ? nextIndex : prevIndex;
            });
            setProgress(0);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [slidesData.length]);


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

    const handleLikeClick = () => {
        const isCurrentlyLiked = likedSlides.includes(currentImageIndex);
        if (isCurrentlyLiked) {
            setLikedSlides(likedSlides.filter(index => index !== currentImageIndex));
        } else {
            setLikedSlides([...likedSlides, currentImageIndex]);
        }
    };

    const handleBookmarkClick = () => {
        const isCurrentlyBookmarked = bookmarkedSlides.includes(currentImageIndex);
        if (isCurrentlyBookmarked) {
            setBookmarkedSlides(bookmarkedSlides.filter(index => index !== currentImageIndex));
        } else {
            setBookmarkedSlides([...bookmarkedSlides, currentImageIndex]);
        }
    };

    const handleNextSlide = () => {
        if (currentImageIndex === slidesData.length - 1) {
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
    };

    if (!isStoryOpen) {
        return null;
    }

    return (<>
        {isMobile ? (
            <div className={styles.container}>
                <div className={styles.images}>
                    <img src={slidesData[currentImageIndex].image} alt={`Image ${currentImageIndex}`} className={styles.imgs} />
                    <div className={styles.icons}>
                        <div>
                            <div className={styles.sliders}>
                                {slidesData.map((slide, index) => (
                                    <div key={index} className={styles.slide}>
                                        <div className={styles.progressBar} style={{ width: `${index === currentImageIndex ? progress : 0}%`, backgroundColor: index === currentImageIndex ? '#fff' : '#474545' }}></div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.shareBox}>
                                <img src={cancel} alt="cancel Image" className={styles.cancel} onClick={handleCancelClick} />
                                <img src={share} alt="share Image" className={styles.share} />
                            </div>
                        </div>
                        <div>

                            <div className={styles.cardContent}>
                                  <span className={styles.heading}>{slidesData[currentImageIndex].heading}</span>
                                  <span className={styles.description}>{slidesData[currentImageIndex].description}</span>
                              </div>


    
                            <div className={styles.book}>
                                <img src={bookmarkedSlides.includes(currentImageIndex) ? bookmarked : bookmark} alt="bookmark Image" className={styles.bm} onClick={handleBookmarkClick} />
                                <div className={styles.likeBox}>
                                    <img src={likedSlides.includes(currentImageIndex) ? liked : like} alt="like Image" className={styles.like} onClick={handleLikeClick} />
                                    <span className={styles.likeCount}>1234</span>
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
                        <img src={slidesData[currentImageIndex].image} alt={`Image ${currentImageIndex}`} className={styles.imgs} />
                        <div className={styles.icons}>
                            <div>
                                <div className={styles.sliders}>
                                    {slidesData.map((slide, index) => (
                                        <div key={index} className={styles.slide}>
                                            <div className={styles.progressBar} style={{ width: `${index === currentImageIndex ? progress : 0}%`, backgroundColor: index === currentImageIndex ? '#fff' : '#474545' }}></div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.shareBox}>
                                    <img src={cancel} alt="cancel Image" className={styles.cancel} onClick={handleCancelClick} />
                                    <img src={share} alt="share Image" className={styles.share} />
                                </div>
                            </div>
                            <div>

                                <div className={styles.cardContent}>
                                    <span className={styles.heading}>{slidesData[currentImageIndex].heading}</span>
                                    <span className={styles.description}>{slidesData[currentImageIndex].description}</span>
                                </div>
                                <div className={styles.book}>
                                    <img src={bookmarkedSlides.includes(currentImageIndex) ? bookmarked : bookmark} alt="bookmark Image" className={styles.bm} onClick={handleBookmarkClick} />
                                    <div className={styles.likeBox}>
                                        <img src={likedSlides.includes(currentImageIndex) ? liked : like} alt="like Image" className={styles.like} onClick={handleLikeClick} />
                                        <span className={styles.likeCount}>1234</span>
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

export default Story;



