import style from "./Card.module.scss";

export function Card({ title, imageSrc, alt, top}) {

  return (
    <div className={style.cardContainer}>
      <div className={style.imageContainer}>
        {imageSrc && <img src={imageSrc} alt={alt} />}
      </div>
      <div className={`${style.cardText} ${top === "true" ? style.hoverTop : style.hoverBottom}`}>
        <h5>{title}</h5>
      </div>
    </div>
  );
}
