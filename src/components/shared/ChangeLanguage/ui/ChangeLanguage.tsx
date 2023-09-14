import s from './ChangeLanguage.module.scss'

export const ChangeLanguage = () => {
  console.log('')
  return (
    <div className={s.wrapper}>
      <button className={s.btn} type="button">
        RU
      </button>
    </div>
  )
}
