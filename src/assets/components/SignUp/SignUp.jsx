import style from "../../pages/pageStyling/LoginPage.module.scss";
import { InputField } from "../InputField/InputField";
import { CustomButton } from "../CustomButton/CustomButton";
import React, { useState } from "react";
import { CheckBox } from "../CheckBox/CheckBox";
import { MarginContainer } from "../MarginContainer/MarginContainer";

export function SignUp({ toggleSignIn, setError, setLoginMessage }) {
  //Inputfield useStates
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  //Checkbox useState
  const [isChecked, setIsChecked] = useState(false);

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

    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4242/users", {
          method: "POST",
          body: body,
        });
        if (!response.ok) {
          if (response.status === 500) {
            setError("Der er allerede en bruger med denne emailadresse");
          } else {
            setError(
              "Noget gik galt under forsøget på at logge ind... Prøv igen"
            );
          }
          throw new Error(`Status: ${response.status}`);
        }
        const result = await response.json();
        if (result.data.access_token) {
          setLoginMessage(`Du har nu oprettet en bruger`);
        }
      } catch (error) {
        console.error("API request error: ", error);
      }
    }
    fetchData();
  };

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{8,}$/;

    if (!emailRegex.test(email)) {
      return "Ugyldig emailadresse";
    }

    if (!passwordRegex.test(password)) {
      return "Adgangskoden skal være mindst 8 tegn";
    }

    if (password !== confirmPassword) {
      return "Adgangskoderne matcher ikke";
    }
    return "";
  };

  return (
    <MarginContainer>
      <form className={style.signupContainer}>
        <h2>Opret konto</h2>
        <InputField
          labelText="Email"
          type="email"
          placeholder="Skriv en email..."
          id="email"
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
          action={(value) => {
            setZipcode(value);
            setError("");
          }}
        />
        <p className={style.signinChange}>
          har du allerede en konto hos os? Klik{" "}
          <span className={style.toggle} onClick={toggleSignIn}>
            her
          </span>{" "}
          for at vende tilbage til login.
        </p>

        <section className={style.buttonsContainer}>
          <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
          <CustomButton
            label={"Opret"}
            onClick={() => {
              setLoginMessage("");
              setError("");
              if (!isChecked) {
                setError(
                  "Du skal acceptere betingelserne for at oprette en bruger."
                );
                return;
              }
              registerUser();
              toggleSignIn();
            }}
          />
        </section>
      </form>
    </MarginContainer>
  );
}
