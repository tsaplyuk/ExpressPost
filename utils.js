// Утиліти для роботи з даними, форматуванням та загальними функціями

/**
 * Форматує число як грошову суму
 * @param {number} amount - Сума
 * @param {string} currency - Валюта (за замовчуванням 'грн')
 * @returns {string} Відформатована сума
 */
function formatCurrency(amount, currency = 'грн') {
  return `${Number.parseFloat(amount).toFixed(2)} ${currency}`
}

/**
 * Форматує число з роздільниками тисяч
 * @param {number} number - Число
 * @returns {string} Відформатоване число
 */
function formatNumber(number) {
  return Number.parseInt(number).toLocaleString('uk-UA')
}

/**
 * Форматує дату в українському форматі
 * @param {Date} date - Дата
 * @returns {string} Відформатована дата
 */
function formatDate(date) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(date).toLocaleDateString('uk-UA', options)
}

/**
 * Форматує дату як коротку (тільки дата)
 * @param {Date} date - Дата
 * @returns {string} Коротка дата
 */
function formatShortDate(date) {
  const options = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit'
  }
  return new Date(date).toLocaleDateString('uk-UA', options)
}

/**
 * Отримує поточну дату та час
 * @returns {Date} Поточна дата
 */
function getCurrentDate() {
  return new Date()
}

/**
 * Додає дні до дати
 * @param {Date} date - Початкова дата
 * @param {number} days - Кількість днів
 * @returns {Date} Нова дата
 */
function addDays(date, days) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

/**
 * Генерує унікальний ID
 * @returns {string} Унікальний ID
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

/**
 * Генерує номер відстеження
 * @returns {string} Номер відстеження
 */
function generateTrackingNumber() {
  const prefix = 'EP'
  const random = Math.floor(Math.random() * 100000000)
  return `${prefix}${random.toString().padStart(8, '0')}`
}

/**
 * Дебаунс функція - затримка виконання
 * @param {Function} func - Функція для виконання
 * @param {number} wait - Час очікування в мс
 * @returns {Function} Дебаунс функція
 */
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Троттлінг функція - обмеження частоти виконання
 * @param {Function} func - Функція для виконання
 * @param {number} limit - Мінімальний інтервал в мс
 * @returns {Function} Троттл функція
 */
function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Копіює текст в буфер обміну
 * @param {string} text - Текст для копіювання
 * @returns {Promise<boolean>} Успіх операції
 */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // Fallback для старих браузерів
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    } catch (err) {
      document.body.removeChild(textArea)
      return false
    }
  }
}

/**
 * Перевіряє чи є елемент у viewport
 * @param {HTMLElement} element - Елемент
 * @returns {boolean} Чи видимий елемент
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Плавна прокрутка до елемента
 * @param {HTMLElement|string} target - Елемент або селектор
 * @param {object} options - Опції прокрутки
 */
function scrollToElement(target, options = {}) {
  const element = typeof target === 'string' 
    ? document.querySelector(target) 
    : target
  
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      ...options
    })
  }
}

/**
 * Отримує параметри з URL
 * @param {string} name - Назва параметра
 * @returns {string|null} Значення параметра
 */
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(name)
}

/**
 * Встановлює параметр в URL
 * @param {string} name - Назва параметра
 * @param {string} value - Значення
 */
function setUrlParameter(name, value) {
  const url = new URL(window.location)
  url.searchParams.set(name, value)
  window.history.pushState({}, '', url)
}

/**
 * Експорт функцій для використання в інших модулях
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatCurrency,
    formatNumber,
    formatDate,
    formatShortDate,
    getCurrentDate,
    addDays,
    generateId,
    generateTrackingNumber,
    debounce,
    throttle,
    copyToClipboard,
    isInViewport,
    scrollToElement,
    getUrlParameter,
    setUrlParameter
  }
}

