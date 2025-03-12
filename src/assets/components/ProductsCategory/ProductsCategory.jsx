import { NavLink } from 'react-router-dom'
import style from './ProductsCategory.module.scss'

export function ProductsCategory({price, name, description, img, link}) {
  return (
    <>
    <figure className={style.productsCategoryContainer}>
        <NavLink to={link} >
            <img src={img} alt={name} />
            <figcaption><p>{price}</p></figcaption>
            <h3>{name}</h3>
            <p>{description}</p>
        </NavLink>
    </figure>

    </>
  )
}
