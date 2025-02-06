import React, { useEffect, useState } from 'react'
import Spiner from '../../components/modals/Spiner'
import userLogic from '../../functions/logic/userLogic'
import { useSearchParams } from 'react-router-dom'

export default function OrderRastreo() {
    const [load, setLoad] = useState(false)
    const [searchParams] = useSearchParams()
    const order = searchParams.get('orden')
    const [trackingStates, setTrackingStates] = useState([])
    const [noOrderFound, setNoOrderFound] = useState(false) // Estado para manejar el mensaje de error

    useEffect(() => {
        setLoad(true)
        getRastreo(order)
        setLoad(false)
    }, [order])

    const getRastreo = async (order) => {
        const token = localStorage.getItem('authToken')
        let dataResp = []
        const isLoggedIn = !!token
        if (isLoggedIn) {
            dataResp = await userLogic.getRastreoLogic(order)
            if (!dataResp.data || (Array.isArray(dataResp.data) && dataResp.data.length === 0)) {
                setNoOrderFound(true)
                setTrackingStates([])
            } else {
                setTrackingStates(Array.isArray(dataResp.data) ? dataResp.data : [dataResp.data])
                setNoOrderFound(false)
            }
        } else {
            setNoOrderFound(true)
            setTrackingStates([])
        }
    }

    return (
        <main className="rastreo-main">
            <Spiner opt={load} />
            <div className="rastreo-container summary">
                <h2 className="rastreo-title">Rastreo de Orden #{order}</h2>

                {noOrderFound ? (
                    <div className="rastreo-error">
                        <p>No existe información para el número de orden ingresado. Verifique el número e intente nuevamente o inicie sesión para poder consultar sus rastreos.</p>
                    </div>
                ) : (
                    <div className="rastreo-timeline">
                        {trackingStates.map((state, index) => (
                            <div key={index} className="rastreo-timeline-item">
                                <div className="rastreo-timeline-icon">
                                    {state.completado ? (
                                        <span className="rastreo-icon-circle rastreo-icon-completed"></span>
                                    ) : (
                                        <span className="rastreo-icon-circle rastreo-icon-pending"></span>
                                    )}
                                </div>

                                <div className="rastreo-table-container">
                                    <table className="rastreo-table">
                                        <thead>
                                            <tr>
                                                <th>Estado</th>
                                                <th>Descripción</th>
                                                <th>Notas</th>
                                                <th>Fecha de inicio</th>
                                                <th>Fecha de Finalización</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{state.nombre2 || 'Estado desconocido'}</td>
                                                <td>{state.descripcion || 'Sin descripción'}</td>
                                                <td>{state.notas || 'Sin notas'}</td>
                                                <td>{state.fecha || 'En espera...'}</td>
                                                <td>{state.fecha_finalizacion || 'En espera'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
