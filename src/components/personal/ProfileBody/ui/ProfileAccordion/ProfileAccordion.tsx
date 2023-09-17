import { useState } from 'react'
import AnimateHeight from 'react-animate-height'

import { ArrowAccordionIcon } from 'assets/icons'

import s from './ProfileAccordion.module.scss'

interface IProfileAccordion {
  label: string
  value: string
}

export const ProfileAccordion = (props: IProfileAccordion) => {
  const { value, label } = props

  const [isOpen, setIsOpen] = useState(false)

  const onToggle = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <div className={s.item}>
      <button className={s.header} type="button" onClick={onToggle}>
        {label}
        <img
          className={isOpen ? s.active : ''}
          src={ArrowAccordionIcon}
          alt="arrow"
        />
      </button>
      <AnimateHeight height={isOpen ? 'auto' : 0}>
        <p className={s.content}>{value}</p>
      </AnimateHeight>
    </div>
  )
}
