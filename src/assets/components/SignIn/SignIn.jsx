import style from "../../pages/pageStyling/LoginPage.module.scss";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { InputField } from "../InputField/InputField";
import { CustomButton } from "../CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";

export function SignIn({ toggleRegister, setError, setLoginMessage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {userToken, setUserData, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();

  const logOut = () => {
    setUserData(null);
    setUserToken(null);
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("userToken");
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
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4242/login", {
          method: "POST",
          body: body,
        });
        if (response.status === 401) {
          setError("Du har tastet forkert password eller email");
          throw new Error(`Status: ${response.status}`);
        }
        if (!response.ok) {
          setError(
            "Noget gik galt under forsøget på at logge ind... Prøv igen"
          );
          throw new Error(`Status: ${response.status}`);
        }
        const result = await response.json();
        if (result.data.access_token) {
          setUserData(result.data);
          setUserToken(result.data.access_token);
          setLoginMessage(
            `Du er nu logget ind... Velkommen tilbage ${result.data.user.firstname}`
          );
        }
      } catch (error) {
        console.error("API request error: ", error);
      }
    }
    fetchData();
  }

  //Validation kode er taget fra en tidligere opgave
  function validateInputs() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{8,}$/;

    if (!emailRegex.test(email)) {
      return "Ugyldig emailadresse (skal være mindst 3 tegn lang)";
    }
    if (!passwordRegex.test(password)) {
      return "Adgangskoden skal være mindst 8 tegn";
    }
    return "";
  }

  return (

    userToken ? (
      <div>
      <h2>Du er logget ind</h2>
      <button onClick={() => logOut()}>Log ud</button>
      <button onClick={() => (navigate("/min-konto"))}>Gå til konto</button>
      </div>
    ) : (

    <form>
      <h2>Login</h2>
      <InputField
        icon={"at"}
        labelText="Email"
        type="email"
        placeholder="Skriv en email..."
        id="email"
        isShowing={true}
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
        isShowing={true}
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
            setLoginMessage("");
            setError("");
            submitData();
          }}
        />
      </section>
    </form>
  )
  );
}
