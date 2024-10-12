import { useEffect, useLayoutEffect, useState } from 'react'
import { Button } from '@mui/material'
import { defaultValues } from '../defaultValues'
import { useForm, ControllerRenderProps } from 'react-hook-form'
import RadioQuestion from './inputs/Radio'
import CheckboxQuestion from './inputs/Checkbox'
import InputQuestion from './inputs/Input'
import InputAreaQuestion from './inputs/InputArea'

type Props = {
  activeStep: number
  handleNext: () => void
  isFinishTimer: boolean
}

export type FormValues = {
  [key: string]: any
}

const Question = ({ activeStep, handleNext, isFinishTimer }: Props) => {
  const { control, handleSubmit, getValues, setValue } = useForm<FormValues>()
  const [disabled, setDisabled] = useState(true)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useLayoutEffect(() => {
    const answers = localStorage.getItem('answers')
    const step = localStorage.getItem('step')

    if (answers && step !== null) {
      const parsedAnswers = JSON.parse(answers)
      const key = `question-${parseInt(step) + 1}`
      if (Object.keys(parsedAnswers).includes(key) && parsedAnswers[key].length)
        if (disabled) {
          setDisabled(false)
        }
    }
  }, [disabled])

  useLayoutEffect(() => {
    // Заносим данные только в форму при перезагрузке
    const savedAnswers = localStorage.getItem('answers')
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers)

      Object.keys(parsedAnswers).forEach((key) => {
        setValue(key, parsedAnswers[key])
      })
    }
    setIsDataLoaded(true)
  }, [setValue])

  useEffect(() => {
    if (isFinishTimer === true) {
      localStorage.clear()
      handleSubmit(onSubmit)()
    }
  }, [isFinishTimer, handleSubmit])

  const onSubmit = (data: FormValues) => {
    console.log('Ответы:', data)
  }

  const updateLocalStorage = (
    // Не вызывается сразу после перезагрузки, только после изменения поля
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: ControllerRenderProps<FormValues>,
    questionId: number | string
  ) => {
    field.onChange(e.target.value)

    const updatedAnswers = {
      ...getValues(),
      [`question-${questionId}`]: e.target.value,
    }

    if (e.target.value.length) {
      if (disabled) setDisabled(false)
    } else setDisabled(true)
    localStorage.setItem('answers', JSON.stringify(updatedAnswers))
  }

  const handleCheckboxChange = (
    option: string,
    field: ControllerRenderProps<FormValues>,
    questionId: number | string
  ) => {
    const currentValues = getValues(`question-${questionId}`) || []

    const updatedValues = currentValues.includes(option)
      ? currentValues.filter((item: string) => item !== option)
      : [...currentValues, option]

    field.onChange(updatedValues)

    const updatedAnswers = {
      ...getValues(),
      [`question-${questionId}`]: updatedValues,
    }
    if (updatedValues.length) {
      if (disabled) setDisabled(false)
    } else setDisabled(true)
    localStorage.setItem('answers', JSON.stringify(updatedAnswers))
  }

  const renderQuestion = (type: string, questionId: number | string) => {
    if (!isDataLoaded) return null

    if (type === 'single') {
      return (
        <RadioQuestion
          control={control}
          activeStep={activeStep}
          questionId={questionId}
          updateLocalStorage={updateLocalStorage}
        />
      )
    } else if (type === 'multiple') {
      return (
        <CheckboxQuestion
          activeStep={activeStep}
          questionId={questionId}
          control={control}
          handleCheckboxChange={handleCheckboxChange}
        />
      )
    } else if (type === 'short') {
      return (
        <InputQuestion
          control={control}
          questionId={questionId}
          updateLocalStorage={updateLocalStorage}
        />
      )
    } else {
      return (
        <InputAreaQuestion
          control={control}
          questionId={questionId}
          updateLocalStorage={updateLocalStorage}
        />
      )
    }
  }

  const handleClick = () => {
    handleNext()
    setDisabled(true)
    if (activeStep >= defaultValues.length - 1) {
      localStorage.clear()
      handleSubmit(onSubmit)()
    }
  }

  return (
    <>
      {isFinishTimer ? (
        <h1 className="form-response">Время вышло!</h1>
      ) : (
        <form className="form">
          <h1 className="form__question">
            {defaultValues[activeStep].question}
          </h1>
          <div>
            {renderQuestion(
              defaultValues[activeStep].type,
              defaultValues[activeStep].id
            )}
          </div>
          <Button
            sx={{ alignSelf: 'start' }}
            disabled={disabled}
            onClick={handleClick}
          >
            Отправить
          </Button>
        </form>
      )}
    </>
  )
}

export default Question
