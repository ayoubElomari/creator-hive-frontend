import { useEffect, useState } from "react";
import { loginWithEmail } from "@/api/auth";
import styles from "./Auth.module.scss";

function Login() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onGoogleLogin = () => {
    // Top-level navigation so the OAuth cookies/states behave nicely
    window.location.href = "/api/login";
  };

  const handleLocalLogin = async (e) => {
    e.preventDefault();
    const form = e.target.form;
    const email = form.email.value;
    const password = form.password.value;

    // Check if email and password are provided
    if (!email) {
      setEmailError("Email is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }
    if (!email || !password) return;

    // Attempt to log in
    try {
      const user = await loginWithEmail(email, password);
      if (user) {
        window.location.href = "/";
      }
    } catch (error) {
      setEmailError("Invalid email or password");
    }
  };

  const customStyles = {
    "--bg-color-1": "#000000",
    "--bg-color-2": "#33333308",
  };

  useEffect(() => {
    Object.entries(customStyles).forEach(([key, value]) => {
      document.body.style.setProperty(key, value);
    });
  }, []);
  return (
    <div className={styles["login-page-container"]}>
      <h2 className={styles["app-name"]}>Creator Hive</h2>

      <div className={styles["auth-container"]}>
        <h2>Login</h2>
        <button
          onClick={onGoogleLogin}
          className={styles["google-login-button"]}
        >
          <img src="src/assets/icons/auth/google-colored.svg" alt="" />
          <span>Login with Google</span>
        </button>
        <div className={styles["separation-dot"]}></div>

        <form
          className={styles["login-form"]}
          action="/api/login/local"
          method="POST"
        >
          <div className={styles["form-group"]}>
            <label htmlFor="email">Email:</label>
            <span className={styles["form-error"]}>{emailError}</span>
            <input
              type="email"
              name="email"
              required
              placeholder="your.email@example.com"
              onChange={() => {
                setEmailError("");
              }}
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="password">Password:</label>
            <span className={styles["form-error"]}>{passwordError}</span>
            <div className={styles["input-wrapper"]}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="*********"
                onChange={() => {
                  setPasswordError("");
                }}
              />
              <div
                className={styles["show-password"]}
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={
                    showPassword
                      ? "src/assets/icons/auth/eye-open.svg"
                      : "src/assets/icons/auth/eye-closed.svg"
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleLocalLogin}
            className={styles["submit-button"]}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
