import { NavLink } from 'react-router-dom';
import style from './CheckBox.module.scss'

export function CheckBox({isChecked, setIsChecked}) {
  return (
    <div className={style.radioContainer}>
      <input
        type="checkbox"
        id="terms"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <p>
        Jeg har læst og forstået{" "}
        <NavLink to={"/terms"}> de gældende betingelser</NavLink> for oprettelse
        af kundekonto og brug af denne side
      </p>
    </div>
  );
}
