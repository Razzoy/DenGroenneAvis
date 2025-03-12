import React, { useState } from "react";
import { Splitter } from "../components/Splitter/Splitter";
import style from "./pageStyling/LoginPage.module.scss";
import { SignIn } from "../components/SignIn/SignIn";
import { SignUp } from "../components/SignUp/SignUp";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { Section } from "../components/Section/Section";

export function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  function toggleRegister() {
    setIsRegistering(true);
    setError("");
  }

  function toggleSignIn() {
    setIsRegistering(false);
    setError("");
  }

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
      <div className={style.messageContainer}>
        {error && <p className={style.error}>{error}</p>}
        {loginMessage && <p className={style.success}>{loginMessage}</p>}
      </div>
      <Splitter />
      <GridContainer fraction={"1fr 1fr"} gap={"2rem"}>
        <Section
          imagePath={"/Images/banner_image2.jpg"}
          title={"Donationer til Dato"}
          text={"Sammen med dig har vi siden starten indsamlet:"}
        >
          <h4>452.231,50 kr</h4>
          <p>Tak fordi du handler brugt, med omtanke for klimaet</p>
        </Section>
        <Section
          imagePath={"/Images/banner_image3.jpg"}
          title={"Donationer i år"}
          text={"Sammen med dig har vi i år indsamlet:"}
        >
          <h4>112.452,75 kr</h4>
          <p>Tak fordi du handler brugt, med omtanke for jorden</p>
        </Section>
      </GridContainer>
    </div>
  );
}
