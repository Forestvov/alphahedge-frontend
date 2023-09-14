import s from './TransactionPopup.module.scss'

export const TransactionPopupTimer = () => {
  console.log('')
  return (
    <div className={s.timer}>
      <span>20: 00</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="51"
        viewBox="0 0 120 51"
        fill="none"
      >
        <path
          className="circle-progress"
          d="M118.333 15.7188V35.004C118.333 42.736 112.065 49.004 104.333 49.004H15C7.26802 49.004 1 42.736 1 35.004V15.7188C1 7.98677 7.26802 1.71875 15 1.71875H37.4574H104.333C112.065 1.71875 118.333 7.98676 118.333 15.7188Z"
          stroke="#B050F2"
          strokeWidth="2"
          strokeDasharray="383.5"
        />
      </svg>
    </div>
  )
}
