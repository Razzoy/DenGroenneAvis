import { useContext, useEffect, useState } from "react";
import { SignNewsletter } from "../SignNewsletter/SignNewsletter";
import style from "./Footer.module.scss";
import { GridContainer } from "../GridContainer/GridContainer";
import { UserContext } from "../../context/UserContext";

export function Footer() {

  const { userData } = useContext(UserContext);
  const [signedIn, setSignedIn] = useState(false);
  

  useEffect(() => {
    if (userData?.access_token) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, [userData])

  return (
    <div className={style.footerContainer}>
      <GridContainer fraction={'1fr 1fr 1fr'} gap={'1rem'}>
      <ul>
        <li>
          <h4>Nyhedsbrev</h4>
        </li>
        <li>
          Vil du være med på den grønne front? Tilmeld dig vores nyhedsbrev og
          få de seneste klima opdateringer direkte i din indbakke
        </li>
        <li>
          {signedIn === true && <SignNewsletter />}
        </li>
      </ul>
      <ul>
        <li>
          <h4>Kontakt</h4>
        </li>
        <li>Redningen 42</li>
        <li>2210 Vinterby Øster</li>
        <li>+45 99229422</li>
        <li>dga@info.dk</li>
      </ul>
      <ul>
        <li>
          <h4>FN's Verdensmål</h4>
        </li>
        <li>
          Vi støtter på organisatorisk plan op om FN´s verdensmål og har derfor
          besluttet at en del af overskuddet går direkte til verdensmål nr. 13;
          Klimahandling
        </li>
        <li className={style.liLink}>
          <a href="https://www.verdensmaalene.dk/" target="_blank">
            Læs mere om verdensmålene her
          </a>
        </li>
      </ul>
      </GridContainer>
    </div>
  );
}
