import { useParams } from "react-router-dom";
import { useGet } from "../../hooks/useGet";
import style from "./CommentSection.module.scss";

export function CommentSection({ action, name, id, placeholder, children }) {
  function onInputChange(event) {
    action(event.target.value);
  }

  return (
    <div className={style.commentSectionContainer}>
      <h3>Kontakt Sælger</h3>
      <textarea
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={(event) => onInputChange(event)}
      ></textarea>
      <div className={style.sectionContent}>{children}</div>
    </div>
  );
}
