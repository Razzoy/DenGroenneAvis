import style from './SignNewsletter.module.scss'

export function SignNewsletter() {


  return (
    <div className={style.newsLetterContainer}>
      <form>
        <input type="text" />
        <button>send</button>
      </form>
    </div>
  )
}
