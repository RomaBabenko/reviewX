// src/components/AuthForm.js
import React from "react";
import { translate } from "../../translations/TranslationUtils";
import showPass from "../../assets/images/showPass.png";
import hidePass from "../../assets/images/hidePass.png";
import "../../assets/styles/scss/_all.scss";

const AuthForm = ({
  handleSubmit,
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  togglePasswordVisibility,
  loginError,
  passwordError,
  usernameError,
  isFormValid,
  language,
  buttonText,
  formTitle,
  handlePasswordChange,
}) => {
  return (
    <div className="auth-form">
      <h2>{translate(language, formTitle)}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={translate(language, "plceholderName")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder={translate(language, "placeholderPassword")}
            value={password}
            onChange={handlePasswordChange || ((e) => setPassword(e.target.value))}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="password-toggle-btn"
          >
            <img
              src={showPassword ? showPass : hidePass}
              alt="toggle password visibility"
            />
          </button>
        </div>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        <button className="auth-btn" type="submit" disabled={!isFormValid}>
          {translate(language, buttonText)}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
