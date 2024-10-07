import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from '@mui/material'
import { defaultValues } from '../defaultValues'

const Question = ({ activeStep }: { activeStep: number }) => {
  const renderQuestion = (type: string) => {
    if (type === 'single') {
      return (
        <RadioGroup>
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
              />
            </div>
          ))}
        </FormGroup>
      )
    } else if (type === 'short') {
      return <input />
    } else {
      return <textarea />
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
