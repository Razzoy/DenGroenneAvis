import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { Splitter } from "../components/Splitter/Splitter";
import { InputField } from "../components/InputField/InputField";
import style from "./pageStyling/LoginPage.module.scss";
import { CustomButton } from "../components/CustomButton/CustomButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [isRegistering, seetIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const { setUserData } = useContext(UserContext);

  //Validation kode er taget fra en tidligere opgave
  function validateInputs() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const nameRegex = /^[A-Za-zÆØÅæøå]{2,}(?:[-\s][A-Za-zÆØÅæøå]+)*$/; // Minimum to bogstaver
    const minEmailLength = 3;
    const zipCodeRegex = /^(?:[1-24-9]\d{3}|3[0-8]\d{2})$/;

    if (email.length < minEmailLength || !emailRegex.test(email)) {
      console.log("Fejl: Ugyldig emailadresse");
      return "Ugyldig emailadresse (skal være mindst 3 tegn lang)";
    }

    if (!passwordRegex.test(password)) {
      return "Adgangskoden skal være mindst 8 tegn, indeholde et stort bogstav, et lille bogstav og et tal";
    }

    if (isRegistering) {
      if (!nameRegex.test(firstname)) {
        return "Fornavn skal være mindst 2 bogstaver og må kun indeholde bogstaver, mellemrum eller bindestreg";
      }

      if (!nameRegex.test(lastname)) {
        return "Efternavn skal være mindst 2 bogstaver og må kun indeholde bogstaver, mellemrum eller bindestreg";
      }

      if (password !== confirmPassword) {
        return "Adgangskoderne matcher ikke";
      }

      if (!zipCodeRegex.test(zipcode)) {
        return "Zipkoden er ikke gyldig";
      }
    }
    return "";
  }

  function submitData() {
    const validationError = validateInputs();

    if (validationError) {
      setError(validationError);
      return;
    }

    const body = new URLSearchParams();
    body.append("username", email);
    body.append("password", password);

    fetch("http://localhost:4242/login", {
      method: "POST",
      body: body,
    })
      .then((res) => res.json)
      .then((data) => {
        if (data.access_token) {
          setUserData(data);
          setLoginMessage(
            `Du er nu logget ind... Velkommen tilbage ${data.user.firstname}`
          );
        } else {
          setLoginMessage("Du har tastet forkert password eller email");
        }
      })

      .catch((err) => {
        setError("Noget gik galt under forsøget på at logge ind... Prøv igen");
      });
  }

  function registerUser() {
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
          seetIsRegistering(false);
          setError("");
        } else {
          setError("Noget gik galt under oprettelsen af konto");
        }
      })
      .catch((err) => {
        setError("Noget gik galt under registreringen... Prøv igen");
      });
  }

  return (
    <div>
      <Splitter />
      <form>
        <h2>{isRegistering ? "Opret konto" : "Login"}</h2>
        <InputField
          icon={"at"}
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
          icon={"secure"}
          labelText="Password"
          type="password"
          placeholder="Skriv et password..."
          id="password"
          action={(value) => {
            setPassword(value);
            setError("");
          }}
        />
        {isRegistering && (
          <>
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
              placeholder="Addresse"
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
          </>
        )}

        {isRegistering ? (
          <p>
            har du allerede en konto hos os? Klik{" "}
            <span
              className={style.toggle}
              onClick={() => {
                seetIsRegistering(false);
                setError("");
              }}
            >
              her
            </span>{" "}
            for at vende tilbage til login.
          </p>
        ) : (
          <p>
            har du ikke allerede en konto? Klik{" "}
            <span
              className={style.toggle}
              onClick={() => {
                seetIsRegistering(true);
                setError("");
              }}
            >
              her
            </span>{" "}
            for at gå til sign up
          </p>
        )}

        <section className={style.buttonsContainer}>
          {isRegistering ? (
            <CustomButton
              label={"Opret"}
              onClick={() => {
                registerUser();
              }}
            />
          ) : (
            <CustomButton
              label={"Login"}
              onClick={() => {
                submitData();
              }}
            />
          )}
        </section>

        {error && <p className={style.error}>{error}</p>}
        {loginMessage && <p className={style.success}>{loginMessage}</p>}
      </form>
      <Splitter />
    </div>
  );
}
