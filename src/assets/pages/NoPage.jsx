import { NavLink } from "react-router-dom"
import style from './pageStyling/NoPage.module.scss'

export function NoPage() {
  return (
    <div className={style.nopageContainer}>
        <h3>Denne side eksistere ikke, eller så er den under ombygning!</h3>
        <NavLink to={'/'}>Gå tilbage til forsiden</NavLink>
    </div>
  )
}
