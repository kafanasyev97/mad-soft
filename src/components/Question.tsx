import { useEffect, useLayoutEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { defaultValues } from '../defaultValues'
import { useForm, Controller, ControllerRenderProps } from 'react-hook-form'

type Props = {
  activeStep: number
  handleNext: () => void
  isFinishTimer: boolean
}

type FormValues = {
  [key: string]: any
}

const Question = ({ activeStep, handleNext, isFinishTimer }: Props) => {
  const { control, handleSubmit, getValues, setValue } = useForm<FormValues>()
  const [disabled, setDisabled] = useState(true)

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

  useEffect(() => {
    // Заносим данные только в форму при перезагрузке
    const savedAnswers = localStorage.getItem('answers')
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers)

      Object.keys(parsedAnswers).forEach((key) => {
        setValue(key, parsedAnswers[key])
      })
    }
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
    if (type === 'single') {
      return (
        <Controller
          name={`question-${questionId}`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <RadioGroup
              {...field}
              value={getValues(`question-${questionId}`) || ''}
              onChange={(e) => updateLocalStorage(e, field, questionId)}
            >
              {defaultValues[activeStep].options?.map((elem) => (
                <FormControlLabel
                  key={elem}
                  value={elem}
                  control={<Radio />}
                  label={elem}
                />
              ))}
            </RadioGroup>
          )}
        />
      )
    } else if (type === 'multiple') {
      return (
        <FormGroup>
          {defaultValues[activeStep].options?.map((elem) => (
            <Controller
              key={elem}
              name={`question-${questionId}`}
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value.includes(elem)}
                      onChange={() =>
                        handleCheckboxChange(elem, field, questionId)
                      }
                    />
                  }
                  label={elem}
                />
              )}
            />
          ))}
        </FormGroup>
      )
    } else if (type === 'short') {
      return (
        <Controller
          key={`question-${questionId}`}
          name={`question-${questionId}`}
          control={control}
          render={({ field }) => (
            <TextField
              multiline
              {...field}
              onChange={(e) => updateLocalStorage(e, field, questionId)}
            />
          )}
        />
      )
    } else {
      return (
        <Controller
          key={`question-${questionId}`}
          name={`question-${questionId}`}
          control={control}
          render={({ field }) => (
            <TextField
              rows={4}
              sx={{ width: '25rem' }}
              multiline
              {...field}
              onChange={(e) => updateLocalStorage(e, field, questionId)}
            />
          )}
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
          {/* <div> */}
          <h1 className="form__question">
            {defaultValues[activeStep].question}
          </h1>
          <div>
            {renderQuestion(
              defaultValues[activeStep].type,
              defaultValues[activeStep].id
            )}
          </div>
          {/* </div> */}
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
