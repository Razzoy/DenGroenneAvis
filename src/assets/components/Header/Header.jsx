import { Logo } from "../Logo/Logo";
import style from "./Header.module.scss";
import { useGet } from "../../hooks/useGet";
import { NavLink } from "react-router-dom";

export function Header() {
  const { data, isLoading, error } = useGet("http://localhost:4242/categories");

  return (
    <div className={style.headerContainer}>
      <Logo />
      <div className={style.content}>
        <select value={''}>
          <option disabled value={''}>vælg kategori</option>
          {!isLoading &&
            data?.data?.map((item) => {
              return <option key={item.id} value={item.id}>{item.name}</option>;
            })}
        </select>
        <span className={style.listingStyle}>
          <NavLink to={"/listing"}>opret announce</NavLink>
        </span>
        <div className={style.iconNav}>
          <ul>
            <li><NavLink to={"/listing"}><img src="/Icons/mail.png" alt="" /></NavLink></li>
            <li><NavLink to={"/info"} ><img src="/Icons/info.png" alt="" /></NavLink></li>
            <li><NavLink to={"/login"} ><img src="/Icons/account.png" alt="" /></NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
