import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

const PasswordReset = () => {
	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true); // Initialize to true to show loader initially
	const [showPassword, setShowPassword] = useState(false); // Add this line
	const param = useParams();
	const url = `http://localhost:8080/api/password-reset/${param.id}/${param.token}`;

	useEffect(() => {
		const verifyUrl = async () => {
			try {
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			} finally {
				setLoading(false); // Hide loader after URL verification
			}
		};
		verifyUrl();
	}, [param, url]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true); // Show loader on form submission
		try {
			const { data } = await axios.post(url, { password });
			setMsg(data.message);
			setError("");
			window.location = "/login";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		} finally {
			setLoading(false); // Hide loader after request completion
		}
	};
	
	const togglePasswordVisibility = () => { // Add this function
        setShowPassword(!showPassword);
    };

	return (
        <Fragment>
            {loading ? (
                <div className={styles.loader}></div>
            ) : (
                validUrl ? (
                    <div className={styles.container}>
                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <h1>Add New Password</h1>
                            <div className={styles.password_input_container}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
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
                            {error && <div className={styles.error_msg}>{error}</div>}
                            {msg && <div className={styles.success_msg}>{msg}</div>}
                            <button type="submit" className={styles.green_btn}>
                                Submit
                            </button>
                        </form>
                    </div>
                ) : (
                    <h1>404 Not Found</h1>
                )
            )}
        </Fragment>
    );
};

export default PasswordReset;
