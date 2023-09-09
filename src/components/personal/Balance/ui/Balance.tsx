import { Price } from 'components/shared/Price'

import useAuth from 'hooks/useAuth'

import s from './Balance.module.scss'

export const Balance = () => {
  const { auth } = useAuth()

  const { profile, balance } = auth

  const items = [
    {
      label: 'Активный баланс',
      price: balance?.activeBalance ?? 0,
      color: '#5350F2',
    },
    {
      label: 'Инвестированно в портфели',
      price: balance?.briefcaseBalance ?? 0,
      color: '#B050F2',
    },
    {
      label: 'Инвестированно в акции',
      price: balance?.actionBalance ?? 0,
      color: '#F29100',
    },
  ]

  const getWidthLine = (total: number, price: number) => {
    const result = (price / total) * 100
    return `${result}%`
  }

  return (
    <div className={s.block}>
      {balance && (
        <>
          <Price className={s.total} price={balance.balance} type="lg" />
          <div className={s.bar}>
            {items.map((line, idx) => (
              <div
                className={s.line}
                style={{
                  width: getWidthLine(balance.balance, line.price),
                  background: line.color,
                }}
                key={idx}
              />
            ))}
          </div>
          <div className={s.cards}>
            {items.map((line, idx) => (
              <div className={s.card} key={idx}>
                <div className={s.name}>
                  <div
                    className={s.circle}
                    style={{ background: line.color }}
                  />
                  {line.label}
                </div>
                <Price className={s.price} type="xs" price={line.price} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
