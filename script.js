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
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value

      alert(
        `Дякуємо, ${name}!\n\nВаше повідомлення успішно відправлено.\nМи зв'яжемося з вами найближчим часом на email: ${email}`,
      )

      contactForm.reset()
    })
  }

  // Плавна прокрутка для якорів
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})
