import { Link } from 'react-router-dom'

import { Container } from 'components/shared/Container'

import { CrowCopyright } from 'assets/images'
import { HeaderLogo } from 'assets/icons'

import s from './Footer.module.scss'

export const Footer = () => (
  <footer className={s.footer}>
    <Container>
      <div className={s.top}>
        <div className={s.content}>
          <h2 className={s.title}>Alphahedge Holdings</h2>
          <p className={s.text}>
            The activities of are conducted within the obtained permits and are
            in full compliance with the obtained certificates.
            <br />
            Copyright ©2023, Alphahedge Holdings Ltd
          </p>
        </div>
        <div className={s.navigation}>
          <div className={s.links}>
            <span>Информация</span>
            <ul>
              <li>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/">Контакты</Link>
              </li>
              <li>
                <Link to="/">О фонде</Link>
              </li>
              <li>
                <Link to="/help">FAQ</Link>
              </li>
            </ul>
          </div>
          <div className={s.links}>
            <span>Инвестиции</span>
            <ul>
              <li>
                <Link to="/">Форекс</Link>
              </li>
              <li>
                <Link to="/">Тренды</Link>
              </li>
              <li>
                <Link to="/">IvestingPro</Link>
              </li>
              <li>
                <Link to="/">Аккаунт</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={s.copyright}>
          <img src={CrowCopyright} alt="Crown copyright" />
          <Link to="/">© Crown copyright</Link>
        </div>
      </div>
      <div className={s.bottom}>
        <div className={s.powered}>
          Powered by
          <img src={HeaderLogo} alt="powered by" />
        </div>
        <ul className={s.otherLinks}>
          <li>
            <Link to="/">Privacy policy</Link>
          </li>
          <li>
            <Link to="/">Aml policy</Link>
          </li>
          <li>
            <Link to="/">Our license</Link>
          </li>
        </ul>
      </div>
    </Container>
  </footer>
)
