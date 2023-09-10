import cn from 'classnames'
import { Line } from 'react-chartjs-2'
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

import { DownIcon, UpIcon } from 'assets/icons'
import { floorPrice } from 'helpers/floorPrice'

import ActionServices from 'services/ActionServices'
import useActions from 'hooks/useActions'

import { IActionItem } from 'models/response/ActionResponse'

import { PromotionCardActions } from './PromotionCardActions'

import s from './PromotionCard.module.scss'

const IS_UP = true

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
  responsive: true,
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
  const {
    disable,
    image,
    actionId,
    actionCode,
    statistics,
    actionName,
    currentPrice,
  } = props

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
    const result = 100 - (currentPrice * 100) / lastValue

    if (result > 0) {
      return (
        <>
          <img src={UpIcon} alt="up" />
          {`+${floorPrice(result)} %`}
        </>
      )
    }

    return (
      <>
        <img src={DownIcon} alt="down" />
        {`-${floorPrice(result)} %`}
      </>
    )
  }

  const fetchData = async () => {
    try {
      const response = await getActionBalance({
        page: 0,
        size: 6,
      })
      setData(response.data)
    } catch (e) {
      console.log('Error fetch action balance', e)
    }
  }

  return (
    <div className={s.card}>
      <div className={s.header}>
        <div className={s.icon}>
          <img src={image} alt="apple" />
        </div>
        <div className={s.content}>
          <div className={s.name}>{actionCode}</div>
          <div className={s.company}>{actionName ?? 'no-name'}</div>
        </div>
      </div>
      <div className={s.change}>
        <div className={s.label}>CHANGED (1D)</div>
        <div className={cn(s.percent, { [s.down]: !IS_UP })}>
          {getPercent()}
        </div>
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
