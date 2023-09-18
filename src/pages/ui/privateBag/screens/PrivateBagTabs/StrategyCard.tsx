import s from './PrivateBagTabs.module.scss'

interface StrategyCardProps {
  card: {
    title: string
    text: string
    stock?: string
    bonds?: string
    stockWidth?: string
  }
}

export const StrategyCard = ({ card }: StrategyCardProps) => {
  const { title, text, stock, bonds, stockWidth } = card

  return (
    <div className={s.strategy_card}>
      <h4 className={s.strategy_title}>{title}</h4>
      <div className={s.percent}>
        {stock && (
          <div className={s.stock} style={{ width: stockWidth }}>
            {stock}
          </div>
        )}
        {bonds && (
          <div className={s.bonds} style={{ width: bonds }}>
            {bonds}
          </div>
        )}
      </div>
      <div className={s.strategy_labels}>
        {stock && (
          <div className={s.strategy_label}>
            <div className={s.yellow} />
            Акции
          </div>
        )}
        {bonds && (
          <div className={s.strategy_label}>
            <div className={s.orange} />
            Облигации
          </div>
        )}
      </div>
      <p className={s.strategy_text}>{text}</p>
    </div>
  )
}
