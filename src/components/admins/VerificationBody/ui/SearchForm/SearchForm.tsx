import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import queryString from 'query-string'
import { FormProvider, useForm } from 'react-hook-form'

import { Input } from 'components/shared/Input'
import { DropDown, OptionType } from 'components/shared/DropDown'
import { Button } from 'components/shared/Button'

import s from './SearchForm.module.scss'

const optionsStatus: OptionType[] = [
  { label: 'Все статусы', id: 0 },
  { label: 'Успешно', id: 1 },
  { label: 'В обработке', id: 2 },
  { label: 'Отменен', id: 3 },
  { label: 'Почта не подтверждена', id: 4 },
  { label: 'Нет запроса на верификацию', id: 5 },
]

const statusValues = {
  'В обработке': 'Process',
  Успешно: 'Verified',
  Отменен: 'Canceled',
  'Почта не подтверждена': 'Not verified email',
  'Нет запроса на верификацию': 'Not verified YC',
}

interface IFields {
  fio: string
  userName: string
  verifiedStatus?: string | null
  registeredDate?: string | null
  page?: string | null
}

export const SearchForm = () => {
  const methods = useForm<IFields>()

  const [searchParams, setSearchParams] = useSearchParams()

  const [status, setStatus] = useState<OptionType>(optionsStatus[0])

  const { handleSubmit, setValue } = methods

  useEffect(() => {
    const qs = queryString.parse(searchParams.toString())

    const searchStatus = optionsStatus.find(
      (option) => option.label === searchParams.get('verifiedStatus'),
    )

    setStatus(searchStatus ?? optionsStatus[0])
    // @ts-ignore
    Object.keys(qs).forEach((key) => setValue(key as keyof IFields, qs[key]))
  }, [])

  const onSubmit = (data: IFields) => {
    const body = data

    if (status.label === 'Все статусы') {
      delete body.verifiedStatus
    } else {
      // @ts-ignore
      body.verifiedStatus = statusValues[status?.label]
    }

    if (searchParams.get('registeredDate')) {
      body.registeredDate = searchParams.get('registeredDate')
    }

    delete body.page

    const stringified = `?${queryString.stringify(body, {
      skipEmptyString: true,
    })}`

    setSearchParams(stringified)
  }

  return (
    <FormProvider {...methods}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.cell}>
          <Input className={s.input} placeholder="ФИО" type="text" name="fio" />
          <div className={s.label}>ФИО</div>
        </div>
        <div className={s.cell}>
          <Input
            className={s.input}
            placeholder="Username"
            type="text"
            name="userName"
          />
          <div className={s.label}>Username</div>
        </div>
        <div className={s.cell}>
          <DropDown
            className={s.drop}
            placeholder="Статус"
            options={optionsStatus}
            defaultOption={status}
            onSelectItem={setStatus}
          />
          <div className={s.label}>Статус</div>
        </div>
        <Button className={s.button} type="submit">
          Поиск
        </Button>
      </form>
    </FormProvider>
  )
}
