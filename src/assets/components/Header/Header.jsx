import { Logo } from "../Logo/Logo";
import style from "./Header.module.scss";
import { useGet } from "../../hooks/useGet";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Header() {
  const { data, isLoading, error } = useGet("http://localhost:4242/categories");
  const [category, setCategory] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      setCategory("")
    }
  }, [location.pathname]);

  const handleChange = (event) => {
    const slug = event.target.value;
    setCategory(slug);
    navigate(`/products/category/${slug}`)
  }

  return (
    <div className={style.headerContainer}>
      <Logo />
      <div className={style.content}>
        <select value={category} onChange={handleChange}>
          <option disabled value={''}>vælg kategori</option>
          {!isLoading &&
            data?.data?.map((item) => {
              return <option key={item.id} value={item.slug}>{item.name}</option>;
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
