# JavaScript Модулі - Документація

## Огляд

Проект розширено додатковими JavaScript модулями для покращення функціональності та користувацького досвіду.

## Нові модулі

### 1. `utils.js` - Утиліти
Загальні функції для роботи з даними:
- `formatCurrency()` - форматування грошових сум
- `formatNumber()` - форматування чисел з роздільниками
- `formatDate()` - форматування дат
- `generateId()` - генерація унікальних ID
- `copyToClipboard()` - копіювання в буфер обміну
- `debounce()` / `throttle()` - оптимізація подій
- `scrollToElement()` - плавна прокрутка

### 2. `storage.js` - Робота з localStorage
Збереження та отримання даних:
- `Storage.set()` - збереження даних
- `Storage.get()` - отримання даних
- `Storage.remove()` - видалення даних
- `Storage.clear()` - очищення всіх даних

**Ключі збереження:**
- `CALCULATOR_HISTORY` - історія розрахунків
- `TRACKING_HISTORY` - історія відстеження
- `CONTACT_SUBMISSIONS` - відправлені форми контактів

### 3. `validation.js` - Валідація форм
Детальна валідація полів форм:
- `validateEmail()` - валідація email
- `validatePhone()` - валідація телефону
- `validateTrackingNumber()` - валідація номера відстеження
- `validateWeight()` - валідація ваги
- `validateCalculatorForm()` - валідація форми калькулятора
- `validateContactForm()` - валідація форми контактів
- `showFieldError()` / `hideFieldError()` - відображення помилок

### 4. `api.js` - Симуляція API
Симуляція API запитів:
- `getTrackingInfo()` - отримання інформації про відстеження
- `calculateShipping()` - розрахунок доставки
- `submitContactForm()` - відправка форми контактів
- `getOffices()` - отримання списку відділень
- `getStats()` - отримання статистики

### 5. `notifications.js` - Система сповіщень
Тостові сповіщення для користувача:
- `Notification.success()` - успішне сповіщення
- `Notification.error()` - помилка
- `Notification.info()` - інформаційне сповіщення
- `Notification.warning()` - попередження
- `Notification.clear()` - очищення всіх сповіщень

### 6. `animations.js` - Анімації
Анімації та ефекти:
- `fadeIn()` / `fadeOut()` - поява/зникнення
- `slideUp()` / `slideDown()` - поява знизу/зникнення вниз
- `pulse()` - пульсація
- `rotate()` - обертання
- `scrollReveal()` - поява при прокрутці
- `buttonPress()` - анімація натискання
- `showLoader()` / `hideLoader()` - індикатор завантаження

### 7. `history.js` - Історія розрахунків
Робота з історією калькулятора:
- `CalculatorHistory.save()` - збереження розрахунку
- `CalculatorHistory.getAll()` - отримання всієї історії
- `CalculatorHistory.getRecent()` - останні розрахунки
- `CalculatorHistory.remove()` - видалення запису
- `CalculatorHistory.clear()` - очищення історії
- `CalculatorHistory.getStats()` - статистика
- `CalculatorHistory.render()` - відображення в DOM

## Оновлені файли

### `calculator.js`
- Додано валідацію форми
- Додано збереження в історію
- Додано анімації
- Додано сповіщення
- Використання `formatCurrency()` для відображення сум

### `tracking.js`
- Додано валідацію номера відстеження
- Інтеграція з API для отримання даних
- Додано завантажувач
- Додано збереження в історію
- Додано анімації

### `script.js`
- Покращена валідація форми контактів
- Інтеграція з API
- Додано анімації появи елементів
- Додано анімації кнопок

## Підключення модулів

Модулі підключаються в HTML файлах в такому порядку:

```html
<script src="utils.js"></script>
<script src="storage.js"></script>
<script src="validation.js"></script>
<script src="api.js"></script>
<script src="notifications.js"></script>
<script src="animations.js"></script>
<script src="history.js"></script>
<script src="script.js"></script>
<script src="calculator.js"></script> <!-- або tracking.js -->
```

## Нові можливості

1. **Валідація форм** - детальна валідація з показом помилок
2. **Історія розрахунків** - збереження та перегляд попередніх розрахунків
3. **Сповіщення** - красиві тостові сповіщення замість alert()
4. **Анімації** - плавні анімації появи елементів
5. **API симуляція** - реалістична симуляція API запитів
6. **Збереження даних** - автоматичне збереження в localStorage

## Приклади використання

### Валідація форми
```javascript
const validation = Validator.validateCalculatorForm(formData)
if (!validation.valid) {
  validation.errors.forEach(error => {
    Validator.showFieldError(field, error.message)
  })
}
```

### Показ сповіщення
```javascript
Notification.success('Операція виконана успішно!')
Notification.error('Сталася помилка')
```

### Збереження в історію
```javascript
CalculatorHistory.save({
  originCity: 'Київ',
  destinationCity: 'Львів',
  weight: 2.5,
  total: 150.00
})
```

### Анімація появи
```javascript
Animations.fadeIn(element, 300)
Animations.slideUp(element, 400)
```

## Залежності

- `history.js` залежить від `storage.js` та `utils.js`
- `calculator.js` та `tracking.js` залежать від всіх модулів
- Всі модулі використовують глобальний scope (не використовують module.exports в браузері)

