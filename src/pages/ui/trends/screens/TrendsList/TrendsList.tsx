import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

import {
  IMetaTrend,
  IResponseTrends,
  ITrendCard,
} from 'models/response/TrendResponse'

import { Loader } from 'components/shared/Loader'

import { TrendsCard } from '../TrendsCard/TrendsCard'

import s from './TrendsList.module.scss'

export const TrendsList = () => {
  const [data, setData] = useState<ITrendCard[]>([])
  const [meta, setMeta] = useState<IMetaTrend>()
  const [loading, setLoading] = useState(false)
  const [paginationLoad, setPaginationLoad] = useState(false)

  const { i18n } = useTranslation()
  const [t] = useTranslation('trends')

  const fetchData = async (page: number, isPagination?: boolean) => {
    if (isPagination) {
      setPaginationLoad(true)
    } else {
      setLoading(true)
    }

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.marketaux.com/v1/news/all?symbols=TSLA%2CAMZN%2CMSFT&filter_entities=true&language=${i18n.language}&api_token=4jcRfnMYU3S0ISTCwVYaOqrEyJnqkzeORxn9oZ5x&countries=us,de,ru&page=${page}`,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const response = await axios.request<IResponseTrends>(config)

      if (isPagination) {
        setData((prevState) => [...prevState, ...response.data.data])
        setMeta(response.data.meta)
        return
      }
      setData(response.data.data)
      setMeta(response.data.meta)
    } catch (e) {
      console.log('Error fetch articles', e)
    } finally {
      if (isPagination) {
        setPaginationLoad(false)
      } else {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchData(1, false)
  }, [i18n.language])

  if (loading || !data || !meta) {
    return (
      <div className={s.loader}>
        <Loader />
      </div>
    )
  }

  return (
    <>
      <div className={s.list}>
        {data.map((trend, idx) => (
          <TrendsCard key={idx} {...trend} />
        ))}
      </div>
      {meta.found > meta.returned && (
        <button
          className={s.loadMore}
          type="button"
          disabled={paginationLoad}
          onClick={() => fetchData(meta.page + 1, true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
          >
            <path
              d="M7.49935 1.16663V12.8333M7.49935 12.8333L13.3327 6.99996M7.49935 12.8333L1.66602 6.99996"
              stroke="#6941C6"
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t('load')}
        </button>
      )}
    </>
  )
}
