// src/components/Register.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/api";
import axios from "axios";
import AuthForm from "./AuthForm";
import { translate } from "../../translations/TranslationUtils";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [language] = useState(localStorage.getItem("language") || "en");
  const navigate = useNavigate();

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const checkUsernameExists = async () => {
        try {
          if (username.trim() === "") {
            setUsernameError("");
            return;
          }
          const lowerUsername = username.trim();

          const response = await axios.get(
            `https://65f17541034bdbecc762acf0.mockapi.io/forms?search=${lowerUsername}`
          );
          const userExists = response.data.some(
            (user) =>
              user.username.toLowerCase() === lowerUsername.toLowerCase()
          );
          setUsernameError(
            userExists ? translate(language, "checkNameRegistration") : ""
          );
        } catch (error) {
          console.error("Error checking username existence:", error.message);
          setUsernameError("");
        }
      };
      checkUsernameExists();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usernameError) {
      return;
    }
    try {
      await register(username, password);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", username);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("There was an error registering!", error.message);
      alert("Registration failed");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (value.trim().length < 6) {
      setPasswordError(translate(language, "incorrectPasswordFormat"));
    } else {
      const isValidPassword =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:',.<>?]).{6,}$/.test(
          value
        );
      if (!isValidPassword) {
        setPasswordError(translate(language, "adjustPasswordRegistration"));
      } else {
        setPasswordError("");
      }
    }
    setPassword(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid =
    username.trim() !== "" &&
    password.trim() !== "" &&
    !passwordError &&
    !usernameError;

  return (
    <AuthForm
      handleSubmit={handleSubmit}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
      passwordError={passwordError}
      usernameError={usernameError}
      language={language}
      isFormValid={isFormValid}
      buttonText="register"
      formTitle="register"
      handlePasswordChange={handlePasswordChange}
    />
  );
}

export default Register;
