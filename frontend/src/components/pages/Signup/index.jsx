import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "../assets/vc2.png"; // Adjust the path if needed

const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        email: "",
        password: "",
        mobile: "",
        dept: "",
        gender: "",
    });
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateMobile = (mobile) => {
        const mobileRegex = new RegExp("^\\d{10}$");
        return mobileRegex.test(mobile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data being submitted:", JSON.stringify(data, null, 2));

        if (!validateMobile(data.mobile)) {
            setError("Mobile number must be a 10-digit number");
            return;
        }

        try {
            const url = "http://localhost:8080/api/users";
            const { data: res } = await axios.post(url, data);
            setMsg(res.message);
            console.log("Signup response:", res);
        } catch (error) {
            console.log("Signup error:", error.response);
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
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <img src={logo} alt="Logo" className={styles.logo} />
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>
                            Sign In
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder="Name"
                            name="firstName"
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
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
                        <input
                            type="text"
                            placeholder="Mobile Number"
                            name="mobile"
                            onChange={handleChange}
                            value={data.mobile}
                            required
                            className={styles.input}
                        />
                        <select
                            name="dept"
                            onChange={handleChange}
                            value={data.dept}
                            required
                            className={styles.input}
                        >
                            <option value="">Select your department</option>
                            <option value="Accountant">ACCOUNTANT</option>
                            <option value="Material Procure">MATERIAL PROCURE</option>
                            <option value="warehouse">WAREHOUSE</option>
                            <option value="operation">OPERATION</option>
                        </select>
                        <div className={styles.radio_group}>
                            <label className={styles.radio_label}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={data.gender === "male"}
                                    onChange={handleChange}
                                    className={styles.radio_input}
                                />
                                Male
                            </label>
                            <label className={styles.radio_label}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={data.gender === "female"}
                                    onChange={handleChange}
                                    className={styles.radio_input}
                                />
                                Female
                            </label>
                            <label className={styles.radio_label}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    checked={data.gender === "other"}
                                    onChange={handleChange}
                                    className={styles.radio_input}
                                />
                                Other
                            </label>
                            </div>
                        {error && <div className={styles.error_msg}>{error}</div>}
                        {msg && <div className={styles.success_msg}>{msg}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Sign Up
                        </button>
                        <div className={styles.powered_by}>Powered by VC Tech</div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;