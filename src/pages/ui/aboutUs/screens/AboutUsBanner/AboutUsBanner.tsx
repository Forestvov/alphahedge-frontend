import { Container } from 'components/shared/Container'
import { AboutBannerImg, AboutBannerBg, AboutBorder } from 'assets/images'
import { ArrowLinkWhite } from 'assets/icons'
import s from './AboutUsBanner.module.scss'

export const AboutUsBanner = () => (
  <section className={s.banner}>
    <Container>
      <div className={s.content}>
        <h1 className={s.title}>
          Целью фонда Alphahedge Holdings было предоставление инвесторам доступа
          к широкому спектру инвестиционных возможностей на фондовом рынке.
        </h1>
        <p className={s.text}>
          Фонд стремится обеспечить максимальную доходность для своих инвесторов
          при управлении рисками.
        </p>
        <button className={s.button} type="button">
          Подробнее о фонде
          <img className={s.arrow} src={ArrowLinkWhite} alt="logo" />
        </button>
      </div>
    </Container>
    <img className={s.img} src={AboutBannerImg} alt="about" />
    <img className={s.border} src={AboutBorder} alt="about" />
    <img className={s.bg} src={AboutBannerBg} alt="about" />
  </section>
)
