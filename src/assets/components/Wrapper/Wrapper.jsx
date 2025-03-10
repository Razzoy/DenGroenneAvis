import style from "./Wrapper.module.scss";

export function Wrapper({ children }) {
  return (
    <div className={style.wrapperContainer}>
      <div className={style.maxContent}>{children}</div>
    </div>
  );
}
