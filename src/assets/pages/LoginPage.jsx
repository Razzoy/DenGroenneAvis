import React, { useState } from "react";
import { Splitter } from "../components/Splitter/Splitter";
import style from "./pageStyling/LoginPage.module.scss";
import { SignIn } from "../components/SignIn/SignIn";
import { SignUp } from "../components/SignUp/SignUp";

export function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  function toggleRegister() {
    setIsRegistering(true);
    setError("");
  };

  function toggleSignIn() {
    setIsRegistering(false);
    setError("");
  };

  return (
    <div>
      <Splitter />
      {isRegistering ? (
        <SignUp
        toggleSignIn={toggleSignIn}
        setError={setError}
        setLoginMessage={setLoginMessage}
        />
      ) : (
        <SignIn
        toggleRegister={toggleRegister}
        setError={setError}
        setLoginMessage={setLoginMessage}
         />
      )}
      {error && <p className={style.error}>{error}</p>}
      {loginMessage && <p className={style.success}>{loginMessage}</p>}
      <Splitter />
    </div>
  );
}


