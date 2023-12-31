import React from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'

import { ProfileProvider } from 'context/ProfileContext'
import { BalanceProvider } from 'context/BalanceContext'

import './i18n'

import { App } from './App'

import './styles/index.scss'

const container = document.getElementById('app') as HTMLElement

if (!container) {
  throw new Error(
    'Контейнер app не найден. Не удалось вмонтировать реакт приложение',
  )
}

const root = createRoot(container)

root.render(
  <ProfileProvider>
    <BalanceProvider>
      <App />
    </BalanceProvider>
  </ProfileProvider>,
)
