import { useState } from 'react'
import cn from 'classnames'
import { PrivateBagBg1, PrivateBagBg2 } from 'assets/images'
import { Container } from 'components/shared/Container'
import { PrivateBagCard } from './PrivateBagCard'
import { StrategyCard } from './StrategyCard'
import s from './PrivateBagTabs.module.scss'

const privateBagCardData = [
  {
    title: 'Почему стоит инвестировать в Частный портфель?',
    desc: [
      'Гибкие условия взносов.',
      'К взносам не применяется дополнительная комиссионная плата.',
      'Низкая комиссия за администрирование, от 0,29%до 0,99% в год в зависимости от стратегии и суммы вложения.',
      'Дополнительно ваша жизнь будет застрахована на сумму в размере 2% от стоимости инвестиций (суммы накопления).',
      'Возможность указать одного или нескольких выгодоприобретателей.',
      'Налог с полученной прибыли рассчитывается и удерживается автоматически в момент выплаты средств.',
      'Возможность каждый год получать возврат подоходного налога с населения в размере 20%',
    ],
  },
  {
    title: 'Управление инвестициями',
    desc: [
      'Инвестиции будут совершаться в соответствии с выбранной стратегией.',
      'Инвестиционным портфелем от вашего имени управляютэксперты Alphahedge Holdings.',
      'Так как инвестициями управляют опытные эксперты, вам больше не нужно будет беспокоиться о том, в какие активы инвестировать или когда лучше поменять состав активов в рамках выбранной стратегии.',
      'Следите за результатами инвестиций в любое время, а также получайте каждый месяц подготавливаемые нашими экспертами отчёты.',
    ],
  },
]

const strategyCardData = [
  {
    title: 'Стратегия агрессивного роста',
    text: 'Цель данной стратегии – достижение максимальной доходности в долгосрочной перспективе путем диверсифицированных вложений в долевые ценные бумаги (акции). Активы стратегии в объёме 100 % вкладываются в долевые ценные бумаги, тем не менее, в зависимости от рыночной ситуации и для лучшего достижения цели стратегии, удельный вес вложений в долевые ценные бумаги может быть увеличен или уменьшен в пределах от 70% до 100% от активов портфеля стратегии. Данная стратегия подходит для инвесторов, желающих инвестировать на срок не менее 10 лет.',
    stock: '100%',
    stockWidth: '100%',
  },
  {
    title: 'Стратегия роста',
    text:
      'Цель данной стратегии - прирост стоимости вложенных активов посредством вложений с повышенным риском на срок от среднего до длительного. Цель ожидается достичь путем диверсифицированных вложений в долевые ценные бумаги (акции) и ценные бумаги с фиксированным доходом, в том числе в инструменты денежного рынка. Активы стратегии в объёме 75% вкладываются в долевые ценные бумаги. В зависимости от рыночной ситуации и для более успешного достижения цели стратегии, удельный вес вложений в долевые ценные бумаги может быть увеличен или уменьшен в пределах от 60% до 90% от активов портфеля стратегии.\n' +
      'Данная стратегия подходит для инвесторов, готовых взять на себя более высокий риск и желающих инвестировать на срок не менее 7 лет.',
    stock: '75%',
    stockWidth: '75%',
    bonds: '25%',
  },
  {
    title: 'Сбалансированная стратегия',
    text:
      'Цель данной стратегии – среднесрочный прирост стоимости активов посредством вложений с умеренным риском. Цель ожидается достичь путем диверсифицированных вложений в долевые ценные бумаги (акции) и ценные бумаги с фиксированным доходом, в том числе в инструменты денежного рынка. Активы стратегии в объеме 40% вкладываются в долевые ценные бумаги. В зависимости от рыночной ситуации и для более успешного достижения цели Стратегии удельный вес вложений в долевые ценные бумаги может быть увеличен или уменьшен в пределах от 25% до 55% от активов портфеля стратегии.\n' +
      'Данная стратегия подходит для инвесторов со среднесрочным периодом вложений (не менее 5 лет).',
    stock: '40%',
    stockWidth: '40%',
    bonds: '60%',
  },
  {
    title: 'Стратегия реальной стоимости',
    text:
      'Цель данной стратегии - умеренный прирост стоимости активов посредством вложений с низким риском. Активы преимущественно вкладываются в облигации, в том числе в инструменты денежного рынка. В среднем 10% активов стратегии вкладываются в долевые ценные бумаги (акции) для диверсификации риска вложений и улучшения потенциала доходности. В зависимости от рыночной ситуации и для более успешного достижения цели стратегии удельный вес вложений в долевые ценные бумаги может быть увеличен или уменьшен в пределах от 0% до 20% от активов портфеля стратегии.\n' +
      'Стратегия подходит для менее опытных на финансовых рынках инвесторов, желающих держать свой инвестиционный портфель не менее трёх лет.',
    stock: '10%',
    stockWidth: '20%',
    bonds: '90%',
  },
  {
    title: 'Консервативная стратегия',
    text:
      'Цель данной стратегии - сохранение стоимости активов посредством диверсифицированных вложений в облигации. Активы стратегии в объеме до 100% вкладываются в облигации, в том числе в инструменты денежного рынка.\n' +
      'Данная стратегия подходит для инвесторов, желающих избежать сильных колебаний стоимости вложений в течение одного года или более долгого срока.',
    bonds: '100%',
  },
]

export const PrivateBagTabs = () => {
  const [toggleState, setToggleState] = useState(1)

  const toggleTab = (index: number) => {
    setToggleState(index)
  }

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
                О Частном портфеле
              </button>
              <button
                className={cn(s.tab, { [s.tab_active]: toggleState === 2 })}
                type="button"
                onClick={() => toggleTab(2)}
              >
                Инвестиционные стратегии
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
        <img className={s.image1} src={PrivateBagBg1} alt="bg"/>
        <img className={s.image2} src={PrivateBagBg2} alt="bg"/>
      </div>
    </>
  )
}