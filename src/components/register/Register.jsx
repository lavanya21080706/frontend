import React, { useState } from "react";
import styles from './Register.module.css'
import cancel from '../../assets/cancel.png'
import show from '../../assets/show.png'
import hide from '../../assets/hide.png'
import { userRegistration } from '../../apis/Auth'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register({onClose}){
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        name: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setErrorMessage('');
    };

    const handleClose = () => {
        onClose(); // Call the onClose function to close the Register component
    };
   
    const handleChange = async () => {
        if (!data.name || !data.password) {
            setErrorMessage('Please fill in both username and password fields');
            return;
        }

        try {
            const response = await userRegistration({ ...data });

            if (response && response.success) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', response.name);
                localStorage.setItem('userId', response.userId); 
                toast.success('User registered successfully', {
                    autoClose: 1000,
                    hideProgressBar: true,
                });
                handleClose();
            } 
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrorMessage('Username is already taken. Please choose another one.');
            } else {
                console.log("Registration unsuccessful:", response ? response.errorMessage : "Response is undefined");
            }
        }
    };

    return(
        <div>
            <div className={styles.container}>
                <div className={styles.loginBox}>
                    <div className={styles.imgBox}>
                    <img src={cancel} alt="cancel Img" className={styles.cancel} onClick={onClose}/>
                    </div>
                    <h2 className={styles.heading}>Register to SwipTory</h2>
                    <form className={styles.formBox}>
                        <div className={styles.username}>
                        <label className={styles.labels}>Username</label>
                        <input type="text" placeholder="Enter username" className={styles.inputBox} value={data.name} name="name" onChange={(e)=>{handleLogin(e)}}/>
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
                                    onChange={(e)=>{handleLogin(e)}}
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
                    <button className={styles.loginBtn}  onClick={handleChange}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default Register;