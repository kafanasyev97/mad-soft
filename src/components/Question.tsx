import { useEffect } from 'react'
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

type FormValues = {
  [key: string]: any
}

const Question = ({
  activeStep,
  handleNext,
}: {
  activeStep: number
  handleNext: () => void
}) => {
  const { control, handleSubmit, getValues, setValue } = useForm<FormValues>()

  useEffect(() => {
    const savedAnswers = localStorage.getItem('answers')
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers)
      Object.keys(parsedAnswers).forEach((key) => {
        setValue(key, parsedAnswers[key])
      })
    }
  }, [setValue])

  useEffect(() => {
    const currentQuestionId = defaultValues[activeStep]?.id
    const currentType = defaultValues[activeStep]?.type

    if (currentType === 'short' || currentType === 'long') {
      setValue(`question-${currentQuestionId}`, '')
    }
  }, [activeStep, setValue])

  const onSubmit = (data: FormValues) => {
    console.log('Ответы:', data)
  }

  const updateLocalStorage = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: ControllerRenderProps<FormValues>,
    questionId: number | string
  ) => {
    field.onChange(e.target.value)

    const updatedAnswers = {
      ...getValues(),
      [`question-${questionId}`]: e.target.value,
    }
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
          name={`question-${questionId}`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              fullWidth
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
          name={`question-${questionId}`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              fullWidth
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
    if (activeStep >= defaultValues.length - 1) handleSubmit(onSubmit)()
  }

  return (
    <>
      <form>
        <div>
          <h1>{defaultValues[activeStep].question}</h1>
          <FormControl>
            {renderQuestion(
              defaultValues[activeStep].type,
              defaultValues[activeStep].id
            )}
          </FormControl>
        </div>
        <Button onClick={handleClick}>Отправить</Button>
      </form>
    </>
  )
}

export default Question
