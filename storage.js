// Робота з localStorage для збереження даних

const Storage = {
  /**
   * Зберігає дані в localStorage
   * @param {string} key - Ключ
   * @param {any} value - Значення
   */
  set(key, value) {
    try {
      const serialized = JSON.stringify(value)
      localStorage.setItem(key, serialized)
      return true
    } catch (error) {
      console.error('Помилка збереження в localStorage:', error)
      return false
    }
  },

  /**
   * Отримує дані з localStorage
   * @param {string} key - Ключ
   * @param {any} defaultValue - Значення за замовчуванням
   * @returns {any} Значення або defaultValue
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key)
      if (item === null) {
        return defaultValue
      }
      return JSON.parse(item)
    } catch (error) {
      console.error('Помилка читання з localStorage:', error)
      return defaultValue
    }
  },

  /**
   * Видаляє дані з localStorage
   * @param {string} key - Ключ
   */
  remove(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Помилка видалення з localStorage:', error)
      return false
    }
  },

  /**
   * Очищає весь localStorage
   */
  clear() {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('Помилка очищення localStorage:', error)
      return false
    }
  },

  /**
   * Перевіряє чи існує ключ
   * @param {string} key - Ключ
   * @returns {boolean} Чи існує ключ
   */
  has(key) {
    return localStorage.getItem(key) !== null
  },

  /**
   * Отримує всі ключі з префіксом
   * @param {string} prefix - Префікс
   * @returns {string[]} Масив ключів
   */
  getKeysWithPrefix(prefix) {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(prefix)) {
        keys.push(key)
      }
    }
    return keys
  }
}

// Константи для ключів
const STORAGE_KEYS = {
  CALCULATOR_HISTORY: 'expresspost_calculator_history',
  TRACKING_HISTORY: 'expresspost_tracking_history',
  USER_PREFERENCES: 'expresspost_user_preferences',
  CONTACT_SUBMISSIONS: 'expresspost_contact_submissions',
  FAVORITE_CITIES: 'expresspost_favorite_cities'
}

// Експорт
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Storage, STORAGE_KEYS }
}

