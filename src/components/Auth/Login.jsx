// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../services/api";
import AuthForm from "./AuthForm";
import { translate } from "../../translations/TranslationUtils";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [language] = useState(localStorage.getItem("language") || "en");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await logIn();
      const users = response.data;

      const user = users.find(
        (user) => user.username.toLowerCase() === username.toLowerCase()
      );

      if (user && user.password === password) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", username);
        navigate("/");
        window.location.reload();
      } else {
        setLoginError(translate(language, "loginFailed"));
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      setLoginError(translate(language, "loginFailed"));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  return (
    <AuthForm
      handleSubmit={handleSubmit}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
      loginError={loginError}
      language={language}
      isFormValid={isFormValid}
      buttonText="login"
      formTitle="login"
    />
  );
}

export default Login;
