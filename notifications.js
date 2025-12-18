// Система сповіщень/тостів для користувача

const Notification = {
  /**
   * Створює елемент сповіщення
   * @param {string} message - Повідомлення
   * @param {string} type - Тип (success, error, info, warning)
   * @param {number} duration - Тривалість показу в мс
   * @returns {HTMLElement} Елемент сповіщення
   */
  create(message, type = 'info', duration = 3000) {
    // Створюємо контейнер якщо його немає
    let container = document.getElementById('notification-container')
    if (!container) {
      container = document.createElement('div')
      container.id = 'notification-container'
      container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 400px;
      `
      document.body.appendChild(container)
    }

    // Створюємо елемент сповіщення
    const notification = document.createElement('div')
    notification.className = `notification notification-${type}`
    notification.style.cssText = `
      background: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 1rem;
      animation: slideInRight 0.3s ease;
      border-left: 4px solid;
    `

    // Кольори залежно від типу
    const colors = {
      success: { border: '#10b981', icon: '✓', bg: '#f0fdf4' },
      error: { border: '#ef4444', icon: '✕', bg: '#fef2f2' },
      info: { border: '#0ea5e9', icon: 'ℹ', bg: '#f0f9ff' },
      warning: { border: '#f59e0b', icon: '⚠', bg: '#fffbeb' }
    }

    const color = colors[type] || colors.info
    notification.style.borderLeftColor = color.border
    notification.style.backgroundColor = color.bg

    // Іконка
    const icon = document.createElement('span')
    icon.textContent = color.icon
    icon.style.cssText = `
      font-size: 1.5rem;
      font-weight: bold;
      color: ${color.border};
    `
    notification.appendChild(icon)

    // Текст
    const text = document.createElement('span')
    text.textContent = message
    text.style.cssText = `
      flex: 1;
      color: #1a1a1a;
      font-size: 0.95rem;
    `
    notification.appendChild(text)

    // Кнопка закриття
    const closeBtn = document.createElement('button')
    closeBtn.textContent = '×'
    closeBtn.style.cssText = `
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #666;
      cursor: pointer;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    `
    closeBtn.onclick = () => this.remove(notification)
    notification.appendChild(closeBtn)

    // Додаємо в контейнер
    container.appendChild(notification)

    // Автоматичне видалення
    if (duration > 0) {
      setTimeout(() => {
        this.remove(notification)
      }, duration)
    }

    return notification
  },

  /**
   * Видаляє сповіщення
   * @param {HTMLElement} notification - Елемент сповіщення
   */
  remove(notification) {
    if (notification && notification.parentElement) {
      notification.style.animation = 'slideOutRight 0.3s ease'
      setTimeout(() => {
        if (notification.parentElement) {
          notification.parentElement.removeChild(notification)
        }
      }, 300)
    }
  },

  /**
   * Показує успішне сповіщення
   * @param {string} message - Повідомлення
   * @param {number} duration - Тривалість
   */
  success(message, duration = 3000) {
    return this.create(message, 'success', duration)
  },

  /**
   * Показує помилку
   * @param {string} message - Повідомлення
   * @param {number} duration - Тривалість
   */
  error(message, duration = 4000) {
    return this.create(message, 'error', duration)
  },

  /**
   * Показує інформаційне сповіщення
   * @param {string} message - Повідомлення
   * @param {number} duration - Тривалість
   */
  info(message, duration = 3000) {
    return this.create(message, 'info', duration)
  },

  /**
   * Показує попередження
   * @param {string} message - Повідомлення
   * @param {number} duration - Тривалість
   */
  warning(message, duration = 3500) {
    return this.create(message, 'warning', duration)
  },

  /**
   * Очищає всі сповіщення
   */
  clear() {
    const container = document.getElementById('notification-container')
    if (container) {
      container.innerHTML = ''
    }
  }
}

// Додаємо CSS анімації якщо їх немає
if (!document.getElementById('notification-styles')) {
  const style = document.createElement('style')
  style.id = 'notification-styles'
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)
}

// Експорт
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Notification }
}

