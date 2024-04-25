import React, { useState } from "react";
import styles from './Login.module.css'
import cancel from '../../assets/cancel.png'
import show from '../../assets/show.png'
import hide from '../../assets/hide.png'
import { userLogin } from '../../apis/Auth'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({onClose}) {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        name: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleClose = () => {
        onClose(); 
    };
    const handleChange = async () => {
        if (!data.name || !data.password) {
            setErrorMessage('Please fill in both username and password fields');
            return;
        }
    
        try {
            const response = await userLogin({ ...data });
    
            if (response && response.success) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', response.name);
                toast.success('User Logged In successfully');
                handleClose();
            } else {
                if (response.status === 404) {
                    setErrorMessage('Invalid username. Please enter a valid username.');
                } else if (response.status === 401) {
                    setErrorMessage('Invalid password. Please enter a valid password.');
                } else {
                    setErrorMessage('Invalid credentials. Please try again.');
                }
            }
        } catch (error) {
            // console.error("Error in login API:", error);
            if (error.response && error.response.status === 401) {
                setErrorMessage('Please enter a valid password.');
            } 
            if(error.response && error.response.status === 404) {
                setErrorMessage('Please enter a valid username.');
            }
        }
    };
    
    
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.loginBox}>
                    <div className={styles.imgBox}>
                        <img src={cancel} alt="cancel Img" className={styles.cancel} onClick={onClose}/>
                    </div>
                    <h2 className={styles.heading}>Login to SwipTory</h2>
                    <form className={styles.formBox}>
                        <div className={styles.username}>
                            <label className={styles.labels}>Username</label>
                            <input type="text" placeholder="Enter username" className={styles.inputBox} value={data.name} name="name" onChange={handleInputChange}/>
                        </div>
                        <div className={styles.pass}>
                            <label className={styles.labels}>Password</label>
                            <div className={styles.passwordInput}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    className={styles.inputpBox}
                                    value={data.password}
                                    name="password"
                                    onChange={handleInputChange}
                                />
                                <img
                                    src={showPassword ? hide : show}
                                    alt="toggle password visibility"
                                    className={styles.eyeIcon}
                                    onClick={togglePasswordVisibility}
                                />
                            </div>
                        </div>
                    </form>
                    {errorMessage && <span className={styles.error}>{errorMessage}</span>}
                    <button className={styles.loginBtn} onClick={handleChange} >Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;