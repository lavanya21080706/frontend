import React, { useState, useEffect } from 'react';
import styles from './AddStory.module.css';
import cancel from '../../assets/cancel.png'

function AddStory({onClose}) {
    const [slideCount, setSlideCount] = useState(3);
    const [slides, setSlides] = useState(Array.from({ length: 3 }, () => ({ heading: '', desc: '', image: '', cat: '' })));
    const [selectedSlide, setSelectedSlide] = useState(0);
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState(Array.from({ length: 3 }, () => ''));
    const [categorySelected, setCategorySelected] = useState(false);
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


    const handleAddSlide = () => {
        if (slideCount < 6) {
            setSlideCount(prevCount => prevCount + 1);
            const newCategory = categories[0] || '';
            setSlides(prevSlides => [...prevSlides, { heading: '', desc: '', image: '', cat: newCategory }]);
            setCategories(prevCategories => [...prevCategories, newCategory]);
        }
    };


    useEffect(() => {
        handleInputChange(0, 'heading', '');
        handleInputChange(0, 'desc', '');
        handleInputChange(0, 'image', '');
        handleInputChange(0, 'cat', ''); 
    }, []);





    const handleRemoveSlide = (index) => {
        let newSelectedSlide = selectedSlide;
        if (index > selectedSlide) {
            newSelectedSlide = index - 1;
        }
        else if (index === selectedSlide) {
            newSelectedSlide = selectedSlide === 0 ? Math.max(0, index - 1) : selectedSlide - 1;
        }

        setSlides(prevSlides => prevSlides.filter((_, i) => i !== index));
        setSlideCount(prevCount => prevCount - 1);
        setSelectedSlide(newSelectedSlide);
    };


    const handleSlideClick = (index) => {
        setSelectedSlide(index);
    };

    const handleBtnClick = () => {
        const currentSlide = slides[selectedSlide];
        if (currentSlide.heading.trim() === '' || currentSlide.desc.trim() === '' || currentSlide.image.trim() === '' || currentSlide.cat.trim() === '') {
            setError(true);
        } else {
            setError(false);

        }
    };

    const handleInputChange = (index, field, value) => {
        const updatedSlides = [...slides];
        updatedSlides[index][field] = value;
        setSlides(updatedSlides);

        if (field === 'cat') {
            const updatedCategories = [...categories];
            updatedCategories[index] = value;
            setCategories(updatedCategories);

            if (index === 0) {
                const updatedSlidesWithSameCategory = updatedSlides.map((slide, i) => ({
                    ...slide,
                    cat: value
                }));
                setSlides(updatedSlidesWithSameCategory);
            }
        }
    };
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.imgBox}>
                    <img src={cancel} alt="cancel Img" className={styles.cancel} onClick={onClose}/>
                    {isMobile ? (
                         <span className={styles.six}>Add story to feed</span>
                    ):(
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
                            <textarea type="text" placeholder="Story Description" className={styles.inputBoxtext} value={slides[selectedSlide].desc} onChange={(e) => handleInputChange(selectedSlide, 'desc', e.target.value)} />
                        </div>
                        <div className={styles.box}>
                            <label className={styles.labels}>Image :</label>
                            <input type="text" placeholder="Add Image url" className={styles.inputBox} value={slides[selectedSlide].image} onChange={(e) => handleInputChange(selectedSlide, 'image', e.target.value)} />
                        </div>


                        <div className={styles.box}>
                            <label className={styles.labels}>Category :</label>
                            {selectedSlide === 0 ? (
                                <select
                                className={`${styles.inputBoxcat} ${categorySelected ? styles.black : styles.grey}`} 
                                    value={slides[selectedSlide].cat}
                                    onChange={(e) => {handleInputChange(selectedSlide, 'cat', e.target.value); setCategorySelected(true)}}
                                >                   
                                    <option disabled selected value="" className={styles.dis}>Select Category</option>
                                    <option className={styles.options} value="food">food</option>
                                    <option className={styles.options} value="health and fitness">health and fitness</option>
                                    <option className={styles.options} value="travel">travel</option>
                                    <option className={styles.options} value="movies">movies</option>
                                    <option className={styles.options} value="education">education</option>
                                </select>
                            ) : (
                                <input className={styles.catText} value={slides[selectedSlide].cat} placeholder='Select Category' />
                            )}
                        </div>
                    </form>
                )}
               </div>
                {error && (<span className={styles.error}>Please fill out all fields</span>)}
                {isMobile?(
                    <div className={styles.btnBox}>
                    <button className={styles.post} onClick={handleBtnClick}>Post</button>
                </div>
                ):(
                    <div className={styles.btnBox}>
                    <button className={styles.prev}>Previous</button>
                    <button className={styles.next}>Next</button>
                    <button className={styles.post} onClick={handleBtnClick}>Post</button>
                </div>
                )}
                
            </div>
        </div>
    );
}

export default AddStory;
