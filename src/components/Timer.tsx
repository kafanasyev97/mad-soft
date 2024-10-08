import { useState, useLayoutEffect } from 'react'

const Timer = ({ onTimeUp }: { onTimeUp: () => void }) => {
  const [time, setTime] = useState(2020)

  useLayoutEffect(() => {
    const userTime = localStorage.getItem('time')

    if (userTime) setTime(parseInt(userTime))

    const interval = setInterval(() => {
      setTime((prev) => {
        const userTime = prev - 1
        if (userTime === 0) {
          clearInterval(interval)
          //   onTimeUp()
          return 0
        }
        localStorage.setItem('time', userTime.toString())
        return userTime
      })
    }, 1000)
  }, [])

  return (
    <div>
      <h2>
        Оставшееся время: {`${Math.floor(time / 60)}`.padStart(2, '0')}:
        {`${time % 60}`.padStart(2, '0')} секунд
      </h2>
    </div>
  )
}

export default Timer
