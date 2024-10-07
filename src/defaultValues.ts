type DefaultValues = {
  id: string | number
  question: string
  type: 'single' | 'multiple' | 'short' | 'long'
  options?: string[]
}

export const defaultValues: DefaultValues[] = [
  {
    id: 1,
    question: 'Что должен знать фронтенд-разработчик?',
    type: 'single',
    options: ['JS, HTML, CSS', 'Python, JS, Java', 'HTML, CSS, Go'],
  },
  {
    id: 2,
    question: 'Самая популярная библиотека JS?',
    type: 'single',
    options: ['React', 'Django', 'PHP'],
  },
  {
    id: 3,
    question: 'Для чего нужен Typescript?',
    type: 'multiple',
    options: [
      'Типизация JS',
      'Предотвращение ошибок при разработке',
      'Написание стилей',
    ],
  },
  {
    id: 4,
    question: 'Какие препроцессоры бывают?',
    type: 'multiple',
    options: ['Sass', 'Vue', 'Less', 'Scss', 'Flask'],
  },
  {
    id: 5,
    question: 'Как называется язык разметки для React?',
    type: 'short',
  },
  {
    id: 6,
    question: 'С помощью какой технологии можно писать JS на сервере?',
    type: 'short',
  },
  {
    id: 7,
    question: 'Разница типов и интерфейсов в TS?',
    type: 'long',
  },
  {
    id: 8,
    question: 'Фреймворки и библиотеки для JS?',
    type: 'long',
  },
]
