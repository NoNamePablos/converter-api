# Конвертер Валют

## 🚀 Технологический Стек

### Основные Технологии
- **Vue 3** 
- **Vue Test Utils** - Покрыты тестами UI компоненты и стор
- **TypeScript**
- **Vite**
- **Pinia**
- **Vue Router**

### Стилизация и UI
- **Tailwind CSS** - CSS фреймворк, основанный на утилитарных классах
- **Пользовательские UI компоненты** - Переиспользуемые компоненты, созданные с нуля

### HTTP Клиент
- **Axios**

## 🏗 Архитектура

Проект следует методологии Feature-Sliced Design (FSD).
Выбрана была, просто потому-что захотелось тут ее раскатить

### Структура Директорий
```
src/
├── app/              # Точка входа приложения, глобальные стили, провайдеры
│   ├── providers/    # Глобальные провайдеры (роутер, хранилище)
│   └── styles/       # Глобальные стили
├── pages/            # Страницы приложения
│   ├── home/         # Главная страница с текущими курсами
│   └── convert/      # Страница конвертации валют
├── widgets/          # Сложные компоненты, состоящие из фич/сущностей
│   └── Header/       # Шапка приложения
├── shared/           # Общие модули
│   ├── api/         # Слой API
│   ├── config/      # Общая конфигурация
│   └── ui/          # UI компоненты
└── main.ts          # Инициализация приложения
```

### Ключевые Архитектурные Решения
1. **Feature-Sliced Design (FSD)**
   - Четкое разделение ответственности
   - Предсказуемая организация кода
   - Масштабируемая архитектура

2. **Composition API**
   - Улучшенная поддержка TypeScript
   - Более гибкое переиспользование кода
   - Улучшенная читаемость

3. **Управление Состоянием**
   - Централизованное хранилище с Pinia
   - Типизированные действия и состояния
   - Реактивные курсы валют и конвертации

## 🎯 Ключевые Возможности

### 1. Отображение Курсов Валют
- Курсы валют в реальном времени
- Динамический выбор базовой валюты
- Автоматическое обновление курсов

### 2. Конвертер Валют
- Двунаправленная конвертация
- Расчет в реальном времени
- Валидация ввода
- Поддержка USD, EUR и RUB

### 3. Адаптивный Интерфейс
- Адаптация под мобильные устройства
- Единообразный стиль с Tailwind CSS
- Пользовательские компоненты форм

### 4. Типизация
- Полная реализация на TypeScript
- Типизированные ответы API
- Строгая типизация пропсов компонентов

## 🔧 Компоненты

### UI Компоненты
1. **UiInput**
   - Типизированная привязка значений
   - Обработка состояний ошибок
   - Кастомные стили

2. **UiSelect**
   - Выпадающий список для выбора валют
   - Типизированные опции
   - Кастомные стили

### Компоненты Функционала
1. **Header**
   - Навигационные ссылки
   - Выбор базовой валюты
   - Адаптивный дизайн

2. **Конвертер Валют**
   - Двунаправленная конвертация
   - Обновления в реальном времени
   - Валидация ввода

### Интеграция с API
- Централизованный API клиент
- Типизированные ответы
- Обработка ошибок
- Нормализация курсов

## 🛠 Особенности Разработки

### Качество Кода
- Конфигурация ESLint
- Форматирование с Prettier
- Строгий режим TypeScript

## 🔍 Лучшие Практики

1. **Дизайн Компонентов**
   - Принцип единственной ответственности
   - Валидация пропсов
   - Паттерны обработки событий
   - Использование Composition API

2. **Безопасность Типов**
   - Строгая конфигурация TypeScript
   - Определения интерфейсов
   - Вывод типов
   - Константные типы

3. **Управление Состоянием**
   - Централизованное хранилище
   - Вычисляемые свойства
   - Реактивное состояние
   - Обработчики действий

4. **Организация Кода**
   - Структура на основе фич
   - Четкие соглашения об именовании
   - Модульный дизайн
   - Переиспользуемые компоненты

## 🚀 Начало Работы

```bash
# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр продакшен сборки
npm run preview
```

## 📝 Дополнительные Заметки

- Приложение использует пользовательский API endpoint для валют
- Поддерживает три основные валюты: USD, EUR, RUB
- Все курсы конвертации обновляются в реальном времени
- Валидация ввода обеспечивает только корректные числовые значения
- Интерфейс полностью адаптивен и оптимизирован для мобильных устройств