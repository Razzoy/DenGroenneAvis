import style from '../../pages/pageStyling/LoginPage.module.scss';
import { InputField } from "../InputField/InputField";
import { CustomButton } from "../CustomButton/CustomButton";
import React, { useState } from "react";

export function SignUp({ toggleSignIn, setError, setLoginMessage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");

  const registerUser = () => {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    const body = new URLSearchParams();
    body.append("firstname", firstname);
    body.append("lastname", lastname);
    body.append("email", email);
    body.append("password", password);
    body.append("address", address);
    body.append("zipcode", zipcode);
    body.append("city", city);

    fetch("http://localhost:4242/users", {
      method: "POST",
      body: body,
    })
      .then((res) => res.json)
      .then((data) => {
        if (data.message == "Record created") {
          setLoginMessage(`Din konto er oprettet! Du kan nu logge ind.`);
          toggleSignIn();
          setError("");
        } else {
          setError("Noget gik galt under oprettelsen af konto");
        }
      })
      .catch(() => {
        setError("Noget gik galt under registreringen... Prøv igen");
      });
  };

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!emailRegex.test(email)) {
      return "Ugyldig emailadresse";
    }

    if (!passwordRegex.test(password)) {
      return "Adgangskoden skal være mindst 8 tegn, indeholde et stort bogstav, et lille bogstav og et tal";
    }

    if (password !== confirmPassword) {
      return "Adgangskoderne matcher ikke";
    }
    return "";
  };

  return (
    <form>
      <h2>Opret konto</h2>
      <InputField
        labelText="Email"
        type="email"
        placeholder="Skriv en email..."
        id="email"
        value={email}
        action={(value) => {
          setEmail(value);
          setError("");
        }}
      />
      <InputField
        labelText="Password"
        type="password"
        placeholder="Skriv et password..."
        id="password"
        value={password}
        action={(value) => {
          setPassword(value);
          setError("");
        }}
      />

      <InputField
        labelText="Gentag Password"
        type="password"
        placeholder="Gentag dit password..."
        id="confirmPassword"
        value={confirmPassword}
        action={(value) => {
          setConfirmPassword(value);
          setError("");
        }}
      />
      <InputField
        labelText="Fornavn"
        type="text"
        placeholder="Skriv dit Fornavn..."
        id="firstname"
        value={firstname}
        action={(value) => {
          setFirstname(value);
          setError("");
        }}
      />
      <InputField
        labelText="Efternavn"
        type="text"
        placeholder="Skriv dit Efternavn..."
        id="lastname"
        value={lastname}
        action={(value) => {
          setLastname(value);
          setError("");
        }}
      />
      <InputField
        labelText="Adresse"
        type="text"
        placeholder="Skriv din Adresse..."
        id="address"
        value={address}
        action={(value) => {
          setAddress(value);
          setError("");
        }}
      />
      <InputField
        labelText="By"
        type="text"
        placeholder="Skriv din by..."
        id="city"
        value={city}
        action={(value) => {
          setCity(value);
          setError("");
        }}
      />
      <InputField
        labelText="Postnummer"
        type="number"
        placeholder="Skriv dit postnummer..."
        id="zipcode"
        value={zipcode}
        action={(value) => {
          setZipcode(value);
          setError("");
        }}
      />
      <p>
        har du allerede en konto hos os? Klik{" "}
        <span className={style.toggle} onClick={toggleSignIn}>
          her
        </span>{" "}
        for at vende tilbage til login.
      </p>

      <section className={style.buttonsContainer}>
        <CustomButton
          label={"Opret"}
          onClick={() => {
            registerUser();
          }}
        />
      </section>
    </form>
  );
}
