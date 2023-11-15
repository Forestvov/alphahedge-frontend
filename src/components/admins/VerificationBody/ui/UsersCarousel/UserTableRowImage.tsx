import { useState } from 'react'

import { Modal } from 'components/shared/Modal'
import { Loader } from 'components/shared/Loader'

import AdminService from 'services/AdminService'

import s from './UsersCarousel.module.scss'

interface IUserTableRowImage {
  id: number
}

const { getUserPhoto } = AdminService

export const UserTableRowImage = ({ id }: IUserTableRowImage) => {
  const [photoUrl, setPhotoUrl] = useState('')
  const [loader, setLoader] = useState(false)

  const fetchPhoto = async (_id: number) => {
    setLoader(true)
    await getUserPhoto({ fileId: _id })
      .then(({ data }) => setPhotoUrl(data.file))
      .finally(() => setLoader(false))
  }

  return (
    <Modal
      className={s.inner}
      textButton="Ссылка"
      onOpen={() => fetchPhoto(id)}
    >
      <div className={s.body}>
        {loader ? <Loader /> : <img src={photoUrl} alt="" />}
      </div>
    </Modal>
  )
}
