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
import { useForm, Controller } from 'react-hook-form'

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
    const currentQuestionId = defaultValues[activeStep]?.id
    const currentType = defaultValues[activeStep]?.type

    if (currentType === 'short' || currentType === 'long') {
      setValue(`question-${currentQuestionId}`, '')
    }
  }, [activeStep, setValue])

  const onSubmit = (data: FormValues) => {
    console.log('Ответы:', data)
  }

  const handleCheckboxChange = (
    option: string,
    field: any,
    questionId: number | string
  ) => {
    const currentValues = getValues(`question-${questionId}`) || []

    const updatedValues = currentValues.includes(option)
      ? currentValues.filter((item: string) => item !== option)
      : [...currentValues, option]

    field.onChange(updatedValues)
  }

  const renderQuestion = (type: string, questionId: number | string) => {
    if (type === 'single') {
      return (
        <Controller
          name={`question-${questionId}`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <RadioGroup {...field}>
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
              onChange={(e) => field.onChange(e.target.value)}
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
              onChange={(e) => field.onChange(e.target.value)}
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
