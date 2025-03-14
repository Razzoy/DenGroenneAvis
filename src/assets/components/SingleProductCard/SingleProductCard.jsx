import style from './SingleProductCard.module.scss'


export function SingleProductCard({img, title, text, price}) {
  return (
    <div className={style.singleCardContainer}>
        <img src={img} alt={title} />
        <h2>{title}</h2>
        <p>{text}</p>
        <h4>Pris: {price} kr</h4>
    </div>
  )
}
