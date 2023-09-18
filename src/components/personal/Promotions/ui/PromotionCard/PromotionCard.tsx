import cn from 'classnames'
import { Line } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { toast } from 'react-toastify'

import { DownIcon, UpIcon } from 'assets/icons'
import { floorPrice } from 'helpers/floorPrice'

import ActionServices from 'services/ActionServices'
import useActions from 'hooks/useActions'

import { IActionItem } from 'models/response/ActionResponse'

import { PromotionCardActions } from './PromotionCardActions'

import s from './PromotionCard.module.scss'

interface IPromotionCard extends IActionItem {
  disable: boolean
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
)

export const options: ChartOptions = {
  responsive: false,
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
}

const { getActionBalance } = ActionServices

export const PromotionCard = (props: IPromotionCard) => {
  const [n] = useTranslation('notification')

  const { disable, image, actionCode, statistics, actionName, currentPrice } =
    props

  const { setData } = useActions()

  const data = {
    labels: statistics.slice(statistics.length / 2).map((element) => element),
    datasets: [
      {
        data: statistics.slice(statistics.length / 2),
        fill: 'start',
        backgroundColor: '#F3E9F9',
        borderColor: '#B050F2',
      },
    ],
  }

  const getPercent = () => {
    const lastValue = statistics[statistics.length - 2]
    const result = (currentPrice / lastValue) * 100 - 100

    if (result > 0) {
      return (
        <div className={cn(s.percent)}>
          <img src={UpIcon} alt="up" />
          {`+${floorPrice(result)} %`}
        </div>
      )
    }

    return (
      <div className={cn(s.percent, s.down)}>
        <img src={DownIcon} alt="down" />
        {`${floorPrice(result)} %`}
      </div>
    )
  }

  const notifySuccess = () => toast.success(n('isBayAction'))
  const notifyError = () => toast.error(n('errorMessage'))

  const fetchData = async () => {
    try {
      const response = await getActionBalance({
        page: 0,
        size: 6,
      })
      setData(response.data)
      notifySuccess()
    } catch (e) {
      notifyError()
      console.log('Error fetch action balance', e)
    }
  }

  return (
    <div className={s.card}>
      <div className={s.header}>
        <div className={s.icon}>
          <img src={image} alt={actionName} />
        </div>
        <div className={s.content}>
          <div className={s.name}>{actionCode}</div>
          <div className={s.company}>{actionName ?? 'no-name'}</div>
        </div>
      </div>
      <div className={s.change}>
        <div className={s.label}>CHANGED (1D)</div>
        {getPercent()}
      </div>
      <div className={s.diagramma}>
        {/* @ts-ignore */}
        <Line className={s.canvas} options={options} data={data} />
      </div>
      {!disable && (
        <PromotionCardActions
          code={actionCode}
          fetchData={fetchData}
          currentPrice={currentPrice}
        />
      )}
    </div>
  )
}
