import { useState, useEffect } from 'react'

const Timer = ({ onTimeUp }: { onTimeUp: () => void }) => {
  const [time, setTime] = useState(7)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev - 1)
    }, 1000)

    if (time === 0) {
      clearInterval(interval)
      onTimeUp()
    }

    return () => clearInterval(interval)
  }, [time, onTimeUp])

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
