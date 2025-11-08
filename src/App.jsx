import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Impact from './components/Impact'
import DonationSection from './components/DonationSection'
import Footer from './components/Footer'

function App() {
  const [showThankYou, setShowThankYou] = useState(false)

  useEffect(() => {
    // Check for success parameter in URL (from Stripe redirect)
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('success') === 'true') {
      setShowThankYou(true)
      // Scroll to donation section to show thank you message
      setTimeout(() => {
        document.getElementById('donation-section')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <About />
      <Impact />
      <DonationSection showThankYou={showThankYou} />
      <Footer />
    </div>
  )
}

export default App

