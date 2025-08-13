'use client'

import { useEffect } from 'react'
import confetti from 'canvas-confetti'

const Confetti = () => {
  useEffect(() => {
    const duration = 2 * 1000 // 3 seconds
    const animationEnd = Date.now() + duration
    const defaults = {
      startVelocity: 30,
      particleCount: 400,
      spread: 120,
      decay: 0.8,
      gravity: 0.5,
      ticks: 1500,
      scalar: 1.2,
      shapes: ['circle', 'square'],
      zIndex: 1000,
    }

   const randomInRange = (min, max) => Math.random() * (max - min) + min


    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        return
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: {
            x: randomInRange(0.1, 0.9),
            y: Math.random() - 0.1,
          },
        })
      )
    }, 250)
  }, [])

  return null
}

export default Confetti
