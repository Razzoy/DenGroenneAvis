import { Logo } from "../Logo/Logo";
import style from "./Header.module.scss";
import { useGet } from "../../hooks/useGet";

export function Header() {
  const { data, isLoading, error } = useGet("http://localhost:4242/categories");

  return (
    <div className={style.headerContainer}>
      <Logo />
      <select>
      <option>vælg kategori</option>
        {!isLoading && data?.data?.map((item) => {
          return(
            <option>{item.name}</option>
          )
        })}
      </select>
    </div>
  );
}
