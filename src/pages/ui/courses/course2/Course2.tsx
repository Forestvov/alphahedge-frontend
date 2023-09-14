import { Course21, Course2Img } from 'assets/images'
import { TitleSection } from 'components/courses/TitleSection'
import { Sidebar } from '../sidebar/Sidebar'
import s from './Course2.module.scss'

export const Course2 = () => (
  <>
    <Sidebar />
    <div className={s.course2}>
      <img className={s.courseImg} src={Course2Img} alt="course" />
      <section className={s.importantInvest}>
        <TitleSection
          title="Почему важно инвестировать?"
          label="Урок 2. Почему важно инвестировать?"
        />
        <p className={s.text}>
          Наверняка в прошлом вы уже инвестировали, то есть вкладывали свои
          ресурсы, чтобы они приносили пользу сегодня:
        </p>
        <ol>
          <li className={s.orderList}>
            ходили в университет и занимались саморазвитием,
          </li>
          <li className={s.orderList}>
            покупали квартиру или машину для комфортной жизни,
          </li>
          <li className={s.orderList}>
            вкладывали время и внимание в отношения с близкими, чтобы быть
            счастливыми,
          </li>
          <li className={s.orderList}>
            откладывали деньги на депозит или инвестировали в бизнес.
          </li>
        </ol>
        <p className={s.text}>
          Все это серьезные инвестиционные решения, при принятии которых вы
          считали риски, распределяли ресурсы и извлекали прибыль.
        </p>
      </section>
      <section className={s.money}>
        <TitleSection
          title="Деньги — это важный ресурс, они влияют на нашу жизнь"
          label="Урок 2. Почему важно инвестировать?"
        />
        <p className={s.text}>
          Источником денег является работа по найму или собственный бизнес.
          Согласно статистике, в Европе наиболее благоприятным и активным
          периодом зарабатывания денег является возраст от 24 до 64 лет. Дальше
          происходит падение доходов, и человек перестает быть востребованным. В
          этот момент он становится наиболее уязвимым с точки зрения доходов.
        </p>
        <p className={s.text}>
          Чтобы сохранить комфортный уровень жизни в старшем возрасте, нужно
          правильно распорядиться деньгами сегодня и к выходу на пенсию
          сформировать капитал. Помимо достойной пенсии крупная сумма может
          потребоваться на обучение детей, первые покупки в их взрослой жизни,
          приобретение недвижимости.
        </p>
        <p className={s.text}>
          Что происходит с деньгами, которые вы не тратите сегодня, а просто
          копите на банковском счете или храните дома? Они обесцениваются, вы их
          теряете, деньги съедает инфляция.
        </p>
      </section>
      <section className={s.inflation}>
        <TitleSection
          title="Инфляция — это рост цен и снижение покупательной способности денег."
          label="Урок 2. Почему важно инвестировать?"
        />
        <p className={s.text}>
          Из-за инфляции на одну и ту же сумму с каждым годом можно купить все
          меньше и меньше товаров и услуг.
        </p>
        <p className={s.text}>
          Допустим, у вас есть 10 000 евро, вы их храните дома, или они просто
          лежат без дела на банковском счете, как в сейфе. Теперь представьте,
          что они пролежали так 10 лет. Все это время их пожирала инфляция. То
          есть формально через 10 лет у вас будут те же 10 000 евро, но купить
          на них вы сможете намного меньше.
        </p>
        <p className={s.text}>
          Инфляция после пандемии растет по всему миру. В Еврозоне в феврале
          2022 года она была равна 5,9%. Давайте представим, что инфляция будет
          такой же в ближайшие 10 лет. Как вы думаете, во что превратятся ваши
          деньги?
        </p>
        <p className={s.text}>
          Такой уровень инфляции съест 43% ваших денег за 10 лет: 10 000 евро
          превратятся в 5 636 евро.
        </p>
        <p className={s.text}>
          К сожалению, инфляция нам неподвластна, она зависит от глобальных
          экономических факторов. Но мы можем взять под контроль свои ресурсы:
          вложить немного времени и сил, чтобы деньги начали работать, победили
          инфляцию и принесли прибыль.
        </p>
      </section>
      <section className={s.investWin}>
        <TitleSection
          title="Инвестиции помогут победить инфляцию и заработать"
          label="Урок 2. Почему важно инвестировать?"
        />
        <p className={s.text}>
          Самым консервативным и понятным способом сбережения денег является
          банковский вклад. Но ставки по вкладам в Европе низкие, а в некоторых
          банках отрицательные. Это значит, что вам придется платить за хранение
          денег на депозите. Этот способ вложения денег и борьбы с инфляцией не
          позволит даже просто сохранить накопления. С годами вы не просто
          потеряете часть стоимости денег, но и упустите возможность заработать.
        </p>
        <p className={s.text}>
          Инвестиции на фондовом рынке позволяют получить большую доходность,
          чем депозит. Например, с 1991 по 2021 годы основные биржевые
          инструменты для инвестирования принесли следующую доходность:
        </p>
        <p className={s.text}>
          Инфляция после пандемии растет по всему миру. В Еврозоне в феврале
          2022 года она была равна 5,9%. Давайте представим, что инфляция будет
          такой же в ближайшие 10 лет. Как вы думаете, во что превратятся ваши
          деньги?
        </p>
        <ul>
          <li className={s.list}>
            <span>Европейские</span> акции — 10,7% годовых.
          </li>
          <li className={s.list}>
            <span>Американские</span> акции — 8,155% годовых.
          </li>
        </ul>
        <p className={s.text}>
          А так выросли наиболее популярные акции в период с 01.04.21 по
          01.04.22 годы:
        </p>
        <img className={s.image} src={Course21} alt="courseImg" />
      </section>
      <section className={s.magic}>
        <TitleSection
          title="Магия сложного процента увеличивает вложения"
          label="Урок 2. Почему важно инвестировать?"
        />
        <p className={s.text}>
          Исторические результаты доходности акций впечатляют, но можно
          заработать еще больше, если:
        </p>
        <ul>
          <li className={s.list}>
            вкладывать деньги не единоразово, а регулярно. Например, откладывать
            и инвестировать дополнительно небольшую сумму раз в месяц,
          </li>
          <li className={s.list}>
            полученные проценты от инвестиций заново вкладывать в ценные бумаги,
            то есть реинвестировать. Деньги не выводятся, а работают всегда, и
            проценты начисляются на предыдущие проценты. Это называют магией
            сложного процента, такие проценты ускоряют рост ваших сбережений и
            инвестиций в течение длительного времени.
          </li>
        </ul>
        <p className={s.text}>
          Вернемся к вашим 10 000 евро, которые пролежали 10 лет, были съедены
          инфляцией и обесценились. Поступим с ними иначе: инвестируем деньги в
          американские акции для формирования пенсии, обучения детей или других
          крупных трат в будущем.
        </p>
        <p className={s.text}>
          Предположим, что доходность американских акций осталась такой же —
          около 8% годовых, хотя прошлые результаты инвестиционных инструментов
          не гарантируют их доходность в будущем. Воспользуемся магией сложных
          процентов, то есть не будем выводить промежуточную прибыль, а будем
          реинвестировать ее в ценные бумаги. В результате через 10 лет вы
          получите 21 589 евро, то есть даже с учетом высокой инфляции
          заработаете прибыль, и деньги не потеряют свою покупательную
          способность.
        </p>
        <p className={s.text}>
          Впереди вас ждет короткий и увлекательный курс, на котором мы
          расскажем вам:
        </p>
        <ul>
          <li className={s.list}>как именно заработать на инвестициях,</li>
          <li className={s.list}>во что и как можно инвестировать,</li>
          <li className={s.list}>как собрать свой портфель и управлять им.</li>
        </ul>
      </section>
    </div>
  </>
)