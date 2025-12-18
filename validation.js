// Валідація форм з детальними повідомленнями

const Validator = {
  /**
   * Валідація email
   * @param {string} email - Email адреса
   * @returns {object} Результат валідації
   */
  validateEmail(email) {
    if (!email || email.trim() === '') {
      return { valid: false, message: 'Email обов\'язковий для заповнення' }
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { valid: false, message: 'Невірний формат email адреси' }
    }
    
    return { valid: true, message: '' }
  },

  /**
   * Валідація телефону
   * @param {string} phone - Номер телефону
   * @returns {object} Результат валідації
   */
  validatePhone(phone) {
    if (!phone || phone.trim() === '') {
      return { valid: true, message: '' } // Телефон не обов'язковий
    }
    
    // Формати: +380..., 0..., 380...
    const phoneRegex = /^(\+?38)?0?\d{9}$/
    const cleaned = phone.replace(/[\s\-\(\)]/g, '')
    
    if (!phoneRegex.test(cleaned)) {
      return { valid: false, message: 'Невірний формат телефону. Використовуйте формат: +380XXXXXXXXX' }
    }
    
    return { valid: true, message: '' }
  },

  /**
   * Валідація номера відстеження
   * @param {string} trackingNumber - Номер відстеження
   * @returns {object} Результат валідації
   */
  validateTrackingNumber(trackingNumber) {
    if (!trackingNumber || trackingNumber.trim() === '') {
      return { valid: false, message: 'Введіть номер відстеження' }
    }
    
    const cleaned = trackingNumber.trim().toUpperCase()
    
    if (!cleaned.startsWith('EP')) {
      return { valid: false, message: 'Номер має починатися з EP' }
    }
    
    if (cleaned.length < 10) {
      return { valid: false, message: 'Номер має містити мінімум 10 символів' }
    }
    
    const numberPart = cleaned.substring(2)
    if (!/^\d+$/.test(numberPart)) {
      return { valid: false, message: 'Після EP мають бути тільки цифри' }
    }
    
    return { valid: true, message: '', cleaned }
  },

  /**
   * Валідація ваги
   * @param {number|string} weight - Вага
   * @returns {object} Результат валідації
   */
  validateWeight(weight) {
    if (!weight || weight === '') {
      return { valid: false, message: 'Введіть вагу відправлення' }
    }
    
    const numWeight = Number.parseFloat(weight)
    
    if (Number.isNaN(numWeight)) {
      return { valid: false, message: 'Вага має бути числом' }
    }
    
    if (numWeight <= 0) {
      return { valid: false, message: 'Вага має бути більше 0' }
    }
    
    if (numWeight > 1000) {
      return { valid: false, message: 'Максимальна вага - 1000 кг' }
    }
    
    return { valid: true, message: '', value: numWeight }
  },

  /**
   * Валідація текстового поля
   * @param {string} text - Текст
   * @param {number} minLength - Мінімальна довжина
   * @param {number} maxLength - Максимальна довжина
   * @returns {object} Результат валідації
   */
  validateText(text, minLength = 1, maxLength = 1000) {
    if (!text || text.trim() === '') {
      return { valid: false, message: 'Поле обов\'язкове для заповнення' }
    }
    
    const trimmed = text.trim()
    
    if (trimmed.length < minLength) {
      return { valid: false, message: `Мінімальна довжина - ${minLength} символів` }
    }
    
    if (trimmed.length > maxLength) {
      return { valid: false, message: `Максимальна довжина - ${maxLength} символів` }
    }
    
    return { valid: true, message: '', value: trimmed }
  },

  /**
   * Валідація вибору міста
   * @param {string} cityKey - Ключ міста
   * @returns {object} Результат валідації
   */
  validateCity(cityKey) {
    if (!cityKey || cityKey === '') {
      return { valid: false, message: 'Оберіть місто' }
    }
    
    return { valid: true, message: '' }
  },

  /**
   * Валідація форми калькулятора
   * @param {object} formData - Дані форми
   * @returns {object} Результат валідації
   */
  validateCalculatorForm(formData) {
    const errors = []
    
    const originCity = this.validateCity(formData.originCity)
    if (!originCity.valid) errors.push({ field: 'originCity', message: originCity.message })
    
    const city = this.validateCity(formData.city)
    if (!city.valid) errors.push({ field: 'city', message: city.message })
    
    if (formData.originCity === formData.city && formData.originCity !== '') {
      errors.push({ field: 'city', message: 'Місто відправлення та доставки не можуть співпадати' })
    }
    
    const weight = this.validateWeight(formData.weight)
    if (!weight.valid) {
      errors.push({ field: 'weight', message: weight.message })
    }
    
    return {
      valid: errors.length === 0,
      errors
    }
  },

  /**
   * Валідація форми контактів
   * @param {object} formData - Дані форми
   * @returns {object} Результат валідації
   */
  validateContactForm(formData) {
    const errors = []
    
    const name = this.validateText(formData.name, 2, 100)
    if (!name.valid) errors.push({ field: 'name', message: name.message })
    
    const email = this.validateEmail(formData.email)
    if (!email.valid) errors.push({ field: 'email', message: email.message })
    
    if (formData.phone) {
      const phone = this.validatePhone(formData.phone)
      if (!phone.valid) errors.push({ field: 'phone', message: phone.message })
    }
    
    const subject = this.validateCity(formData.subject) // Використовуємо validateCity для вибору
    if (!subject.valid) errors.push({ field: 'subject', message: 'Оберіть тему звернення' })
    
    const message = this.validateText(formData.message, 10, 2000)
    if (!message.valid) errors.push({ field: 'message', message: message.message })
    
    return {
      valid: errors.length === 0,
      errors
    }
  },

  /**
   * Показує помилку валідації для поля
   * @param {HTMLElement} field - Поле форми
   * @param {string} message - Повідомлення про помилку
   */
  showFieldError(field, message) {
    field.classList.add('error')
    
    // Видаляємо попереднє повідомлення
    const existingError = field.parentElement.querySelector('.error-message')
    if (existingError) {
      existingError.remove()
    }
    
    // Додаємо нове повідомлення
    const errorElement = document.createElement('span')
    errorElement.className = 'error-message'
    errorElement.textContent = message
    errorElement.style.color = '#ef4444'
    errorElement.style.fontSize = '0.875rem'
    errorElement.style.marginTop = '0.25rem'
    errorElement.style.display = 'block'
    field.parentElement.appendChild(errorElement)
  },

  /**
   * Приховує помилку валідації для поля
   * @param {HTMLElement} field - Поле форми
   */
  hideFieldError(field) {
    field.classList.remove('error')
    const errorElement = field.parentElement.querySelector('.error-message')
    if (errorElement) {
      errorElement.remove()
    }
  },

  /**
   * Очищає всі помилки форми
   * @param {HTMLFormElement} form - Форма
   */
  clearFormErrors(form) {
    const fields = form.querySelectorAll('.error')
    fields.forEach(field => {
      this.hideFieldError(field)
    })
  }
}

// Експорт
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Validator }
}

