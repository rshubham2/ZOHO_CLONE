import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "../assets/vc2.png"; // Adjust the path if needed

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/auth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            window.location = "/";
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Sign In to Your Account</h1>
                        <div className={styles.input_field}>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.input_field}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                required
                                className={styles.input}
                            />
                            <span 
                                className={styles.password_toggle}
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </span>
                        </div>
                        <Link to="/forgot-password" style={{ alignSelf: "flex-start" }}>
                            <p style={{ padding: "0 15px" }}>Forgot Password ?</p>
                        </Link>
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Sign In
                        </button>
                        <div className={styles.powered_by}>Powered by VC Tech</div>
					</form>

                </div>
                <div className={styles.right}>
                    <img src={logo} alt="Logo" className={styles.logo} />
                    <h1>New Here ?</h1>
                    <Link to="/signup">
                        <button type="button" className={styles.white_btn}>
                            Sign Up
                        </button>
                    </Link>
                    <link rel="preload" as="image" href="/img.jpg"></link>
                </div>
            </div>
        </div>
    );
};

export default Login;