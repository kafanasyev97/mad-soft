import { Controller, ControllerRenderProps } from 'react-hook-form'
import { FormControlLabel, Checkbox, FormGroup } from '@mui/material'
import { defaultValues } from '../../defaultValues'
import { FormValues } from '../Question'

type Props = {
  activeStep: number
  handleCheckboxChange: (
    elem: string,
    field: ControllerRenderProps<FormValues>,
    questionId: string | number
  ) => void
  questionId: string | number
  control: any
}

const CheckboxQuestion = ({
  activeStep,
  questionId,
  control,
  handleCheckboxChange,
}: Props) => {
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
                  onChange={() => handleCheckboxChange(elem, field, questionId)}
                />
              }
              label={elem}
            />
          )}
        />
      ))}
    </FormGroup>
  )
}

export default CheckboxQuestion
