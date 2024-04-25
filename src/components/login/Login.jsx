import React, { useState } from "react";
import styles from './Login.module.css'
import cancel from '../../assets/cancel.png'
import show from '../../assets/show.png'
import hide from '../../assets/hide.png'
import { userLogin } from '../../apis/Auth'

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        name: '',
        password: '',
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleLogin = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data)
    };


    const handleChange = async ()=>{
        console.log("hi")     
        console.log(data)
    try {
        const response = await userLogin({ ...data });
        console.log("Login API response:", response);

        if (response && response.success) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', response.name);
            // navigate('/');
        } else {
            // Handle unsuccessful login (optional)
            console.log("Login unsuccessful:", response ? response.errorMessage : "Response is undefined");
        }
    } catch (error) {
        console.error("Error in login API:", error);
    }
    }

    
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.loginBox}>
                    <div className={styles.imgBox}>
                        <img src={cancel} alt="cancel Img" className={styles.cancel} />
                    </div>
                    <h2 className={styles.heading}>Login to SwipTory</h2>
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
                    <button className={styles.loginBtn} onClick={handleChange} >Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;