// Додаткові анімації та ефекти

const Animations = {
  /**
   * Анімація появи елемента (fade in)
   * @param {HTMLElement} element - Елемент
   * @param {number} duration - Тривалість в мс
   */
  fadeIn(element, duration = 300) {
    element.style.opacity = '0'
    element.style.display = 'block'
    
    let start = null
    const animate = (timestamp) => {
      if (!start) start = timestamp
      const progress = (timestamp - start) / duration
      
      if (progress < 1) {
        element.style.opacity = progress
        requestAnimationFrame(animate)
      } else {
        element.style.opacity = '1'
      }
    }
    
    requestAnimationFrame(animate)
  },

  /**
   * Анімація зникнення елемента (fade out)
   * @param {HTMLElement} element - Елемент
   * @param {number} duration - Тривалість в мс
   * @param {Function} callback - Функція після завершення
   */
  fadeOut(element, duration = 300, callback) {
    let start = null
    const startOpacity = parseFloat(window.getComputedStyle(element).opacity) || 1
    
    const animate = (timestamp) => {
      if (!start) start = timestamp
      const progress = (timestamp - start) / duration
      
      if (progress < 1) {
        element.style.opacity = startOpacity * (1 - progress)
        requestAnimationFrame(animate)
      } else {
        element.style.opacity = '0'
        element.style.display = 'none'
        if (callback) callback()
      }
    }
    
    requestAnimationFrame(animate)
  },

  /**
   * Анімація появи знизу (slide up)
   * @param {HTMLElement} element - Елемент
   * @param {number} duration - Тривалість в мс
   */
  slideUp(element, duration = 300) {
    element.style.display = 'block'
    element.style.transform = 'translateY(20px)'
    element.style.opacity = '0'
    
    let start = null
    const animate = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      
      const easeOut = 1 - Math.pow(1 - progress, 3)
      element.style.transform = `translateY(${20 * (1 - easeOut)}px)`
      element.style.opacity = easeOut
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        element.style.transform = 'translateY(0)'
        element.style.opacity = '1'
      }
    }
    
    requestAnimationFrame(animate)
  },

  /**
   * Анімація зникнення вниз (slide down)
   * @param {HTMLElement} element - Елемент
   * @param {number} duration - Тривалість в мс
   * @param {Function} callback - Функція після завершення
   */
  slideDown(element, duration = 300, callback) {
    let start = null
    const startY = 0
    
    const animate = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      
      const easeIn = Math.pow(progress, 3)
      element.style.transform = `translateY(${20 * easeIn}px)`
      element.style.opacity = 1 - easeIn
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        element.style.display = 'none'
        element.style.transform = 'translateY(0)'
        element.style.opacity = '1'
        if (callback) callback()
      }
    }
    
    requestAnimationFrame(animate)
  },

  /**
   * Анімація пульсації
   * @param {HTMLElement} element - Елемент
   * @param {number} duration - Тривалість в мс
   */
  pulse(element, duration = 1000) {
    const originalScale = element.style.transform || 'scale(1)'
    let start = null
    
    const animate = (timestamp) => {
      if (!start) start = timestamp
      const progress = ((timestamp - start) % duration) / duration
      const scale = 1 + 0.1 * Math.sin(progress * Math.PI * 2)
      element.style.transform = `scale(${scale})`
      requestAnimationFrame(animate)
    }
    
    requestAnimationFrame(animate)
    
    // Повертаємо оригінальний масштаб через duration
    setTimeout(() => {
      element.style.transform = originalScale
    }, duration)
  },

  /**
   * Анімація обертання
   * @param {HTMLElement} element - Елемент
   * @param {number} duration - Тривалість в мс
   * @param {number} rotations - Кількість обертів
   */
  rotate(element, duration = 500, rotations = 1) {
    let start = null
    const totalRotation = 360 * rotations
    
    const animate = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      
      const rotation = totalRotation * progress
      element.style.transform = `rotate(${rotation}deg)`
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        element.style.transform = 'rotate(0deg)'
      }
    }
    
    requestAnimationFrame(animate)
  },

  /**
   * Анімація появи при прокрутці (scroll reveal)
   * @param {HTMLElement|NodeList} elements - Елементи
   * @param {object} options - Опції
   */
  scrollReveal(elements, options = {}) {
    const {
      threshold = 0.1,
      rootMargin = '0px',
      animation = 'fadeIn',
      duration = 300
    } = options
    
    const elementArray = elements instanceof NodeList 
      ? Array.from(elements) 
      : [elements]
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target
          
          switch (animation) {
            case 'fadeIn':
              this.fadeIn(element, duration)
              break
            case 'slideUp':
              this.slideUp(element, duration)
              break
            default:
              this.fadeIn(element, duration)
          }
          
          observer.unobserve(element)
        }
      })
    }, { threshold, rootMargin })
    
    elementArray.forEach(element => {
      element.style.opacity = '0'
      observer.observe(element)
    })
  },

  /**
   * Анімація натискання кнопки
   * @param {HTMLElement} button - Кнопка
   */
  buttonPress(button) {
    button.style.transform = 'scale(0.95)'
    setTimeout(() => {
      button.style.transform = 'scale(1)'
    }, 150)
  },

  /**
   * Анімація завантаження (loading spinner)
   * @param {HTMLElement} container - Контейнер
   * @returns {HTMLElement} Елемент спіннера
   */
  showLoader(container) {
    const loader = document.createElement('div')
    loader.className = 'loader'
    loader.innerHTML = `
      <div style="
        border: 4px solid #f3f3f3;
        border-top: 4px solid #0ea5e9;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto;
      "></div>
    `
    
    // Додаємо CSS анімацію якщо її немає
    if (!document.getElementById('loader-styles')) {
      const style = document.createElement('style')
      style.id = 'loader-styles'
      style.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `
      document.head.appendChild(style)
    }
    
    container.appendChild(loader)
    return loader
  },

  /**
   * Приховує завантажувач
   * @param {HTMLElement} loader - Елемент завантажувача
   */
  hideLoader(loader) {
    if (loader && loader.parentElement) {
      loader.parentElement.removeChild(loader)
    }
  }
}

// Експорт
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Animations }
}

