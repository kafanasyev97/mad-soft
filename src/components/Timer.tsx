import { useState, useLayoutEffect } from 'react'

type Props = {
  finishTimer: (value: boolean) => void
}

const Timer = ({ finishTimer }: Props) => {
  const [time, setTime] = useState(20)

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev === 0) {
          clearInterval(interval)
          return 0
        }
        const userTime = prev - 1
        return userTime
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useLayoutEffect(() => {
    if (time === 0) {
      finishTimer(true)
    }
    let userTime = localStorage.getItem('time')
    let userStartTime = localStorage.getItem('startTime')

    if (userTime === null) {
      userTime = time.toString()
      localStorage.setItem('time', userTime)
    }
    if (userStartTime === null) {
      userStartTime = Math.floor(Date.now() / 1000).toString()
      localStorage.setItem('startTime', userStartTime)
    }

    const currentTime = Math.floor(Date.now() / 1000) - parseInt(userStartTime)
    const resultTime = parseInt(userTime) - currentTime

    if (resultTime <= 0) setTime(0)
    else setTime(resultTime)
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
