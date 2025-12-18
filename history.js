// Історія розрахунків калькулятора

const CalculatorHistory = {
  /**
   * Зберігає розрахунок в історію
   * @param {object} calculation - Дані розрахунку
   */
  save(calculation) {
    const history = this.getAll()
    
    const historyItem = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      ...calculation
    }
    
    history.unshift(historyItem) // Додаємо на початок
    
    // Зберігаємо тільки останні 50 розрахунків
    const limitedHistory = history.slice(0, 50)
    
    Storage.set(STORAGE_KEYS.CALCULATOR_HISTORY, limitedHistory)
    
    return historyItem
  },

  /**
   * Отримує всю історію
   * @returns {Array} Масив розрахунків
   */
  getAll() {
    return Storage.get(STORAGE_KEYS.CALCULATOR_HISTORY, [])
  },

  /**
   * Отримує останні N розрахунків
   * @param {number} limit - Кількість
   * @returns {Array} Масив розрахунків
   */
  getRecent(limit = 10) {
    const history = this.getAll()
    return history.slice(0, limit)
  },

  /**
   * Видаляє розрахунок з історії
   * @param {string} id - ID розрахунку
   */
  remove(id) {
    const history = this.getAll()
    const filtered = history.filter(item => item.id !== id)
    Storage.set(STORAGE_KEYS.CALCULATOR_HISTORY, filtered)
  },

  /**
   * Очищає всю історію
   */
  clear() {
    Storage.remove(STORAGE_KEYS.CALCULATOR_HISTORY)
  },

  /**
   * Отримує статистику історії
   * @returns {object} Статистика
   */
  getStats() {
    const history = this.getAll()
    
    if (history.length === 0) {
      return {
        total: 0,
        totalCost: 0,
        averageCost: 0,
        mostUsedCity: null,
        mostUsedDeliveryType: null
      }
    }
    
    const totalCost = history.reduce((sum, item) => sum + (item.total || 0), 0)
    const averageCost = totalCost / history.length
    
    // Найбільш використовуване місто
    const cityCounts = {}
    history.forEach(item => {
      const city = item.destinationCity || item.city
      cityCounts[city] = (cityCounts[city] || 0) + 1
    })
    const mostUsedCity = Object.keys(cityCounts).reduce((a, b) => 
      cityCounts[a] > cityCounts[b] ? a : b, Object.keys(cityCounts)[0]
    )
    
    // Найбільш використовуваний тип доставки
    const deliveryCounts = {}
    history.forEach(item => {
      const type = item.deliveryType || item.delivery
      deliveryCounts[type] = (deliveryCounts[type] || 0) + 1
    })
    const mostUsedDeliveryType = Object.keys(deliveryCounts).reduce((a, b) => 
      deliveryCounts[a] > deliveryCounts[b] ? a : b, Object.keys(deliveryCounts)[0]
    )
    
    return {
      total: history.length,
      totalCost: totalCost.toFixed(2),
      averageCost: averageCost.toFixed(2),
      mostUsedCity,
      mostUsedDeliveryType
    }
  },

  /**
   * Генерує унікальний ID
   * @returns {string} ID
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  },

  /**
   * Відображає історію в DOM
   * @param {HTMLElement} container - Контейнер для відображення
   * @param {number} limit - Ліміт записів
   */
  render(container, limit = 10) {
    const history = this.getRecent(limit)
    
    if (history.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Історія порожня</p>'
      return
    }
    
    container.innerHTML = history.map(item => {
      const date = formatShortDate(new Date(item.timestamp))
      const origin = item.originCity || 'Невідомо'
      const destination = item.destinationCity || item.city || 'Невідомо'
      const total = item.total || 0
      
      return `
        <div class="history-item" style="
          background: white;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 0.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <div>
            <div style="font-weight: 600; margin-bottom: 0.25rem;">
              ${origin} → ${destination}
            </div>
            <div style="font-size: 0.875rem; color: #666;">
              ${date} • ${item.weight || 'N/A'} кг
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: 700; color: #0ea5e9; font-size: 1.1rem;">
              ${formatCurrency(total)}
            </div>
            <button onclick="CalculatorHistory.remove('${item.id}'); CalculatorHistory.render(this.parentElement.parentElement);" 
                    style="
                      background: none;
                      border: none;
                      color: #ef4444;
                      cursor: pointer;
                      font-size: 0.75rem;
                      margin-top: 0.25rem;
                    ">
              Видалити
            </button>
          </div>
        </div>
      `
    }).join('')
  }
}

// Експорт
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CalculatorHistory }
}

