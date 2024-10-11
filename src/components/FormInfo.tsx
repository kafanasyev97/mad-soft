import ProgressLine from './ProgressLine'
import Timer from './Timer'

type Props = {
  isFinishedTimer: boolean
  activeStep: number
  lineLength: number
  finishTimer: (value: boolean) => void
}

const FormInfo = ({
  isFinishedTimer,
  activeStep,
  lineLength,
  finishTimer,
}: Props) => {
  return isFinishedTimer ? null : (
    <div>
      <ProgressLine activeStep={activeStep} lineLength={lineLength} />
      <Timer finishTimer={finishTimer} />
    </div>
  )
}

export default FormInfo
