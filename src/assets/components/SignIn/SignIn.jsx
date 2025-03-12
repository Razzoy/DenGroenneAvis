import style from '../../pages/pageStyling/LoginPage.module.scss';
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { InputField } from "../InputField/InputField";
import { CustomButton } from "../CustomButton/CustomButton";

export function SignIn({toggleRegister, setError, setLoginMessage}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(UserContext);

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

      .catch(() => {
        setError("Noget gik galt under forsøget på at logge ind... Prøv igen");
      });
  }

  //Validation kode er taget fra en tidligere opgave
  function validateInputs() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!emailRegex.test(email)) {
      return "Ugyldig emailadresse (skal være mindst 3 tegn lang)";
    }
    if (!passwordRegex.test(password)) {
      return "Adgangskoden skal være mindst 8 tegn, indeholde et stort bogstav, et lille bogstav og et tal";
    }
    return "";
  }

  return (
    <form>
      <h2>Login</h2>
      <InputField
        icon={"at"}
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
        icon={"secure"}
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
      <p>
        har du ikke allerede en konto? Klik{" "}
        <span className={style.toggle} onClick={toggleRegister}>
          her
        </span>{" "}
        for at gå til sign up
      </p>
      <section className={style.buttonContainer}>
        
          <CustomButton
            label={"Login"}
            onClick={() => {
              submitData();
            }}
          />
      </section>
    </form>
  );
}
