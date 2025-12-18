document.addEventListener("DOMContentLoaded", () => {
  // Анімація чисел на сторінці клієнтів
  const statNumbers = document.querySelectorAll(".stat-number")

  if (statNumbers.length > 0) {
    const animateNumbers = () => {
      statNumbers.forEach((stat) => {
        const target = Number.parseInt(stat.getAttribute("data-target"))
        const duration = 2000
        const increment = target / (duration / 16)
        let current = 0

        const updateNumber = () => {
          current += increment
          if (current < target) {
            stat.textContent = Math.floor(current).toLocaleString("uk-UA")
            requestAnimationFrame(updateNumber)
          } else {
            stat.textContent = target.toLocaleString("uk-UA")
          }
        }

        updateNumber()
      })
    }

    // Запуск анімації при прокрутці до елементів
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateNumbers()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(document.querySelector(".stats"))
  }

  // Обробка форми контактів
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone")?.value || '',
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
      }

      // Валідація
      Validator.clearFormErrors(contactForm)
      const validation = Validator.validateContactForm(formData)

      if (!validation.valid) {
        validation.errors.forEach(error => {
          const field = document.getElementById(error.field)
          if (field) {
            Validator.showFieldError(field, error.message)
          }
        })
        return
      }

      // Показуємо завантажувач
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent
      submitButton.disabled = true
      submitButton.textContent = 'Відправка...'

      try {
        const response = await API.submitContactForm(formData)
        
        if (response.success) {
          Notification.success(`Дякуємо, ${formData.name}! Ваше повідомлення успішно відправлено.`)
          
          // Зберігаємо в історію
          const submissions = Storage.get(STORAGE_KEYS.CONTACT_SUBMISSIONS, [])
          submissions.unshift({
            ...formData,
            timestamp: new Date().toISOString()
          })
          Storage.set(STORAGE_KEYS.CONTACT_SUBMISSIONS, submissions.slice(0, 50))
          
          contactForm.reset()
        }
      } catch (error) {
        Notification.error("Помилка при відправці повідомлення. Спробуйте ще раз.")
        console.error(error)
      } finally {
        submitButton.disabled = false
        submitButton.textContent = originalText
      }
    })
  }

  // Плавна прокрутка для якорів
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const href = this.getAttribute("href")
      if (href && href !== "#") {
        scrollToElement(href, { behavior: "smooth", block: "start" })
      }
    })
  })

  // Анімація появи елементів при прокрутці
  const cards = document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .stat-card')
  if (cards.length > 0) {
    Animations.scrollReveal(cards, {
      threshold: 0.1,
      animation: 'fadeIn',
      duration: 400
    })
  }

  // Анімація кнопок при натисканні
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
      Animations.buttonPress(this)
    })
  })
})
