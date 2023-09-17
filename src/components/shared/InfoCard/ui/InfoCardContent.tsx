import { useState } from 'react'
import AnimateHeight from 'react-animate-height'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import AdminService from 'services/AdminService'
import { FetchStatusType } from 'models/FetchStatusType'

import { LightningText } from 'components/shared/LightningText'
import { Button } from 'components/shared/Button'

import { ButtonAccordionIcon } from 'assets/icons'

import { IInfoCardContent } from '../model/InfoCard.interface'

import s from './InfoCard.module.scss'

const { closeBrief } = AdminService

export const InfoCardContent = (props: IInfoCardContent) => {
  const [t] = useTranslation(`simpleCard`)
  const [c] = useTranslation(`common`)
  const [n] = useTranslation(`notification`)

  const {
    isActive,
    isAdmin,
    name,
    description,
    titleList,
    actionList,
    technologies,
    id,
    image,
    fetch = () => null,
  } = props

  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<FetchStatusType>()

  const onToggle = () => {
    setOpen((prevState) => !prevState)
  }

  const notifyError = () => toast.error(n('errorMessage'))
  const notifySuccess = () => toast.success(n('changeStatus'))

  const onCloseBrief = async () => {
    setStatus('pending')
    try {
      await closeBrief(id)
      await fetch()
      notifySuccess()
      setStatus('success')
    } catch (e) {
      setStatus('error')
      notifyError()
      console.log('Error send setting', e)
    }
  }

  return (
    <>
      <div className={s.header}>
        <div className={s.title}>
          <div className={s.icon}>
            <img src={image} alt="rocket" />
          </div>
          <span>{name}</span>

          {isAdmin && isActive && (
            <Button
              className={s.close}
              onClick={onCloseBrief}
              disabled={status === 'pending'}
              type="button"
            >
              {c('closeBtn')}
            </Button>
          )}
        </div>
        <button
          className={cn(s.toggler, { [s.rotate]: open })}
          type="button"
          onClick={onToggle}
        >
          {c('moreBtn')}
          <img src={ButtonAccordionIcon} alt="arrow" />
        </button>
      </div>
      <p className={cn(s.text, { [s.split]: !open })}>{description}</p>
      {isAdmin && isActive && (
        <Button className={s.mobClose} type="button">
          {c('closeBtn')}
        </Button>
      )}
      <AnimateHeight
        className={cn(s.accordion, { [s.haveActive]: isActive })}
        height={open ? 'auto' : 0}
      >
        <div className={s.content}>
          <p className={s.content__text}>{titleList}</p>
          <ul className={s.content__list}>
            {technologies.map((text, idx) => (
              <LightningText key={idx} text={text} />
            ))}
          </ul>
          <div className={s.content__packages}>
            <div className={s.content__packages_label}>{t('actionTitle')}</div>
            <div className={s.content__packages_list}>
              {actionList.map((action, idx) => (
                <div className={s.content__package} key={idx}>
                  {action}
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimateHeight>
    </>
  )
}
