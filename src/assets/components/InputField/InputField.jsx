import style from "./InputField.module.scss";

export const InputField = ({
  type,
  placeholder,
  labelText,
  action,
  id,
  icon,
  isShowing,
  value,
}) => {
  const onInputChange = (e) => {
    action(e.target.value);
  };

  return (
    <div className={style.inputContainer}>
      {id && <label>{labelText}</label>}
      <input
        className={style.inputStyling}
        onChange={(event) => onInputChange(event)}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
      />
      {icon && isShowing === true && <img src={`/Icons/${icon}.png`} alt={`${icon}`} />}
    </div>
  );
};