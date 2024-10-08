import { defaultValues } from './defaultValues'
import './App.css'

import * as React from 'react'
import ProgressLine from './components/ProgressLine'
import Question from './components/Question'

function App() {
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  return (
    <>
      {activeStep < defaultValues.length ? (
        <div>
          <ProgressLine
            activeStep={activeStep}
            lineLength={defaultValues.length}
          />
          <Question activeStep={activeStep} handleNext={handleNext} />
        </div>
      ) : (
        <h1>Форма успешно отправлена!</h1>
      )}
    </>
  )
}

export default App

// import React, { useState } from 'react'
// import { Box, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material'

// // Пример данных для вопросов (мок)
// const mockTestData = [
//   {
//     id: 1,
//     question:
//       'Что должен знать фронтенд-разработчик? Назовите три ключевых технологии.',
//     options: [
//       'HTML, CSS и JavaScript.',
//       'Kotlin, PHP и JavaScript.',
//       'PHP, HTML и CSS.',
//     ],
//   },
//   {
//     id: 2,
//     question: 'Какой фреймворк наиболее популярен для разработки SPA?',
//     options: ['React', 'Vue', 'Angular'],
//   },
//   {
//     id: 3,
//     question: 'Что такое REST API?',
//     options: ['Это библиотека', 'Это архитектурный стиль', 'Это база данных'],
//   },
// ]

// // Компонент для прогрессбара
// interface ProgressBarProps {
//   currentStep: number
//   totalSteps: number
// }

// const ProgressBar: React.FC<ProgressBarProps> = ({
//   currentStep,
//   totalSteps,
// }) => {
//   const progressPercent = (currentStep / totalSteps) * 100

//   return (
//     <Box>
//       <div className="progress-container">
//         {/* Линия прогресса */}
//         <div className="progress-line">
//           <div
//             className="progress-bar"
//             style={{ width: `${progressPercent}%` }}
//           ></div>
//         </div>

//         {/* Кружки для шагов */}
//         <div className="progress-steps">
//           {Array.from({ length: totalSteps }).map((_, index) => (
//             <div
//               key={index}
//               className={`step ${index <= currentStep ? 'active' : ''}`}
//             ></div>
//           ))}
//         </div>
//       </div>
//     </Box>
//   )
// }

// // Основной компонент теста
// const StepForm: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState(0) // Текущий шаг
//   const [answers, setAnswers] = useState<{ [key: number]: string }>({}) // Ответы пользователя

//   const handleAnswerChange = (answer: string) => {
//     setAnswers({
//       ...answers,
//       [mockTestData[currentStep].id]: answer, // Сохраняем ответ для текущего вопроса
//     })
//   }

//   const handleNextStep = () => {
//     if (currentStep < mockTestData.length - 1) {
//       setCurrentStep(currentStep + 1) // Переход к следующему вопросу
//     } else {
//       console.log('Тест завершен. Ответы:', answers) // Выводим ответы после завершения
//     }
//   }

//   const handlePrevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1) // Возврат к предыдущему вопросу
//     }
//   }

//   return (
//     <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}>
//       <h1>Тестирование</h1>

//       {/* Прогрессбар */}
//       <ProgressBar currentStep={currentStep} totalSteps={mockTestData.length} />

//       {/* Вопрос */}
//       <Box mt={4}>
//         <h2>{mockTestData[currentStep].question}</h2>

//         {/* Варианты ответа */}
//         <RadioGroup
//           value={answers[mockTestData[currentStep].id] || ''}
//           onChange={(e) => handleAnswerChange(e.target.value)}
//         >
//           {mockTestData[currentStep].options.map((option) => (
//             <FormControlLabel
//               key={option}
//               value={option}
//               control={<Radio />}
//               label={option}
//             />
//           ))}
//         </RadioGroup>
//       </Box>

//       {/* Кнопки "Назад" и "Далее" */}
//       <Box mt={4}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handlePrevStep}
//           disabled={currentStep === 0}
//           sx={{ mr: 2 }}
//         >
//           Назад
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleNextStep}
//           disabled={!answers[mockTestData[currentStep].id]} // Блокируем, если нет ответа
//         >
//           {currentStep < mockTestData.length - 1 ? 'Далее' : 'Завершить тест'}
//         </Button>
//       </Box>
//     </Box>
//   )
// }

// export default StepForm
