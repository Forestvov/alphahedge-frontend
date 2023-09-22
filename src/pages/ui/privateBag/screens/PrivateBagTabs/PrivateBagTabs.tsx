import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import { PrivateBagBg1, PrivateBagBg2 } from 'assets/images'
import { Container } from 'components/shared/Container'
import { PrivateBagCard } from './PrivateBagCard'
import { StrategyCard } from './StrategyCard'
import s from './PrivateBagTabs.module.scss'

export const PrivateBagTabs = () => {
  const [toggleState, setToggleState] = useState(1)
  const [t] = useTranslation('privateBagPage')

  const toggleTab = (index: number) => {
    setToggleState(index)
  }

  const privateBagCardData = [
    {
      title: t('tabs.tab1Card1.title'),
      desc: [
        t('tabs.tab1Card1.desc1'),
        t('tabs.tab1Card1.desc2'),
        t('tabs.tab1Card1.desc3'),
        t('tabs.tab1Card1.desc4'),
        t('tabs.tab1Card1.desc5'),
        t('tabs.tab1Card1.desc6'),
        t('tabs.tab1Card1.desc7'),
      ],
    },
    {
      title: t('tabs.tab1Card2.title'),
      desc: [
        t('tabs.tab1Card2.desc1'),
        t('tabs.tab1Card2.desc2'),
        t('tabs.tab1Card2.desc3'),
        t('tabs.tab1Card2.desc4'),
      ],
    },
  ]

  const strategyCardData = [
    {
      title: t('tabs.tab2Card1.title'),
      text: t('tabs.tab2Card1.text'),
      stock: '100%',
      stockWidth: '100%',
    },
    {
      title: t('tabs.tab2Card2.title'),
      text: t('tabs.tab2Card2.text'),
      stock: '75%',
      stockWidth: '75%',
      bonds: '25%',
    },
    {
      title: t('tabs.tab2Card3.title'),
      text: t('tabs.tab2Card3.text'),
      stock: '40%',
      stockWidth: '40%',
      bonds: '60%',
    },
    {
      title: t('tabs.tab2Card4.title'),
      text: t('tabs.tab2Card4.text'),
      stock: '10%',
      stockWidth: '20%',
      bonds: '90%',
    },
    {
      title: t('tabs.tab2Card5.title'),
      text: t('tabs.tab2Card5.text'),
      bonds: '100%',
    },
  ]

  return (
    <>
      <div className={s.wrapper}>
        <Container>
          <div className={s.content}>
            <div className={s.tabs}>
              <button
                className={cn(s.tab, { [s.tab_active]: toggleState === 1 })}
                type="button"
                onClick={() => toggleTab(1)}
              >
                {t('tabs.tab1')}
              </button>
              <button
                className={cn(s.tab, { [s.tab_active]: toggleState === 2 })}
                type="button"
                onClick={() => toggleTab(2)}
              >
                {t('tabs.tab2')}
              </button>
            </div>
            <div
              className={cn(s.tab_content, {
                [s.tab_active_content]: toggleState === 1,
              })}
            >
              <div className={s.private_bag_cards}>
                {privateBagCardData.map((card) => (
                  <PrivateBagCard card={card} key={card.title} />
                ))}
              </div>
            </div>
            <div
              className={cn(s.tab_content, {
                [s.tab_active_content]: toggleState === 2,
              })}
            >
              <div className={s.strategy_cards}>
                {strategyCardData.map((card) => (
                  <StrategyCard card={card} key={card.title} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className={s.bottom}>
        <img className={s.image1} src={PrivateBagBg1} alt="bg" />
        <img className={s.image2} src={PrivateBagBg2} alt="bg" />
      </div>
    </>
  )
}
