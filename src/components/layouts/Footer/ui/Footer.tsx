import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Container } from 'components/shared/Container'
import { HeaderLogo } from 'assets/icons'

import s from './Footer.module.scss'

export const Footer = () => {
  const [l] = useTranslation('layout')

  return (
    <footer className={s.footer}>
      <Container>
        <div className={s.top}>
          <div className={s.content}>
            <h2 className={s.title}>Alphahedge Holdings</h2>
            <p className={s.text}>
              The activities of are conducted within the obtained permits and
              are in full compliance with the obtained certificates.
              <br />
              Copyright ©2023, Alphahedge Holdings Ltd
            </p>
          </div>
          <div className={s.navigation}>
            <div className={s.links}>
              <span>{l('informationLabel')}</span>
              <ul>
                <li>
                  <Link to="/">{l('homeLink')}</Link>
                </li>
                <li>
                  <Link to="/contacts">{l('contactsLink')}</Link>
                </li>
                <li>
                  <Link to="/about">{l('fond')}</Link>
                </li>
                <li>
                  <Link to="/help">FAQ</Link>
                </li>
              </ul>
            </div>
            <div className={s.links}>
              <span>{l('investLabel')}</span>
              <ul>
                <li>
                  <Link to="/forex">{l('forex')}</Link>
                </li>
                <li>
                  <Link to="/trends">{l('trendsLink')}</Link>
                </li>
                <li>
                  <Link to="/">IvestingPro</Link>
                </li>
                <li>
                  <Link to="/login">{l('account')}</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={s.links}>
            <span>{l('regLabel')}</span>
            <div className={s.row}>
              {l('addressLabel')}:{' '}
              <span>Travessera de Gràcia, 21, 08021 {l('address')}</span>{' '}
              <Link to="/cart">{l('mapLink')}</Link>
            </div>
            <div className={s.row}>
              {l('reg')} <span>B72753833</span>{' '}
              <Link
                to="https://www.einforma.com/informacion-empresa/stromatax#ancla-datos-comerciales"
                target="_blank"
              >
                {l('checkLink')}
              </Link>
            </div>
          </div>
        </div>
        <div className={s.bottom}>
          <div className={s.powered}>
            Powered by
            <img src={HeaderLogo} alt="powered by" />
          </div>
          <ul className={s.otherLinks}>
            <li>
              <Link to="/privacy-policy">Privacy policy</Link>
            </li>
            <li>
              <Link to="aml-policy">Aml policy</Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}
