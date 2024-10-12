import { Controller, ControllerRenderProps } from 'react-hook-form'
import { TextField } from '@mui/material'
import { FormValues } from '../Question'

type Props = {
  updateLocalStorage: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ControllerRenderProps<FormValues>,
    questionId: string | number
  ) => void
  questionId: string | number
  control: any
}

const InputQuestion = ({ updateLocalStorage, questionId, control }: Props) => {
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
}

export default InputQuestion
