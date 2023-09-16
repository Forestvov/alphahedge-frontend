import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import cn from 'classnames'

import { useOnOutsideClick } from 'hooks/useOnOutsideClick'

import { IModal } from '../model/IModal.interface'

import s from './Modal.module.scss'

const fixedBody = (isOpen: boolean) => {
  const scrollWidth = `${
    window.innerWidth - document.documentElement.clientWidth
  }px`
  const $body = document.querySelector('body')

  if ($body) {
    $body.style.overflow = isOpen ? 'hidden' : 'auto'
    $body.style.paddingRight = isOpen ? scrollWidth : '0'
  }
}

export const Modal = forwardRef((props: IModal, ref) => {
  const {
    classNameButton,
    className,
    children,
    textButton,
    isOpen = false,
    onOpen = () => null,
    onClose = () => null,
  } = props

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  const refWrapper = useRef<any>()

  const closeHandler = () => {
    setOpen(false)
    onClose(false)
    fixedBody(false)
  }

  useImperativeHandle(ref, () => closeHandler)

  const openHandler = () => {
    setOpen(true)
    onOpen(true)
    fixedBody(true)
  }

  useOnOutsideClick(refWrapper, closeHandler)

  return (
    <>
      <button
        className={cn(s.trigger, classNameButton)}
        onClick={openHandler}
        type="button"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: textButton }}
      />
      {open
        ? createPortal(
            <div className={cn(s.modal, className)}>
              <div ref={refWrapper}>{children}</div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
})
