// Симуляція API для відстеження посилок та інших операцій

const API = {
  /**
   * Симулює затримку мережевого запиту
   * @param {number} ms - Мілісекунди затримки
   * @returns {Promise} Promise з затримкою
   */
  delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms))
  },

  /**
   * Отримує інформацію про відстеження посилки
   * @param {string} trackingNumber - Номер відстеження
   * @returns {Promise<object>} Дані відстеження
   */
  async getTrackingInfo(trackingNumber) {
    await this.delay(800) // Симуляція мережевого запиту
    
    // Генеруємо випадкові дані на основі номера
    const seed = trackingNumber.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const random = (seed % 100) / 100
    
    // Статуси
    const statuses = [
      { status: 'Отримано', progress: 0.1, color: '#3b82f6' },
      { status: 'В обробці', progress: 0.3, color: '#3b82f6' },
      { status: 'Відправлено', progress: 0.5, color: '#3b82f6' },
      { status: 'В дорозі', progress: 0.7, color: '#0ea5e9' },
      { status: 'Прибуло в місто', progress: 0.9, color: '#10b981' },
      { status: 'Доставлено', progress: 1.0, color: '#10b981' }
    ]
    
    const statusIndex = Math.floor(random * statuses.length)
    const currentStatus = statuses[statusIndex]
    
    // Генеруємо історію
    const history = []
    const cities = ['Київ', 'Львів', 'Одеса', 'Дніпро', 'Харків']
    const now = new Date()
    
    for (let i = 0; i <= statusIndex; i++) {
      const date = new Date(now)
      date.setDate(date.getDate() - (statusIndex - i))
      date.setHours(10 + i, 30 + i * 15)
      
      history.push({
        id: i + 1,
        time: date.toISOString(),
        title: statuses[i].status,
        location: cities[i % cities.length],
        completed: i < statusIndex,
        active: i === statusIndex
      })
    }
    
    return {
      success: true,
      data: {
        trackingNumber,
        status: currentStatus.status,
        statusColor: currentStatus.color,
        progress: currentStatus.progress,
        origin: cities[0],
        destination: cities[cities.length - 1],
        estimatedDelivery: this.addDays(now, statusIndex < 3 ? 2 : 0).toISOString(),
        history,
        packageInfo: {
          weight: (2 + random * 5).toFixed(2) + ' кг',
          dimensions: '30x20x15 см',
          type: 'Стандартна посилка'
        }
      }
    }
  },

  /**
   * Розраховує вартість доставки
   * @param {object} params - Параметри розрахунку
   * @returns {Promise<object>} Результат розрахунку
   */
  async calculateShipping(params) {
    await this.delay(300)
    
    // Це буде використовувати логіку з calculator.js
    // Тут просто симуляція API
    return {
      success: true,
      data: {
        ...params,
        calculated: true,
        timestamp: new Date().toISOString()
      }
    }
  },

  /**
   * Відправляє форму контактів
   * @param {object} formData - Дані форми
   * @returns {Promise<object>} Результат відправки
   */
  async submitContactForm(formData) {
    await this.delay(1000)
    
    // Симуляція успішної відправки
    return {
      success: true,
      message: 'Ваше повідомлення успішно відправлено',
      data: {
        id: this.generateId(),
        ...formData,
        submittedAt: new Date().toISOString()
      }
    }
  },

  /**
   * Отримує список відділень
   * @param {string} city - Місто
   * @returns {Promise<object>} Список відділень
   */
  async getOffices(city) {
    await this.delay(500)
    
    // Симуляція списку відділень
    const offices = []
    for (let i = 1; i <= 5; i++) {
      offices.push({
        id: i,
        address: `вул. Прикладна ${i}, ${city}`,
        phone: `+380 44 123 ${String(i).padStart(2, '0')} ${String(i).padStart(2, '0')}`,
        hours: 'Пн-Пт: 09:00-18:00, Сб: 10:00-16:00',
        coordinates: {
          lat: 50.4501 + (Math.random() - 0.5) * 0.1,
          lng: 30.5234 + (Math.random() - 0.5) * 0.1
        }
      })
    }
    
    return {
      success: true,
      data: {
        city,
        offices,
        count: offices.length
      }
    }
  },

  /**
   * Отримує статистику
   * @returns {Promise<object>} Статистика
   */
  async getStats() {
    await this.delay(400)
    
    return {
      success: true,
      data: {
        activeClients: 45280,
        deliveredPackages: 1250000,
        offices: 1200,
        onTimeDelivery: 98
      }
    }
  },

  // Допоміжні функції
  addDays(date, days) {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  },

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }
}

// Експорт
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { API }
}

