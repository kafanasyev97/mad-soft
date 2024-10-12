import ProgressLine from './ProgressLine'
import Timer from './Timer'

type Props = {
  isFinishedTimer: boolean
  activeStep: number
  lineLength: number
  finishTimer: (value: boolean) => void
}

const Header = ({
  isFinishedTimer,
  activeStep,
  lineLength,
  finishTimer,
}: Props) => {
  return isFinishedTimer ? null : (
    <div className="header">
      <Timer finishTimer={finishTimer} />
      <ProgressLine activeStep={activeStep} lineLength={lineLength} />
    </div>
  )
}

export default Header
