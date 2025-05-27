import React, { createContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import userLogic from '../logic/userLogic'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('authToken')

            if (!token) return

            try {
                const userInfo = await userLogic.getUserProfileInfoLogic(token)
                const data = userInfo?.data?.data?.[0] || {}

                const isIncomplete = [
                    data.identification,
                    data.nombres,
                    data.apellidos,
                    data.direction,
                    data.phone,
                    data.gender,
                    data.provincia_id,
                    data.parroquia_id,
                    data.fecha_nacimiento,
                ].some((v) => !v)

                const excludedPaths = ['/perfil', '/cambiar-credenciales']

                const isExcludedPath = excludedPaths.some(path => location.pathname.startsWith(path))

                if (isIncomplete && !isExcludedPath) {
                    navigate('/perfil')
                }

                setUserData({
                    identificacion: data.identification || '',
                    nombres: data.nombres || '',
                    apellidos: data.apellidos || '',
                    direccion: data.direction || '',
                    cellPhone: data.phone || '',
                    gender: data.gender || '',
                    provincia: data.provincia_id || '',
                    ciudad: data.parroquia_id?.toString() || '',
                    email: data.email || '',
                    fechaNaci: data.fecha_nacimiento?.split(' ')[0] || '',
                })
            } catch (err) {
                console.error('Error cargando perfil:', err)
            }
        }

        fetchUserData()
    }, [location.pathname])

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    )
}
