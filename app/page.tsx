'use client'

import { useState, useEffect } from 'react'
import CommissionTracker from '@/components/CommissionTracker'
import LandingPage from '@/components/LandingPage'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('commissionTrackerUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple demo auth - in production use proper auth (Firebase, Clerk, etc)
    if (email && password.length >= 6) {
      const userData = { email, name: email.split('@')[0] }
      localStorage.setItem('commissionTrackerUser', JSON.stringify(userData))
      setUser(userData)
      setIsLoggedIn(true)
      setEmail('')
      setPassword('')
      setShowLogin(false)
    } else {
      alert('Please enter valid email and password (min 6 chars)')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('commissionTrackerUser')
    localStorage.removeItem('commissionTrackerData')
    setIsLoggedIn(false)
    setUser(null)
  }

  if (isLoggedIn) {
    return (
      <div>
        <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>Welcome, {user?.name}! 👋</h2>
          </div>
          <button
            onClick={handleLogout}
            style={{ padding: '8px 16px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}
          >
            Logout
          </button>
        </div>
        <CommissionTracker />
      </div>
    )
  }

  return (
    <div>
      {!showLogin && <LandingPage onGetStarted={() => setShowLogin(true)} />}
      
      {showLogin && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px rgba(0,0,0,0.15)' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '24px', fontWeight: 700 }}>Get Started</h2>
            
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
                  required
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (min 6 chars)"
                  style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
                  required
                />
              </div>

              <button
                type="submit"
                style={{ width: '100%', padding: '12px', background: '#1D9E75', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', marginBottom: '12px' }}
              >
                Start Free Trial
              </button>

              <button
                type="button"
                onClick={() => setShowLogin(false)}
                style={{ width: '100%', padding: '12px', background: '#f3f4f6', color: '#1a1a1a', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
              >
                Back
              </button>
            </form>

            <p style={{ marginTop: '1rem', fontSize: '12px', color: '#666', textAlign: 'center' }}>
              ✓ 30-day free trial • No credit card required
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
