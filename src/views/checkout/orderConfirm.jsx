import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import Spiner from '../../components/modals/Spiner'

const decryptId = (encryptedId) => {
    const base64 = encryptedId.replace(/-/g, '+').replace(/_/g, '/') + '==' // Decodifica la id
    const bytes = CryptoJS.AES.decrypt(base64, 'secret-key')
    return bytes.toString(CryptoJS.enc.Utf8)
}

export default function OrderConfirm() {
    const { id } = useParams()
    const [orderId, setOrderId] = useState(null)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true)
        const decryptedId = decryptId(id)
        setOrderId(decryptedId)
        alert(load)
        setLoad(false)
    }, [id])


    return (
        <main className="main">
            <Spiner opt={load} />
            <br />
            <div className="page-content">
                <div className="container">
                    <div className="product-details-top">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="product-gallery product-gallery-vertical">
                                    <div className="row">
                                        {orderId}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resto del código (tabs y detalles adicionales) */}
                </div>
            </div>
        </main>
    )
}

