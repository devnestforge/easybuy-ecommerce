import React, { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js'
import Spiner from '../../components/modals/Spiner'
import { useSearchParams } from 'react-router-dom';

/*const decryptId = (encryptedId) => {
    const base64 = encryptedId.replace(/-/g, '+').replace(/_/g, '/') + '==' // Decodifica la id
    const bytes = CryptoJS.AES.decrypt(base64, 'secret-key')
    return bytes.toString(CryptoJS.enc.Utf8)
}*/

export default function OrderRastreo() {

    const [load, setLoad] = useState(false)
    const [searchParams] = useSearchParams();
    const order = searchParams.get('order');
    const [trackingStates, setTrackingStates] = useState([
        { estado: 'Pendiente', fecha: '2025-01-01', completado: true },
        { estado: 'Procesando', fecha: '2025-01-02', completado: true },
        { estado: 'Enviado', fecha: '2025-01-03', completado: false },
        { estado: 'Entregado', fecha: '', completado: false },
    ]);
    const [orderId, setOrderId] = useState('123456789');

    useEffect(() => {
        setLoad(true)
        /*const decryptedId = decryptId(id)
        console.log(id)
        setOrderId(decryptedId)
        alert(load)*/
        const token = localStorage.getItem('authToken')
        const isLoggedIn = !!token
        if (!isLoggedIn) {
            window.location.href = global.HOME;
        }
        setLoad(false)
    }, [])


    return (
        <main className="rastreo-main">
        <div className="rastreo-container">
            <h2 className="rastreo-title">Rastreo de Orden #{orderId}</h2>

            <div className="rastreo-timeline">
                {trackingStates.map((state, index) => (
                    <div
                        key={index}
                        className={`rastreo-timeline-item ${state.completado ? 'rastreo-completed' : ''}`}
                    >
                        <div className="rastreo-timeline-icon">
                            {state.completado ? (
                                <span className="rastreo-icon-circle rastreo-icon-completed"></span>
                            ) : (
                                <span className="rastreo-icon-circle rastreo-icon-pending"></span>
                            )}
                        </div>
                        <div className="rastreo-timeline-content">
                            <h4 className="rastreo-state">{state.estado}</h4>
                            <p className="rastreo-date">{state.fecha || 'En espera...'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </main>
    )
}

