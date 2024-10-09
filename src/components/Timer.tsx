import { useState, useLayoutEffect, useEffect } from 'react'

const Timer = ({ finishTimer }: { finishTimer: (value: boolean) => void }) => {
  const [time, setTime] = useState(7)

  useLayoutEffect(() => {
    console.log('1111')

    const userTime = localStorage.getItem('time')

    if (userTime) setTime(parseInt(userTime))

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev === 0) {
          clearInterval(interval)
          return 0
        }
        const userTime = prev - 1
        localStorage.setItem('time', userTime.toString())
        return userTime
      })
    }, 1000)
  }, [])

  useEffect(() => {
    if (time === 0) {
      finishTimer(true)
    }
  }, [time, finishTimer])

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
