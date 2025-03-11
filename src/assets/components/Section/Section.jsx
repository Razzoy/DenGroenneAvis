import style from "./Section.module.scss";

export function Section({ imagePath, isMain, title, text, children }) {
  return (
    <div
      className={`${style.sectionContainer} ${
        isMain === "true" ? style.mainSection : style.altSection
      }`}
    >
        <div className={style.backgroundImage} style={{ backgroundImage: `url(${imagePath})` }}>

        </div>
      <div className={style.sectionContent}>
        <h2>{title}</h2>
        <h3>{text}</h3>
        {children}
      </div>
    </div>
  );
}
