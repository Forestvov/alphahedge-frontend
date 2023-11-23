import { FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import useProfile from 'hooks/context/useProfile'

import AccountServices from 'services/AccountServices'
import { FetchStatusType } from 'models/FetchStatusType'

import { Modal } from 'components/shared/Modal'
import { Loader } from 'components/shared/Loader'

import s from './ProfileVerification.module.scss'

const { sendIdPhoto } = AccountServices

export const ProfileVerificationModal = () => {
  const [p] = useTranslation('panel')
  const [n] = useTranslation('notification')

  const notifyError = () => toast.error(n('errorMessage'))
  const notifySuccess = () => toast.success(n('successVerify'))

  const { payload, setPayload } = useProfile()

  const [pending, setPending] = useState<FetchStatusType>()

  const [fileMain, setFileMain] = useState<File | null>(null)
  const [fileBack, setFileBack] = useState<File | null>(null)

  const onChangeFile = (event: FileList | null, type: 'MAIN' | 'BACK') => {
    // 10mb > bite = 10 * 1024 * 1024 = 10485760
    if (type === 'MAIN' && event && event[0].size <= 10485760) {
      setFileMain(event[0])
    }

    if (type === 'BACK' && event && event[0].size <= 10485760) {
      setFileBack(event[0])
    }
  }

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPending('pending')

    const formMainData = new FormData()
    const formBackData = new FormData()

    if (fileMain && fileBack && pending !== 'pending') {
      try {
        formMainData.append('file', fileMain)
        formMainData.append('typeFile', 'MAIN')
        formBackData.append('file', fileBack)
        formBackData.append('typeFile', 'BACK')

        await sendIdPhoto(formMainData)
        await sendIdPhoto(formBackData)

        if (payload.profile) {
          setPayload({
            profile: {
              ...payload.profile,
              verifiedStatus: 'Process',
            },
          })
        }
        notifySuccess()
        setPending('success')
      } catch (e) {
        setPending('error')
        notifyError()
        console.log(e)
      }
    }
  }

  return (
    <Modal classNameButton={s.open} textButton={p('verify_open')}>
      <form className={s.modal} onSubmit={onFormSubmit}>
        {pending === 'pending' ? (
          <div className={s.loader}>
            <Loader />
          </div>
        ) : null}
        <div className={s.title}>{p('verify_title')}</div>
        <div className={s.field}>
          <div className={s.label}>{p('verify_popup')}</div>
          <label className={s.input} htmlFor="MAIN">
            <input
              name="MAIN"
              id="MAIN"
              type="file"
              accept="image/png, image/jpeg, image/pdf"
              onChange={(e) => onChangeFile(e.currentTarget.files, 'MAIN')}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M27.5 16.25C27.1685 16.25 26.8505 16.3817 26.6161 16.6161C26.3817 16.8505 26.25 17.1685 26.25 17.5V22.7662C26.249 23.6899 25.8817 24.5754 25.2285 25.2285C24.5754 25.8817 23.6899 26.249 22.7663 26.25H7.23375C6.31011 26.249 5.42458 25.8817 4.77146 25.2285C4.11835 24.5754 3.75099 23.6899 3.75 22.7662V17.5C3.75 17.1685 3.6183 16.8505 3.38388 16.6161C3.14946 16.3817 2.83152 16.25 2.5 16.25C2.16848 16.25 1.85054 16.3817 1.61612 16.6161C1.3817 16.8505 1.25 17.1685 1.25 17.5V22.7662C1.25165 24.3527 1.88261 25.8738 3.00443 26.9956C4.12624 28.1174 5.64727 28.7483 7.23375 28.75H22.7663C24.3527 28.7483 25.8738 28.1174 26.9956 26.9956C28.1174 25.8738 28.7483 24.3527 28.75 22.7662V17.5C28.75 17.1685 28.6183 16.8505 28.3839 16.6161C28.1495 16.3817 27.8315 16.25 27.5 16.25Z"
                fill="black"
              />
              <path
                d="M8.38401 10.8835L13.7503 5.51723V21.2497C13.7503 21.5813 13.882 21.8992 14.1164 22.1336C14.3508 22.368 14.6687 22.4997 15.0003 22.4997C15.3318 22.4997 15.6497 22.368 15.8841 22.1336C16.1186 21.8992 16.2503 21.5813 16.2503 21.2497V5.51723L21.6165 10.8835C21.8523 11.1112 22.168 11.2372 22.4958 11.2343C22.8235 11.2315 23.137 11.1 23.3688 10.8683C23.6005 10.6365 23.732 10.323 23.7349 9.99523C23.7377 9.66749 23.6117 9.35174 23.384 9.11598L15.884 1.61598C15.6496 1.38164 15.3317 1.25 15.0003 1.25C14.6688 1.25 14.3509 1.38164 14.1165 1.61598L6.61652 9.11598C6.38882 9.35174 6.26282 9.66749 6.26567 9.99523C6.26852 10.323 6.39998 10.6365 6.63174 10.8683C6.8635 11.1 7.17702 11.2315 7.50476 11.2343C7.83251 11.2372 8.14826 11.1112 8.38401 10.8835Z"
                fill="black"
              />
            </svg>
            {fileMain ? (
              <div className={s.file}>{fileMain.name}</div>
            ) : (
              <span>{p('load_file')}</span>
            )}
          </label>
          <p className={s.description}>{p('max_size')}</p>
        </div>
        <div className={s.field}>
          <div className={s.label}>{p('photo1')}</div>
          <label className={s.input} htmlFor="BACK">
            <input
              type="file"
              name="BACK"
              id="BACK"
              accept="image/png, image/jpeg, image/pdf"
              onChange={(e) => onChangeFile(e.currentTarget.files, 'BACK')}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M27.5 16.25C27.1685 16.25 26.8505 16.3817 26.6161 16.6161C26.3817 16.8505 26.25 17.1685 26.25 17.5V22.7662C26.249 23.6899 25.8817 24.5754 25.2285 25.2285C24.5754 25.8817 23.6899 26.249 22.7663 26.25H7.23375C6.31011 26.249 5.42458 25.8817 4.77146 25.2285C4.11835 24.5754 3.75099 23.6899 3.75 22.7662V17.5C3.75 17.1685 3.6183 16.8505 3.38388 16.6161C3.14946 16.3817 2.83152 16.25 2.5 16.25C2.16848 16.25 1.85054 16.3817 1.61612 16.6161C1.3817 16.8505 1.25 17.1685 1.25 17.5V22.7662C1.25165 24.3527 1.88261 25.8738 3.00443 26.9956C4.12624 28.1174 5.64727 28.7483 7.23375 28.75H22.7663C24.3527 28.7483 25.8738 28.1174 26.9956 26.9956C28.1174 25.8738 28.7483 24.3527 28.75 22.7662V17.5C28.75 17.1685 28.6183 16.8505 28.3839 16.6161C28.1495 16.3817 27.8315 16.25 27.5 16.25Z"
                fill="black"
              />
              <path
                d="M8.38401 10.8835L13.7503 5.51723V21.2497C13.7503 21.5813 13.882 21.8992 14.1164 22.1336C14.3508 22.368 14.6687 22.4997 15.0003 22.4997C15.3318 22.4997 15.6497 22.368 15.8841 22.1336C16.1186 21.8992 16.2503 21.5813 16.2503 21.2497V5.51723L21.6165 10.8835C21.8523 11.1112 22.168 11.2372 22.4958 11.2343C22.8235 11.2315 23.137 11.1 23.3688 10.8683C23.6005 10.6365 23.732 10.323 23.7349 9.99523C23.7377 9.66749 23.6117 9.35174 23.384 9.11598L15.884 1.61598C15.6496 1.38164 15.3317 1.25 15.0003 1.25C14.6688 1.25 14.3509 1.38164 14.1165 1.61598L6.61652 9.11598C6.38882 9.35174 6.26282 9.66749 6.26567 9.99523C6.26852 10.323 6.39998 10.6365 6.63174 10.8683C6.8635 11.1 7.17702 11.2315 7.50476 11.2343C7.83251 11.2372 8.14826 11.1112 8.38401 10.8835Z"
                fill="black"
              />
            </svg>
            {fileBack ? (
              <div className={s.file}>{fileBack.name}</div>
            ) : (
              <span>{p('load_file')}</span>
            )}
          </label>
          <p className={s.description}>{p('max_size')}</p>
        </div>
        {pending !== 'success' && (
          <button className={s.button} type="submit">
            {p('send')}
          </button>
        )}
      </form>
    </Modal>
  )
}
