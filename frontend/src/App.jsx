import { useState, useEffect } from 'react'

function App() {
  const [status, setStatus] = useState('Checking...')
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({ username: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/health')
      const data = await res.json()
      setStatus(data.status)
    } catch (err) {
      setStatus('error')
    }
  }

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      if (res.ok) {
        setUsers(data)
      }
    } catch (err) {
      console.error('Error fetching users:', err)
    }
  }

  useEffect(() => {
    fetchStatus()
    fetchUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      
      if (res.ok) {
        setFormData({ username: '', email: '' })
        fetchUsers() // Refresh list
      } else {
        setErrorMsg(data.error || 'Failed to create user')
      }
    } catch (err) {
      setErrorMsg('Error connecting to server')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchUsers() // Refresh list
      } else {
        console.error('Failed to delete user')
      }
    } catch (err) {
      console.error('Error connecting to server', err)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="dashboard-container">
      {/* Header Widget */}
      <header className="glass-card header">
        <h1>🚀 CI/CD Microservices Dashboard</h1>
        <div className="status-badge">
          <span className={`status-dot ${status === 'healthy' ? 'healthy' : status === 'error' ? 'error' : 'checking'}`}></span>
          Backend: {status === 'healthy' ? 'Healthy' : status === 'error' ? 'Offline' : 'Connecting...'}
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="grid-content">
        
        {/* Left Column: Create User Form */}
        <section>
          <form className="glass-card" onSubmit={handleSubmit}>
            <h2>Create User</h2>
            
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>

            {errorMsg && <div className="error-msg">{errorMsg}</div>}
            
            <button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Add User'}
            </button>
          </form>
        </section>

        {/* Right Column: User Data Table */}
        <section className="glass-card table-section">
          <h2>Active Users</h2>
          <div className="table-container">
            {users.length === 0 ? (
              <div className="empty-state">No users found. Create one to get started!</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>#{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <button 
                          className="btn-danger" 
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

      </main>
    </div>
  )
}

export default App
