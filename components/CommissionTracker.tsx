'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function CommissionTracker() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [products, setProducts] = useState([])
  const [videos, setVideos] = useState([])
  const [hooks, setHooks] = useState([])
  const [tests, setTests] = useState([])
  const [monthly, setMonthly] = useState([])
  
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showAddVideo, setShowAddVideo] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', rate: '', status: 'active' })
  const [newVideo, setNewVideo] = useState({ description: '', views: '', product: '', hook: '' })

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('commissionTrackerData')
    if (saved) {
      const data = JSON.parse(saved)
      setProducts(data.products || [])
      setVideos(data.videos || [])
      setHooks(data.hooks || [])
      setTests(data.tests || [])
      setMonthly(data.monthly || [])
    } else {
      // Sample data
      setProducts([
        { id: 1, name: 'SavageX App', rate: 15, status: 'active', category: 'Beauty' },
        { id: 2, name: 'Influenergy', rate: 20, status: 'active', category: 'Health' },
        { id: 3, name: 'Notion Plus', rate: 10, status: 'active', category: 'Tech' },
      ])
      setVideos([
        { id: 1, description: 'POV: Testing viral app trend', views: 145000, product: 1, commission: 2175 },
        { id: 2, description: 'Influenergy drink challenge', views: 89500, product: 2, commission: 1790 },
        { id: 3, description: 'Notion template tour', views: 34200, product: 3, commission: 342 },
      ])
      setHooks([
        { id: 1, type: 'Testimonial', text: "I didn't believe it would work until...", category: 'Beauty', views: 125000 },
        { id: 2, type: 'Urgency', text: 'Only 48 hours left to...', category: 'Multi', views: 98000 },
      ])
      setTests([
        { id: 1, product: 1, rating: 5, again: 'Yes', angle: 'Focus on aesthetic appeal' },
        { id: 2, product: 2, rating: 4, again: 'Yes', angle: 'Energy benefits' },
      ])
      setMonthly([
        { month: 'May 2024', videos: 18, views: 324000, commission: 3840, growth: 23 },
        { month: 'June 2024', videos: 22, views: 445000, commission: 5280, growth: 37 },
      ])
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (products.length > 0 || videos.length > 0) {
      localStorage.setItem('commissionTrackerData', JSON.stringify({
        products, videos, hooks, tests, monthly
      }))
    }
  }, [products, videos, hooks, tests, monthly])

  const addProduct = () => {
    if (newProduct.name && newProduct.rate) {
      setProducts([...products, {
        id: Date.now(),
        ...newProduct,
        rate: parseFloat(newProduct.rate)
      }])
      setNewProduct({ name: '', rate: '', status: 'active' })
      setShowAddProduct(false)
    }
  }

  const addVideo = () => {
    if (newVideo.description && newVideo.views && newVideo.product) {
      const product = products.find(p => p.id === parseInt(newVideo.product))
      const commission = (parseInt(newVideo.views) * product.rate) / 100
      setVideos([...videos, {
        id: Date.now(),
        ...newVideo,
        views: parseInt(newVideo.views),
        commission: Math.round(commission)
      }])
      setNewVideo({ description: '', views: '', product: '', hook: '' })
      setShowAddVideo(false)
    }
  }

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const deleteVideo = (id: number) => {
    setVideos(videos.filter(v => v.id !== id))
  }

  // Calculate totals
  const totalViews = videos.reduce((sum, v) => sum + v.views, 0)
  const totalCommission = videos.reduce((sum, v) => sum + (v.views * (products.find(p => p.id === v.product)?.rate || 0)) / 100, 0)
  const avgPerVideo = videos.length > 0 ? totalCommission / videos.length : 0

  // Chart data
  const productEarnings = products.map(p => ({
    name: p.name,
    earnings: Math.round(videos.filter(v => v.product === p.id).reduce((sum, v) => sum + (v.views * p.rate) / 100, 0))
  })).filter(p => p.earnings > 0)

  const monthlyData = monthly.map(m => ({
    month: m.month.split(' ')[0],
    commission: m.commission,
    views: m.views / 1000
  }))

  const COLORS = ['#1D9E75', '#378ADD', '#D85A30', '#534AB7', '#BA7517']

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 700, margin: 0, color: '#1a1a1a' }}>
              💰 Commission Tracker
            </h1>
            <button 
              onClick={() => {
                const data = JSON.stringify({ products, videos, hooks, tests, monthly }, null, 2)
                const blob = new Blob([data], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'tracker-export.json'
                a.click()
              }}
              style={{ padding: '8px 16px', background: '#1D9E75', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}
            >
              📥 Export Data
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e5e7eb', paddingBottom: '0', overflowX: 'auto' }}>
            {['dashboard', 'products', 'videos', 'hooks', 'monthly'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 16px',
                  border: 'none',
                  background: activeTab === tab ? '#fff' : 'transparent',
                  borderBottom: activeTab === tab ? '2px solid #1D9E75' : '2px solid transparent',
                  color: activeTab === tab ? '#1a1a1a' : '#666',
                  fontWeight: activeTab === tab ? 600 : 500,
                  cursor: 'pointer',
                  fontSize: '14px',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab === 'dashboard' && '📊 Dashboard'}
                {tab === 'products' && '🛍️ Products'}
                {tab === 'videos' && '📹 Videos'}
                {tab === 'hooks' && '🎣 Hooks'}
                {tab === 'monthly' && '📅 Monthly'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div>
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '2rem' }}>
              <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>Total Videos</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a1a' }}>{videos.length}</div>
              </div>
              <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>Total Views</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a1a' }}>{(totalViews / 1000).toFixed(0)}K</div>
              </div>
              <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>Total Earned</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#1D9E75' }}>${Math.round(totalCommission)}</div>
              </div>
              <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>Avg per Video</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#378ADD' }}>${Math.round(avgPerVideo)}</div>
              </div>
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem' }}>
              <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <h3 style={{ margin: '0 0 1rem', color: '#1a1a1a', fontSize: '16px', fontWeight: 600 }}>Earnings by Product</h3>
                {productEarnings.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={productEarnings}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip formatter={(v) => `$${v}`} />
                      <Bar dataKey="earnings" fill="#1D9E75" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                    Add products and videos to see chart
                  </div>
                )}
              </div>

              <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <h3 style={{ margin: '0 0 1rem', color: '#1a1a1a', fontSize: '16px', fontWeight: 600 }}>Monthly Trend</h3>
                {monthlyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip formatter={(v) => `$${v}`} />
                      <Line type="monotone" dataKey="commission" stroke="#1D9E75" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                    Add monthly data to see chart
                  </div>
                )}
              </div>
            </div>

            {/* Top Videos Table */}
            <div style={{ marginTop: '2rem', background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: '0 0 1.5rem', color: '#1a1a1a', fontSize: '16px', fontWeight: 600 }}>Top 5 Videos</h3>
              {videos.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                        <th style={{ textAlign: 'left', padding: '12px', color: '#666', fontWeight: 600 }}>Video</th>
                        <th style={{ textAlign: 'right', padding: '12px', color: '#666', fontWeight: 600 }}>Views</th>
                        <th style={{ textAlign: 'right', padding: '12px', color: '#666', fontWeight: 600 }}>Earned</th>
                      </tr>
                    </thead>
                    <tbody>
                      {videos.sort((a, b) => b.views - a.views).slice(0, 5).map(video => {
                        const product = products.find(p => p.id === video.product)
                        return (
                          <tr key={video.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                            <td style={{ padding: '12px', color: '#1a1a1a' }}>{video.description.substring(0, 30)}...</td>
                            <td style={{ textAlign: 'right', padding: '12px', color: '#666' }}>{(video.views / 1000).toFixed(0)}K</td>
                            <td style={{ textAlign: 'right', padding: '12px', color: '#1D9E75', fontWeight: 600 }}>${Math.round((video.views * product.rate) / 100)}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ color: '#999', textAlign: 'center', padding: '2rem' }}>No videos yet. Add one to get started!</div>
              )}
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div>
            <button
              onClick={() => setShowAddProduct(!showAddProduct)}
              style={{ marginBottom: '1.5rem', padding: '10px 16px', background: '#378ADD', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
            >
              + Add Product
            </button>

            {showAddProduct && (
              <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <input
                    type="text"
                    placeholder="Product name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
                  />
                  <input
                    type="number"
                    placeholder="Commission rate %"
                    value={newProduct.rate}
                    onChange={(e) => setNewProduct({ ...newProduct, rate: e.target.value })}
                    style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
                  />
                  <select
                    value={newProduct.status}
                    onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
                    style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="testing">Testing</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={addProduct}
                    style={{ padding: '10px 16px', background: '#1D9E75', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddProduct(false)}
                    style={{ padding: '10px 16px', background: '#e5e7eb', color: '#1a1a1a', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gap: '12px' }}>
              {products.map(product => {
                const earnings = Math.round(videos.filter(v => v.product === product.id).reduce((sum, v) => sum + (v.views * product.rate) / 100, 0))
                const videoCount = videos.filter(v => v.product === product.id).length
                return (
                  <div key={product.id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 8px', color: '#1a1a1a', fontSize: '16px', fontWeight: 600 }}>{product.name}</h3>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '14px', color: '#666' }}>
                        <span>{product.rate}% commission</span>
                        <span>{videoCount} videos</span>
                        <span style={{ color: '#1D9E75', fontWeight: 600 }}>${earnings} earned</span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      style={{ padding: '8px 12px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                    >
                      Delete
                    </button>
                  </div>
                )
              })}
              {products.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
                  No products yet. Add one to get started!
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIDEOS TAB */}
        {activeTab === 'videos' && (
          <div>
            <button
              onClick={() => setShowAddVideo(!showAddVideo)}
              style={{ marginBottom: '1.5rem', padding: '10px 16px', background: '#378ADD', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
            >
              + Add Video
            </button>

            {showAddVideo && (
              <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <input
                    type="text"
                    placeholder="Video description"
                    value={newVideo.description}
                    onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                    style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
                  />
                  <input
                    type="number"
                    placeholder="Views"
                    value={newVideo.views}
                    onChange={(e) => setNewVideo({ ...newVideo, views: e.target.value })}
                    style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
                  />
                  <select
                    value={newVideo.product}
                    onChange={(e) => setNewVideo({ ...newVideo, product: e.target.value })}
                    style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
                  >
                    <option value="">Select product</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={addVideo}
                    style={{ padding: '10px 16px', background: '#1D9E75', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddVideo(false)}
                    style={{ padding: '10px 16px', background: '#e5e7eb', color: '#1a1a1a', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {videos.length > 0 ? (
              <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb', background: '#f9fafb' }}>
                      <th style={{ textAlign: 'left', padding: '12px', color: '#666', fontWeight: 600 }}>Description</th>
                      <th style={{ textAlign: 'right', padding: '12px', color: '#666', fontWeight: 600 }}>Views</th>
                      <th style={{ textAlign: 'left', padding: '12px', color: '#666', fontWeight: 600 }}>Product</th>
                      <th style={{ textAlign: 'right', padding: '12px', color: '#666', fontWeight: 600 }}>Earned</th>
                      <th style={{ textAlign: 'center', padding: '12px', color: '#666', fontWeight: 600 }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videos.map(video => {
                      const product = products.find(p => p.id === video.product)
                      return (
                        <tr key={video.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '12px', color: '#1a1a1a' }}>{video.description}</td>
                          <td style={{ textAlign: 'right', padding: '12px', color: '#666' }}>{(video.views / 1000).toFixed(0)}K</td>
                          <td style={{ padding: '12px', color: '#666' }}>{product?.name}</td>
                          <td style={{ textAlign: 'right', padding: '12px', color: '#1D9E75', fontWeight: 600 }}>${Math.round((video.views * product.rate) / 100)}</td>
                          <td style={{ textAlign: 'center', padding: '12px' }}>
                            <button
                              onClick={() => deleteVideo(video.id)}
                              style={{ padding: '4px 8px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#999', background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                No videos yet. Add one to start tracking!
              </div>
            )}
          </div>
        )}

        {/* HOOKS TAB */}
        {activeTab === 'hooks' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {hooks.map(hook => (
                <div key={hook.id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ display: 'inline-block', background: '#dbeafe', color: '#0c447c', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>
                      {hook.type}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 12px', color: '#1a1a1a', fontSize: '14px', lineHeight: 1.5 }}>"{hook.text}"</p>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    <div>Category: {hook.category}</div>
                    <div style={{ color: '#1D9E75', fontWeight: 600, marginTop: '4px' }}>Avg views: {(hook.views / 1000).toFixed(0)}K</div>
                  </div>
                </div>
              ))}
            </div>
            {hooks.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
                No hooks saved yet.
              </div>
            )}
          </div>
        )}

        {/* MONTHLY TAB */}
        {activeTab === 'monthly' && (
          <div>
            {monthly.length > 0 ? (
              <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb', background: '#f9fafb' }}>
                      <th style={{ textAlign: 'left', padding: '12px', color: '#666', fontWeight: 600 }}>Month</th>
                      <th style={{ textAlign: 'right', padding: '12px', color: '#666', fontWeight: 600 }}>Videos</th>
                      <th style={{ textAlign: 'right', padding: '12px', color: '#666', fontWeight: 600 }}>Views</th>
                      <th style={{ textAlign: 'right', padding: '12px', color: '#666', fontWeight: 600 }}>Commission</th>
                      <th style={{ textAlign: 'right', padding: '12px', color: '#666', fontWeight: 600 }}>Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthly.map((m, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px', color: '#1a1a1a', fontWeight: 600 }}>{m.month}</td>
                        <td style={{ textAlign: 'right', padding: '12px', color: '#666' }}>{m.videos}</td>
                        <td style={{ textAlign: 'right', padding: '12px', color: '#666' }}>{(m.views / 1000).toFixed(0)}K</td>
                        <td style={{ textAlign: 'right', padding: '12px', color: '#1D9E75', fontWeight: 600 }}>${m.commission}</td>
                        <td style={{ textAlign: 'right', padding: '12px', color: m.growth > 0 ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
                          {m.growth > 0 ? '↑' : '↓'} {Math.abs(m.growth)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#999', background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                No monthly data yet.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
