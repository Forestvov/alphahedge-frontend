import * as yup from 'yup'

import { schema } from 'helpers/schema'

export const registrationSchema = yup.object().shape({
  fam: schema.lastName,
  im: schema.name,
  ot: schema.middleName,
  email: schema.email,
  userName: schema.username,
  phoneNumber: schema.phone,
  password: schema.password,
  repeat_password: schema.confirmPassword,
  country: schema.country,
})
