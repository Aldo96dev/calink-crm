import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('calink_auth')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setUser(parsed.user || null)
        setToken(parsed.token || null)
      } catch {}
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {/*
    const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
    const res = await fetch(`${base}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || 'Credenciales inválidas')
    }
    const data = await res.json()
    setUser(data.user)
    setToken(data.token)
    localStorage.setItem('calink_auth', JSON.stringify({ user: data.user, token: data.token }))
    return data.user*/

     try {
    const url = import.meta.env.VITE_API_BASE_URL || '/api/auth/login'
    const respuesta = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email, password }), // 👈 parámetros a enviar
      headers: {
        'Content-Type': 'application/json'
      },
    })

    if (!respuesta.ok) {
      // si hubo error en la API, lanzo mensaje personalizado
      const err = await respuesta.json().catch(() => ({}))
      throw new Error(err.message || 'Credenciales inválidas')
    }

    // si todo salió bien
    const data = await respuesta.json()
    console.log("Respuesta login:", data)

    // guardar en estado y localStorage
    setUser(data.user)
    setToken(data.token)
    localStorage.setItem('calink_auth', JSON.stringify({ user: data.user, token: data.token }))

    return data.user
  } catch (error) {
    console.error("Error en login:", error)
    throw error // 👈 re-lanzo el error para que el componente Login.jsx pueda mostrarlo
  }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('calink_auth')
  }

  const value = useMemo(() => ({ user, token, login, logout, loading }), [user, token, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
