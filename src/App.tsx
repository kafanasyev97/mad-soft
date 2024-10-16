import { useLayoutEffect, useState } from 'react'
import { defaultValues } from './defaultValues'
import Question from './components/Question'
import Header from './components/Header'
import './App.css'

function App() {
  const [activeStep, setActiveStep] = useState(0)
  const [isFinishedTimer, setIsFinishedTimer] = useState(false)

  useLayoutEffect(() => {
    const step = localStorage.getItem('step')
    if (step) setActiveStep(parseInt(step))
    else localStorage.setItem('step', '0')

    return () => localStorage.setItem('step', step ? step.toString() : '0')
  }, [])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      const step = prevActiveStep + 1
      localStorage.setItem('step', step.toString())
      return step
    })
  }

  return (
    <>
      {activeStep < defaultValues.length ? (
        <div className="container">
          <Header
            isFinishedTimer={isFinishedTimer}
            activeStep={activeStep}
            lineLength={defaultValues.length}
            finishTimer={setIsFinishedTimer}
          />
          <Question
            isFinishTimer={isFinishedTimer}
            activeStep={activeStep}
            handleNext={handleNext}
          />
        </div>
      ) : (
        <h1 className="form-response">Форма успешно отправлена!</h1>
      )}
    </>
  )
}

export default App
