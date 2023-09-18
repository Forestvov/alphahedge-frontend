import cn from 'classnames'

import { ITitleSection } from '../model/TitleSection.interface'

import s from './TitleSection.module.scss'

export const TitleSection = (props: ITitleSection) => {
  const { className, children, title } = props

  if (title) {
    return (
      <h2
        className={cn(s.title, className)}
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{ __html: title }}
      />
    )
  }

  return <h2 className={cn(s.title, className)}>{children}</h2>
}
