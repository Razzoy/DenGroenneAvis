import style from './Comments.module.scss'

export function Comments({user, comment, onDelete, buttonTitle}) {
  return (
    <div className={style.commentContainer}>
        <p>{user}</p>
        <span>
            <p>{comment}</p>
        </span>
        <button onClick={onDelete}>{buttonTitle}</button>
    </div>
  )
}
