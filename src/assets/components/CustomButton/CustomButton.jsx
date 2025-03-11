import style from "./CustomButton.module.scss"

export function CustomButton({ label, onClick, disabled = false, btnClass }) {

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${style.btn} ${style[btnClass]}`}
    >
      {label}
    </button>
  )
};