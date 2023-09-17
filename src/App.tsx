import { RouterProvider } from 'react-router-dom'
import React, { Suspense, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

import { PageLoader } from 'components/shared/Loader'

import useProfile from 'hooks/context/useProfile'
import useBalance from 'hooks/context/useBalance'

import { appRouter } from 'pages/ui/appRouter'

import AccountServices from 'services/AccountServices'

const { getProfile, getBalance } = AccountServices

export const App = () => {
  const { setPayload } = useProfile()
  const { setCash } = useBalance()

  const fetchUserData = async () => {
    const isAdmin = localStorage.getItem('user-type') === 'Admin'
    const isEditPage = window.location.pathname.indexOf('/admin/user/')

    try {
      if (isEditPage === -1) {
        localStorage.removeItem('Account-Id')
        localStorage.removeItem('editor')
      } else {
        localStorage.setItem('editor', '1')
      }

      const resProfile = await getProfile()
      const resBalance = await getBalance()

      setPayload({
        isAuth: true,
        loading: false,
        profile: {
          ...resProfile.data,
          role: isAdmin ? 'Admin' : 'User',
        },
      })

      setCash({ balance: resBalance.data })
    } catch (e) {
      console.log(e)
      setPayload({ loading: false, isAuth: false })
      setCash({ balance: null })
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchUserData()
    } else {
      setPayload({ loading: false, isAuth: false })
    }
  }, [])

  return (
    <Suspense fallback={<PageLoader />}>
      <ToastContainer position="top-right" />
      <RouterProvider router={appRouter} />
    </Suspense>
  )
}
