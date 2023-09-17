import * as yup from 'yup'

import { schema } from 'helpers/schema'

export const RecoveryEmail = yup.object().shape({
  email: schema.email,
})

export const RecoveryPassword = yup.object().shape({
  password: schema.password,
  repeat_password: schema.confirmPassword,
})
