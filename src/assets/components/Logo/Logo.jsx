import { NavLink } from "react-router-dom";
import style from "./Logo.module.scss";

export function Logo() {
  return (
    <div className={style.logoContainer}>
      <NavLink to={"/"}>
        <h1>Den Grønne</h1>
        <h1>Avis</h1>
      </NavLink>
    </div>
  );
}
