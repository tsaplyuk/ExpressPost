document.getElementById("trackingForm").addEventListener("submit", async (e) => {
  e.preventDefault()

  const trackingNumberInput = document.getElementById("trackingNumber")
  const trackingNumber = trackingNumberInput.value.trim().toUpperCase()

  // Валідація
  const validation = Validator.validateTrackingNumber(trackingNumber)
  
  if (!validation.valid) {
    Notification.error(validation.message)
    Validator.showFieldError(trackingNumberInput, validation.message)
    return
  }

  const cleanedNumber = validation.cleaned || trackingNumber

  // Показуємо завантажувач
  const form = e.target
  const loader = Animations.showLoader(form)

  try {
    // Отримуємо дані відстеження через API
    const response = await API.getTrackingInfo(cleanedNumber)
    
    if (response.success) {
      const data = response.data
      
      // Відображення результату відстеження
      document.getElementById("trackNumber").textContent = cleanedNumber
      document.getElementById("trackStatus").textContent = data.status
      
      // Оновлюємо колір статусу
      const statusElement = document.getElementById("trackStatus")
      if (statusElement) {
        statusElement.style.backgroundColor = data.statusColor
      }
      
      // Оновлюємо історію якщо є контейнер
      const timelineContainer = document.querySelector(".tracking-timeline")
      if (timelineContainer && data.history) {
        timelineContainer.innerHTML = data.history.map(item => {
          const date = formatDate(new Date(item.time))
          const completedClass = item.completed ? 'completed' : ''
          const activeClass = item.active ? 'active' : ''
          
          return `
            <div class="timeline-item ${completedClass} ${activeClass}">
              <div class="timeline-marker"></div>
              <div class="timeline-time">${date}</div>
              <div class="timeline-title">${item.title}</div>
              <div class="timeline-location">${item.location}</div>
            </div>
          `
        }).join('')
      }

      const resultBlock = document.getElementById("trackingResult")
      Animations.slideUp(resultBlock, 400)
      scrollToElement(resultBlock, { behavior: "smooth", block: "start" })
      
      Notification.success(`Відстеження знайдено! Статус: ${data.status}`)
      
      // Зберігаємо в історію
      const trackingHistory = Storage.get(STORAGE_KEYS.TRACKING_HISTORY, [])
      trackingHistory.unshift({
        trackingNumber: cleanedNumber,
        status: data.status,
        timestamp: new Date().toISOString()
      })
      Storage.set(STORAGE_KEYS.TRACKING_HISTORY, trackingHistory.slice(0, 20))
    }
  } catch (error) {
    Notification.error("Помилка при отриманні інформації про відстеження")
    console.error(error)
  } finally {
    Animations.hideLoader(loader)
    trackingNumberInput.value = ""
  }
})

// Приховати результат при зміні введення
document.getElementById("trackingNumber").addEventListener("input", (e) => {
  const result = document.getElementById("trackingResult")
  if (result && result.style.display !== "none") {
    Animations.fadeOut(result, 200)
  }
  Validator.hideFieldError(e.target)
})

// Ініціалізація
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("trackingForm")
  if (form) {
    Animations.fadeIn(form, 300)
  }
})
