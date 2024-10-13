import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

// routes config
import routes from '../Routes/Routes'

const AppContent = () => {
    return (
        <main className="main">
            <Routes>
                {routes.map((route, idx) => {
                    return (
                        route.element && (
                            <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                element={<route.element />}
                            />
                        )
                    )
                })}
                <Route path="/" element={<Navigate to="home" replace />} />
            </Routes>
        </main>
    )
}

export default React.memo(AppContent)
