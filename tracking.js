document.getElementById("trackingForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const trackingNumber = document.getElementById("trackingNumber").value.trim().toUpperCase()

  if (!trackingNumber) {
    alert("Будь ласка, введіть номер відстеження")
    return
  }

  // Перевірка формату номера (має починатися з EP та містити цифри)
  if (!trackingNumber.startsWith("EP") || trackingNumber.length < 10) {
    alert("Невірний формат номера відстеження. Номер має починатися з EP та містити цифри.\nПриклад: EP12345678")
    return
  }

  // Відображення результату відстеження
  document.getElementById("trackNumber").textContent = trackingNumber
  document.getElementById("trackStatus").textContent = "В дорозі"

  const resultBlock = document.getElementById("trackingResult")
  resultBlock.style.display = "block"
  resultBlock.scrollIntoView({ behavior: "smooth", block: "start" })

  // Очищення форми
  document.getElementById("trackingNumber").value = ""
})

// Приховати результат при зміні введення
document.getElementById("trackingNumber").addEventListener("input", () => {
  document.getElementById("trackingResult").style.display = "none"
})
