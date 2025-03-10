//GridContainer.jsx kdoen er taget fra en tidligere opgave

import style from './GridContainer.module.scss';

export function GridContainer({ children, fraction, gap }) {

    const inlinestyle = {
    display: `grid`,
    gridTemplateColumns: `${fraction}`,
    gap: `${gap}`,
    };

    return (
        <div className={style.grid} style={{ ...inlinestyle}}>
            {children}
        </div>
    )
}