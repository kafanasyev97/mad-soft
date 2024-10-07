import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { defaultValues } from '../defaultValues'
import { useState } from 'react'

type Answer = {
  [key: number | string]: any
}

const Question = ({ activeStep }: { activeStep: number }) => {
  const [answers, setAnswers] = useState<Answer>({})
  console.log(answers)

  const handleChange = (value: string | string[], id: number | string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleCheckboxChange = (option: string, id: number | string) => {
    const currentAnswers = answers[id] || []
    const updatedAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter((item: string) => item !== option)
      : [...currentAnswers, option]

    setAnswers((prev) => ({
      ...prev,
      [id]: updatedAnswers,
    }))
  }

  const renderQuestion = (type: string) => {
    if (type === 'single') {
      return (
        <RadioGroup
          value={answers[defaultValues[activeStep].id] || ''}
          onChange={(e) =>
            handleChange(e.target.value, defaultValues[activeStep].id)
          }
        >
          {defaultValues[activeStep].options?.map((elem) => (
            <div>
              <FormControlLabel
                key={defaultValues[activeStep].id}
                value={elem}
                control={<Radio />}
                label={elem}
              />
            </div>
          ))}
        </RadioGroup>
      )
    } else if (type === 'multiple') {
      return (
        <FormGroup>
          {defaultValues[activeStep].options?.map((elem) => (
            <div>
              <FormControlLabel
                key={defaultValues[activeStep].id}
                value={elem}
                control={<Checkbox />}
                label={elem}
                onChange={() =>
                  handleCheckboxChange(elem, defaultValues[activeStep].id)
                }
              />
            </div>
          ))}
        </FormGroup>
      )
    } else if (type === 'short') {
      return (
        <TextField
          fullWidth
          value={answers[defaultValues[activeStep].id] || ''}
          onChange={(e) =>
            handleChange(e.target.value, defaultValues[activeStep].id)
          }
        />
      )
    } else {
      return (
        <TextField
          fullWidth
          value={answers[defaultValues[activeStep].id] || ''}
          onChange={(e) =>
            handleChange(e.target.value, defaultValues[activeStep].id)
          }
        />
      )
    }
  }
  return (
    <>
      <div>
        {defaultValues[activeStep].question}
        <FormControl>
          {renderQuestion(defaultValues[activeStep].type)}
        </FormControl>
      </div>
    </>
  )
}

export default Question
