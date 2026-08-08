'use client'

interface LandingPageProps {
  onGetStarted: () => void
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header/Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1D9E75 0%, #378ADD 100%)', color: '#fff', padding: '120px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '56px', fontWeight: 700, marginBottom: '20px', lineHeight: 1.2 }}>
          💰 Commission Tracker
        </h1>
        <p style={{ fontSize: '24px', marginBottom: '40px', opacity: 0.95, lineHeight: 1.4 }}>
          Real-time affiliate earnings dashboard built for creators
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onGetStarted}
            style={{
              background: '#fff',
              color: '#1D9E75',
              padding: '16px 40px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Start Free Trial
          </button>
          <button
            onClick={() => window.open('https://www.youtube.com/embed/dQw4w9WgXcQ', '_blank')}
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              padding: '16px 40px',
              border: '2px solid #fff',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Watch Demo
          </button>
        </div>
        <p style={{ marginTop: '24px', opacity: 0.8, fontSize: '14px' }}>
          ✓ 30-day free trial • No credit card required • Cancel anytime
        </p>
      </div>

      {/* Features */}
      <div style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 700, textAlign: 'center', marginBottom: '60px', color: '#1a1a1a' }}>
          Why creators love Commission Tracker
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#1a1a1a' }}>Real-time Dashboard</h3>
            <p style={{ color: '#666', lineHeight: 1.6 }}>
              See your earnings update instantly. No more waiting for weekly reports or manual Excel updates.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#1a1a1a' }}>Track by Product</h3>
            <p style={{ color: '#666', lineHeight: 1.6 }}>
              Know exactly which products make you money. Identify winners instantly and double down.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📈</div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#1a1a1a' }}>Monthly Reports</h3>
            <p style={{ color: '#666', lineHeight: 1.6 }}>
              Track growth trends, spot patterns, and prove ROI to sponsors with beautiful reports.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎣</div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#1a1a1a' }}>Hook Swipe File</h3>
            <p style={{ color: '#666', lineHeight: 1.6 }}>
              Save and organize hooks that work. Reuse winners. Track performance over time.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📥</div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#1a1a1a' }}>Export Data</h3>
            <p style={{ color: '#666', lineHeight: 1.6 }}>
              Your data is yours. Export as JSON, CSV, or PDF anytime. No vendor lock-in.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚡</div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#1a1a1a' }}>Dead Simple Setup</h3>
            <p style={{ color: '#666', lineHeight: 1.6 }}>
              Add products in seconds. No spreadsheets. No complex setup. Start tracking instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ background: '#f9fafb', padding: '80px 20px', marginTop: '80px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 700, textAlign: 'center', marginBottom: '60px', color: '#1a1a1a' }}>
            Loved by creators worldwide
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
              <div style={{ marginBottom: '16px' }}>⭐⭐⭐⭐⭐</div>
              <p style={{ marginBottom: '16px', color: '#1a1a1a', fontStyle: 'italic' }}>
                "This saved me literally hours every month. I can finally see which products are worth my time."
              </p>
              <p style={{ fontWeight: 700, color: '#1a1a1a' }}>Sarah K.</p>
              <p style={{ color: '#666', fontSize: '14px' }}>TikTok creator, 500K followers</p>
            </div>

            <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
              <div style={{ marginBottom: '16px' }}>⭐⭐⭐⭐⭐</div>
              <p style={{ marginBottom: '16px', color: '#1a1a1a', fontStyle: 'italic' }}>
                "The dashboard is beautiful and the data export feature means I can analyze anything I want."
              </p>
              <p style={{ fontWeight: 700, color: '#1a1a1a' }}>Marcus D.</p>
              <p style={{ color: '#666', fontSize: '14px' }}>YouTube creator, 1M subscribers</p>
            </div>

            <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
              <div style={{ marginBottom: '16px' }}>⭐⭐⭐⭐⭐</div>
              <p style={{ marginBottom: '16px', color: '#1a1a1a', fontStyle: 'italic' }}>
                "Worth every penny. I'm now negotiating higher commissions with data to back it up."
              </p>
              <p style={{ fontWeight: 700, color: '#1a1a1a' }}>Jessica L.</p>
              <p style={{ color: '#666', fontSize: '14px' }}>Instagram influencer, 250K followers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 700, textAlign: 'center', marginBottom: '60px', color: '#1a1a1a' }}>
          Simple, transparent pricing
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          {/* Starter */}
          <div style={{ background: '#fff', padding: '40px 32px', borderRadius: '12px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#1a1a1a' }}>Starter</h3>
            <p style={{ color: '#666', marginBottom: '24px' }}>Perfect to get started</p>
            <div style={{ fontSize: '48px', fontWeight: 700, color: '#1D9E75', marginBottom: '8px' }}>$9<span style={{ fontSize: '20px', color: '#666', fontWeight: 400 }}>/month</span></div>
            
            <ul style={{ listStyle: 'none', marginBottom: '32px', flex: 1 }}>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #e5e7eb', color: '#666' }}>✓ 10 products</li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #e5e7eb', color: '#666' }}>✓ 100 videos</li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #e5e7eb', color: '#666' }}>✓ Basic dashboard</li>
              <li style={{ padding: '12px 0', color: '#666' }}>✓ Email support</li>
            </ul>

            <button
              onClick={onGetStarted}
              style={{ width: '100%', padding: '14px', background: '#f3f4f6', color: '#1a1a1a', border: '1px solid #e5e7eb', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}
            >
              Start Free Trial
            </button>
          </div>

          {/* Growth - Featured */}
          <div style={{ background: '#fff', padding: '40px 32px', borderRadius: '12px', border: '2px solid #1D9E75', display: 'flex', flexDirection: 'column', transform: 'scale(1.05)', transformOrigin: 'center' }}>
            <div style={{ background: '#e1f5ee', color: '#0F6E56', padding: '8px 16px', borderRadius: '20px', display: 'inline-block', width: 'fit-content', fontSize: '12px', fontWeight: 700, marginBottom: '12px' }}>
              MOST POPULAR
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#1a1a1a' }}>Growth</h3>
            <p style={{ color: '#666', marginBottom: '24px' }}>For serious creators</p>
            <div style={{ fontSize: '48px', fontWeight: 700, color: '#1D9E75', marginBottom: '8px' }}>$29<span style={{ fontSize: '20px', color: '#666', fontWeight: 400 }}>/month</span></div>
            
            <ul style={{ listStyle: 'none', marginBottom: '32px', flex: 1 }}>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #e5e7eb', color: '#666' }}>✓ Unlimited products</li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #e5e7eb', color: '#666' }}>✓ Unlimited videos</li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #e5e7eb', color: '#666' }}>✓ Advanced analytics</li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #e5e7eb', color: '#666' }}>✓ Export as CSV/JSON</li>
              <li style={{ padding: '12px 0', color: '#666' }}>✓ Priority support</li>
            </ul>

            <button
              onClick={onGetStarted}
              style={{ width: '100%', padding: '14px', background: '#1D9E75', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}
            >
              Start Free Trial
            </button>
          </div>

          {/* Agency */}
          <div style={{ background: '#fff', padding: '40px 32px', borderRadius: '12px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#1a1a1a' }}>Agency</h3>
            <p style={{ color: '#666', marginBottom: '24px' }}>For teams & agencies</p>
            <div style={{ fontSize: '48px', fontWeight: 700, color: '#1D9E75', marginBottom: '8px' }}>$99<span style={{ fontSize: '20px', color: '#666', fontWeight: 400 }}>/month</span></div>
            
            <ul style={{ listStyle: 'none', marginBottom: '32px', flex: 1 }}>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #e5e7eb', color: '#666' }}>✓ Everything in Growth</li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #e5e7eb', color: '#666' }}>✓ Team access (5 users)</li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #e5e7eb', color: '#666' }}>✓ API access</li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid #e5e7eb', color: '#666' }}>✓ Custom integrations</li>
              <li style={{ padding: '12px 0', color: '#666' }}>✓ Dedicated support</li>
            </ul>

            <button
              onClick={onGetStarted}
              style={{ width: '100%', padding: '14px', background: '#f3f4f6', color: '#1a1a1a', border: '1px solid #e5e7eb', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}
            >
              Start Free Trial
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>
          <p>All plans include 30-day free trial. No credit card required. Cancel anytime.</p>
          <p style={{ marginTop: '8px' }}>Questions? <a href="mailto:support@commissiontracker.app" style={{ color: '#1D9E75', textDecoration: 'none', fontWeight: 600 }}>Email support</a></p>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ background: 'linear-gradient(135deg, #1D9E75 0%, #378ADD 100%)', color: '#fff', padding: '80px 20px', textAlign: 'center', marginTop: '80px' }}>
        <h2 style={{ fontSize: '40px', fontWeight: 700, marginBottom: '24px' }}>
          Ready to track your earnings?
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.95 }}>
          Join 1000+ creators earning smarter with Commission Tracker
        </p>
        <button
          onClick={onGetStarted}
          style={{
            background: '#fff',
            color: '#1D9E75',
            padding: '16px 48px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Start Free Trial Today
        </button>
      </div>

      {/* Footer */}
      <div style={{ background: '#1a1a1a', color: '#fff', padding: '40px 20px', textAlign: 'center', fontSize: '14px' }}>
        <p style={{ marginBottom: '16px' }}>© 2024 Commission Tracker. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Terms of Service</a>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a>
        </div>
      </div>
    </div>
  )
}
