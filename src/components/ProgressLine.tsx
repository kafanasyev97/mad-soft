type Props = {
  activeStep: number
  lineLength: number
}

const ProgressLine = ({ activeStep, lineLength }: Props) => {
  return (
    <>
      <h1>Тестирование</h1>
      <div className="progress-steps">
        {Array.from({ length: lineLength }).map((_, index) => (
          <div
            key={index}
            className={`step ${index === activeStep ? 'active' : ''}`}
          ></div>
        ))}
      </div>
    </>
  )
}

export default ProgressLine
