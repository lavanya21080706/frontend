import React, { useState, useEffect } from 'react';
import styles from './AddStory.module.css';
import cancel from '../../assets/cancel.png'
import { slidesData,updateStory } from '../../apis/Story';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getStory } from '../../apis/Story';

function AddStory({ onClose, storyId }) {
    const [slideCount, setSlideCount] = useState(3);
    const [slides, setSlides] = useState(Array.from({ length: 3 }, () => ({ heading: '', description: '', imageUrl: '', category: '' })));
    const [selectedSlide, setSelectedSlide] = useState(0);
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState(Array.from({ length: 3 }, () => ''));
    const [categorySelected, setCategorySelected] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [categoryConsistent, setCategoryConsistent] = useState(true); // New state variable for category consistency

    // console.log(storyId)

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const storyData = await getStory(storyId); // Fetch story data using the storyId
                // console.log('story',storyData)
                setSlides(storyData.slides); // Set the slides state with the fetched data
            } catch (error) {
                console.error(error);
                toast.error('Error fetching story data');
            }
        };

        if (storyId) {
            fetchStory();
        }
    }, [storyId]);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const checkCategoryConsistency = () => {
        const category = slides[0].category;
        const consistent = slides.every(slide => slide.category === category);
        setCategoryConsistent(consistent); // Update category consistency state
        if (!consistent) {
            toast.error('Categories should be the same in all slides');
        }
        return consistent;
    };


    const handleAddSlide = () => {
        if (slideCount < 6) {
            setSlideCount(prevCount => prevCount + 1);
            const newCategory = categories[0] || '';
            setSlides(prevSlides => [...prevSlides, { heading: '', description: '', imageUrl: '', category: newCategory }]);
            setCategories(prevCategories => [...prevCategories, newCategory]);
        }
    };


    useEffect(() => {
        handleInputChange(0, 'heading', '');
        handleInputChange(0, 'description', '');
        handleInputChange(0, 'imageUrl', '');
        handleInputChange(0, 'category', '');
    }, []);


    const handleRemoveSlide = (index) => {
        let newSelectedSlide = selectedSlide;

        if (index < selectedSlide) {
            newSelectedSlide = selectedSlide - 1;
        }
        else if (index === selectedSlide) {
            newSelectedSlide = Math.max(0, selectedSlide - 1);
        }
        
        const newSlides = slides.filter((_, i) => i !== index);
        setSlides(newSlides);
        handlePrevSlide();
        setSlideCount(prevCount => prevCount - 1);
        setSelectedSlide(newSelectedSlide);
    };



    const handleSlideClick = (index) => {
        setSelectedSlide(index);
    };

    const handleClose = () => {
        onClose();
    };

    const handleBtnClick = async () => {

        if (!checkCategoryConsistency()) {
            return;
        }
        // Validation check
        const isValid = slides.every(slide => slide.heading.trim() !== '' && slide.description.trim() !== '' && slide.imageUrl.trim() !== '' && slide.category.trim() !== '');
        // console.log("slides", slides);
        const token = localStorage.getItem("token")
        if (isValid) {
            try {
                // Extracting the slide data in the required format
                const formattedSlides = slides.map(slide => ({
                    heading: slide.heading,
                    description: slide.description,
                    imageUrl: slide.imageUrl,
                    category: slide.category
                }));

                // Call the slidesData function from the API file with the formatted slide data
                const response = await slidesData(formattedSlides, token);
                console.log(response); // Log the response from the backend
                toast.success('slides data stored successfully');

                handleClose();
                // Reset the state or perform any other actions as needed
            } catch (error) {
                console.error(error);
                // Handle any errors from the backend
            }
        } else {
            setError(true);
        }
    };

    const handleBtnClick2 = async () => {
        if (!checkCategoryConsistency()) {
            return;
        }
        
        const isValid = slides.every(slide => slide.heading.trim() !== '' && slide.description.trim() !== '' && slide.imageUrl.trim() !== '' && slide.category.trim() !== '');
        const token = localStorage.getItem("token");
        
        if (isValid) {
            try {
                const formattedSlides = slides.map(slide => ({
                    heading: slide.heading,
                    description: slide.description,
                    imageUrl: slide.imageUrl,
                    category: slide.category
                }));

                // Call the updateStory function instead of slidesData
                const response = await updateStory(storyId, formattedSlides, token);
                console.log(response);
                toast.success('Story updated successfully', {
                    autoClose: 1000,
                    hideProgressBar: true,
                });
                handleClose();
            } catch (error) {
                console.error(error);
                toast.error('Error updating story', {
                    autoClose: 1000,
                    hideProgressBar: true,
                });
            }
        } else {
            setError(true);
        }
    };


    const handlePrevSlide = () => {
        setSelectedSlide(prevSlide => Math.max(0, prevSlide - 1));
    };

    const handleNextSlide = () => {
        setSelectedSlide(prevSlide => Math.min(slideCount - 1, prevSlide + 1));
    };

    const handleInputChange = (index, field, value) => {
        const updatedSlides = [...slides];
        updatedSlides[index][field] = value;
        setSlides(updatedSlides);
    };

    return (
        <>
            {!storyId ? (
                <div className={styles.overlay}>
                    <div className={styles.container}>
                        <div className={styles.imgBox}>
                            <img src={cancel} alt="cancel Img" className={styles.cancel} onClick={onClose} />
                            {isMobile ? (
                                <span className={styles.six}>Add story to feed</span>
                            ) : (
                                <span className={styles.six}>Add up to 6 slides</span>
                            )}

                        </div>
                        <div className={styles.content}>
                            <div className={styles.slidesBox}>
                                {slides.map((slide, index) => (
                                    <div
                                        className={`${styles.add} ${(selectedSlide === index || (index === 0 && selectedSlide === -1)) ? styles.selectedSlide : ''}`}
                                        key={index}
                                        onClick={() => handleSlideClick(index)}
                                    >
                                        <span className={styles.text}>Slide {index + 1}</span>
                                        {index >= 3 && (
                                            <img src={cancel} alt="remove" className={styles.cross} onClick={() => handleRemoveSlide(index)} />
                                        )}
                                    </div>
                                ))}

                                {slideCount < 6 && (
                                    <div className={styles.add} onClick={handleAddSlide}>
                                        <span className={styles.text}>Add +</span>
                                    </div>
                                )}
                            </div>

                            {selectedSlide !== -1 && slides[selectedSlide] && (
                                <form className={styles.formBox}>
                                    <div className={styles.box}>
                                        <label className={styles.labels}>Heading :</label>
                                        <input type="text" placeholder="Your heading" className={styles.inputBox} value={slides[selectedSlide].heading} onChange={(e) => handleInputChange(selectedSlide, 'heading', e.target.value)} />
                                    </div>
                                    <div className={styles.box}>
                                        <label className={styles.labels}>Description :</label>
                                        <textarea type="text" placeholder="Story Description" className={styles.inputBoxtext} value={slides[selectedSlide].description} onChange={(e) => handleInputChange(selectedSlide, 'description', e.target.value)} />
                                    </div>
                                    <div className={styles.box}>
                                        <label className={styles.labels}>Image :</label>
                                        <input type="text" placeholder="Add Image url" className={styles.inputBox} value={slides[selectedSlide].imageUrl} onChange={(e) => handleInputChange(selectedSlide, 'imageUrl', e.target.value)} />
                                    </div>


                                    <div className={styles.box}>
                                        <label className={styles.labels}>Category :</label>

                                        <select
                                            className={`${styles.inputBoxcat} ${categorySelected ? styles.black : styles.grey}`}
                                            value={slides[selectedSlide].category}
                                            onChange={(e) => { handleInputChange(selectedSlide, 'category', e.target.value); setCategorySelected(true) }}
                                        >
                                            <option disabled selected value="" className={styles.dis}>Select Category</option>
                                            <option className={styles.options} value="food">food</option>
                                            <option className={styles.options} value="health and fitness">health and fitness</option>
                                            <option className={styles.options} value="travel">travel</option>
                                            <option className={styles.options} value="movies">movies</option>
                                            <option className={styles.options} value="education">education</option>
                                        </select>

                                    </div>
                                </form>
                            )}
                        </div>
                        {error && (<span className={styles.error}>Please fill out all fields</span>)}
                        {!categoryConsistent && <span className={styles.error}>Categories should be the same in all slides</span>}

                        {isMobile ? (
                            <div className={styles.btnBox}>
                                <button className={styles.post} onClick={handleBtnClick}>Post</button>
                            </div>
                        ) : (
                            <div className={styles.btnBox}>
                                <button className={styles.prev} onClick={handlePrevSlide}>Previous</button>
                                <button className={styles.next} onClick={handleNextSlide}>Next</button>
                                <button className={styles.post} onClick={handleBtnClick}>Post</button>
                            </div>
                        )}

                    </div>
                </div>
            ) : (
                <div className={styles.overlay}>
                    <div className={styles.container}>
                        <div className={styles.imgBox}>
                            <img src={cancel} alt="cancel Img" className={styles.cancel} onClick={onClose} />
                            {isMobile ? (
                                <span className={styles.six}>Add story to feed</span>
                            ) : (
                                <span className={styles.six}>Add up to 6 slides</span>
                            )}

                        </div>
                        <div className={styles.content}>
                            <div className={styles.slidesBox}>
                                {slides.map((slide, index) => (
                                    <div
                                        className={`${styles.add} ${(selectedSlide === index || (index === 0 && selectedSlide === -1)) ? styles.selectedSlide : ''}`}
                                        key={index}
                                        onClick={() => handleSlideClick(index)}
                                    >
                                        <span className={styles.text}>Slide {index + 1}</span>
                                        {index >= 3 && (
                                            <img src={cancel} alt="remove" className={styles.cross} onClick={() => handleRemoveSlide(index)} />
                                        )}
                                    </div>
                                ))}

                                {slideCount < 6 && (
                                    <div className={styles.add} onClick={handleAddSlide}>
                                        <span className={styles.text}>Add +</span>
                                    </div>
                                )}
                            </div>

                            {selectedSlide !== -1 && slides[selectedSlide] && (
                                <form className={styles.formBox}>
                                    <div className={styles.box}>
                                        <label className={styles.labels}>Heading :</label>
                                        <input type="text" placeholder="Your heading" className={styles.inputBox} value={slides[selectedSlide].heading} onChange={(e) => handleInputChange(selectedSlide, 'heading', e.target.value)} />
                                    </div>
                                    <div className={styles.box}>
                                        <label className={styles.labels}>Description :</label>
                                        <textarea type="text" placeholder="Story Description" className={styles.inputBoxtext} value={slides[selectedSlide].description} onChange={(e) => handleInputChange(selectedSlide, 'description', e.target.value)} />
                                    </div>
                                    <div className={styles.box}>
                                        <label className={styles.labels}>Image :</label>
                                        <input type="text" placeholder="Add Image url" className={styles.inputBox} value={slides[selectedSlide].imageUrl} onChange={(e) => handleInputChange(selectedSlide, 'imageUrl', e.target.value)} />
                                    </div>


                                    <div className={styles.box}>
                                        <label className={styles.labels}>Category :</label>

                                        <select
                                            className={`${styles.inputBoxcat} ${categorySelected ? styles.black : styles.grey}`}
                                            value={slides[selectedSlide].category}
                                            onChange={(e) => { handleInputChange(selectedSlide, 'category', e.target.value); setCategorySelected(true) }}
                                        >
                                            <option disabled selected value="" className={styles.dis}>Select Category</option>
                                            <option className={styles.options} value="food">food</option>
                                            <option className={styles.options} value="health and fitness">health and fitness</option>
                                            <option className={styles.options} value="travel">travel</option>
                                            <option className={styles.options} value="movies">movies</option>
                                            <option className={styles.options} value="education">education</option>
                                        </select>

                                    </div>
                                </form>
                            )}
                        </div>
                        {error && (<span className={styles.error}>Please fill out all fields</span>)}
                        {!categoryConsistent && <span className={styles.error}>Categories should be the same in all slides</span>}

                        {isMobile ? (
                            <div className={styles.btnBox}>
                                <button className={styles.post} onClick={handleBtnClick2}>Post</button>
                            </div>
                        ) : (
                            <div className={styles.btnBox}>
                                <button className={styles.prev} onClick={handlePrevSlide}>Previous</button>
                                <button className={styles.next} onClick={handleNextSlide}>Next</button>
                                <button className={styles.post} onClick={handleBtnClick2}>Post</button>
                            </div>
                        )}

                    </div>
                </div>
            )}

        </>
    );
}

export default AddStory;
