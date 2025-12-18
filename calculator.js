// Масив міст з тарифами
const cities = {
  kyiv: { name: "Київ", baseTariff: 50, pricePerKg: 15 },
  lviv: { name: "Львів", baseTariff: 60, pricePerKg: 18 },
  odesa: { name: "Одеса", baseTariff: 65, pricePerKg: 20 },
  dnipro: { name: "Дніпро", baseTariff: 55, pricePerKg: 16 },
  kharkiv: { name: "Харків", baseTariff: 55, pricePerKg: 16 },
  zaporizhzhia: { name: "Запоріжжя", baseTariff: 58, pricePerKg: 17 },
  vinnytsia: { name: "Вінниця", baseTariff: 52, pricePerKg: 15 },
  poltava: { name: "Полтава", baseTariff: 53, pricePerKg: 15 },
  chernivtsi: { name: "Чернівці", baseTariff: 62, pricePerKg: 19 },
  "ivano-frankivsk": { name: "Івано-Франківськ", baseTariff: 61, pricePerKg: 18 },
}

// Типи доставки з коефіцієнтами
const deliveryTypes = {
  standard: { name: "Стандартна (3-5 днів)", coefficient: 1.0 },
  express: { name: "Експрес (1-2 дні)", coefficient: 1.5 },
  nextday: { name: "Наступний день", coefficient: 2.0 },
}

const distanceMatrix = {
  kyiv: {
    kyiv: 0,
    lviv: 540,
    odesa: 475,
    dnipro: 480,
    kharkiv: 480,
    zaporizhzhia: 520,
    vinnytsia: 270,
    poltava: 340,
    chernivtsi: 470,
    "ivano-frankivsk": 600,
  },
  lviv: {
    kyiv: 540,
    lviv: 0,
    odesa: 790,
    dnipro: 850,
    kharkiv: 1020,
    zaporizhzhia: 960,
    vinnytsia: 370,
    poltava: 710,
    chernivtsi: 280,
    "ivano-frankivsk": 130,
  },
  odesa: {
    kyiv: 475,
    lviv: 790,
    odesa: 0,
    dnipro: 450,
    kharkiv: 630,
    zaporizhzhia: 470,
    vinnytsia: 410,
    poltava: 560,
    chernivtsi: 490,
    "ivano-frankivsk": 670,
  },
  dnipro: {
    kyiv: 480,
    lviv: 850,
    odesa: 450,
    dnipro: 0,
    kharkiv: 220,
    zaporizhzhia: 85,
    vinnytsia: 540,
    poltava: 250,
    chernivtsi: 680,
    "ivano-frankivsk": 770,
  },
  kharkiv: {
    kyiv: 480,
    lviv: 1020,
    odesa: 630,
    dnipro: 220,
    kharkiv: 0,
    zaporizhzhia: 280,
    vinnytsia: 650,
    poltava: 150,
    chernivtsi: 850,
    "ivano-frankivsk": 940,
  },
  zaporizhzhia: {
    kyiv: 520,
    lviv: 960,
    odesa: 470,
    dnipro: 85,
    kharkiv: 280,
    zaporizhzhia: 0,
    vinnytsia: 570,
    poltava: 330,
    chernivtsi: 720,
    "ivano-frankivsk": 850,
  },
  vinnytsia: {
    kyiv: 270,
    lviv: 370,
    odesa: 410,
    dnipro: 540,
    kharkiv: 650,
    zaporizhzhia: 570,
    vinnytsia: 0,
    poltava: 480,
    chernivtsi: 200,
    "ivano-frankivsk": 290,
  },
  poltava: {
    kyiv: 340,
    lviv: 710,
    odesa: 560,
    dnipro: 250,
    kharkiv: 150,
    zaporizhzhia: 330,
    vinnytsia: 480,
    poltava: 0,
    chernivtsi: 680,
    "ivano-frankivsk": 770,
  },
  chernivtsi: {
    kyiv: 470,
    lviv: 280,
    odesa: 490,
    dnipro: 680,
    kharkiv: 850,
    zaporizhzhia: 720,
    vinnytsia: 200,
    poltava: 680,
    chernivtsi: 0,
    "ivano-frankivsk": 150,
  },
  "ivano-frankivsk": {
    kyiv: 600,
    lviv: 130,
    odesa: 670,
    dnipro: 770,
    kharkiv: 940,
    zaporizhzhia: 850,
    vinnytsia: 290,
    poltava: 770,
    chernivtsi: 150,
    "ivano-frankivsk": 0,
  },
}

function calculateDistanceCost(originCity, destinationCity) {
  const distance = distanceMatrix[originCity][destinationCity]
  if (distance === 0) return 0 // Same city, no extra charge
  if (distance < 200) return 10
  if (distance < 400) return 25
  if (distance < 600) return 50
  return 75
}

document.getElementById("calculatorForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const originCityKey = document.getElementById("originCity").value
  const cityKey = document.getElementById("city").value
  const weight = Number.parseFloat(document.getElementById("weight").value)
  const deliveryType = document.querySelector('input[name="delivery"]:checked').value

  if (!originCityKey || !cityKey || !weight) {
    alert("Будь ласка, заповніть всі поля")
    return
  }

  if (originCityKey === cityKey) {
    alert("Місто відправлення та доставки не можуть співпадати")
    return
  }

  // Отримання даних
  const originCity = cities[originCityKey]
  const city = cities[cityKey]
  const delivery = deliveryTypes[deliveryType]

  const basePrice = city.baseTariff
  const weightPrice = weight * city.pricePerKg
  const distanceCost = calculateDistanceCost(originCityKey, cityKey)
  const subtotal = basePrice + weightPrice + distanceCost
  const total = subtotal * delivery.coefficient

  // Відображення результату
  document.getElementById("resultOriginCity").textContent = originCity.name
  document.getElementById("resultCity").textContent = city.name
  document.getElementById("resultWeight").textContent = weight + " кг"
  document.getElementById("resultDelivery").textContent = delivery.name
  document.getElementById("resultBase").textContent = basePrice.toFixed(2) + " грн"
  document.getElementById("resultWeightCost").textContent = weightPrice.toFixed(2) + " грн"
  document.getElementById("resultDistanceCost").textContent = distanceCost.toFixed(2) + " грн"
  document.getElementById("resultTotal").textContent = total.toFixed(2) + " грн"

  // Показати результат
  const resultCard = document.getElementById("result")
  resultCard.style.display = "block"
  resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" })
})

// Приховати результат при зміні даних форми
document.getElementById("calculatorForm").addEventListener("change", () => {
  document.getElementById("result").style.display = "none"
})
