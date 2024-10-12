import { Controller, ControllerRenderProps } from 'react-hook-form'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { defaultValues } from '../../defaultValues'
import { FormValues } from '../Question'

type Props = {
  activeStep: number
  updateLocalStorage: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ControllerRenderProps<FormValues>,
    questionId: string | number
  ) => void
  questionId: string | number
  control: any
}

const RadioQuestion = ({
  updateLocalStorage,
  questionId,
  activeStep,
  control,
}: Props) => {
  return (
    <Controller
      key={`question-${questionId}`}
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
}

export default RadioQuestion
