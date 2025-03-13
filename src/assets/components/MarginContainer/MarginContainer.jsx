import style from './MarginContainer.module.scss'

export function MarginContainer({children}) {
  return (
    <div className={style.frameStyle}>{children}</div>
  )
}
