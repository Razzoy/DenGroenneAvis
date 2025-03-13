import { NavLink } from "react-router-dom";
import style from "./ProductsByCategory.module.scss";

export function ProductsByCategory({ price, name, description, img, link }) {

  const shortenText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    }
    return text;
  }

  const shortenDescription = shortenText(description, 40);

  return (
    <>
      <figure className={style.productsByCategoryContainer}>
        <NavLink to={link}>
          <div className={style.imageContainer}>
            <img src={img} alt={name} />
            <figcaption className={style.priceContainer}>
              <p>Pris: {price} kr</p>
            </figcaption>
          </div>
          <div className={style.cardText}>
            <h3>{name}</h3>
            <p>{shortenDescription}</p>
          </div>
        </NavLink>
      </figure>
    </>
  );
}
