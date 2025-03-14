import { useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";
import style from "./CategoryList.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

export function CategoryList({urlSlug}) {
  const { data, isLoading, error } = useGet("http://localhost:4242/categories");
  const [category, setCategory] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      setCategory("");
    }
  }, [location.pathname]);

  const handleCategoryChange = (slug) => {
    setCategory(slug);
    navigate(`/products/category/${slug}`);
  };

  return (
    <div className={style.listContainer}>
        <h2>Alle kategorier</h2>
      <ul>
      {!isLoading &&
        data?.data?.map((item) => {
          return (
            <li key={item.id} onClick={() => handleCategoryChange(item.slug)} className={item.slug === urlSlug ? style.active : ""}>
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
