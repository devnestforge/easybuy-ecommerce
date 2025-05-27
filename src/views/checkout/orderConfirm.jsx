import React, { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js'
import Spiner from '../../components/modals/Spiner'
import { useSearchParams } from 'react-router-dom'

/*const decryptId = (encryptedId) => {
    const base64 = encryptedId.replace(/-/g, '+').replace(/_/g, '/') + '==' // Decodifica la id
    const bytes = CryptoJS.AES.decrypt(base64, 'secret-key')
    return bytes.toString(CryptoJS.enc.Utf8)
}*/

export default function OrderConfirm() {
    const [searchParams] = useSearchParams()
    const order = searchParams.get('orden')
    const [spiner, setSpiner] = useState(false)

    useEffect(() => {
        setSpiner(true)
        const token = localStorage.getItem('authToken')
        const isLoggedIn = !!token
        if (!isLoggedIn) {
            window.location.href = global.HOME
        }
        setSpiner(false)
    }, [])


    return (
        <main className="main">
            <Spiner opt={spiner} />
            <br />
            <div className="container">
                <div className="page-content pb-0">
                    <div className="container summary">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center">
                                <h2 className="title mb-2">Gracias por tu compra</h2>
                                <p className="mb-4">
                                    Tu pedido ha sido realizado con éxito. Este es tu número de pedido:
                                </p>
                                <h3 className="mb-4 text-primary">Orden #{order}</h3>
                                <p className="mb-4">
                                    Puedes ver los detalles de tu pedido o seguir comprando haciendo clic en los botones de abajo:
                                </p>
                                <a href={global.ORDERDETAIL + '?orden=' + order} target='_Blank' className="btn btn-primary btn-minwidth-sm">
                                    <span>Detalle de la orden</span>
                                    <i className="icon-long-arrow-right"></i>
                                </a>
                                <a href={global.ORDERCRASTREO + '?orden=' + order} target='_Blank' className="btn btn-primary btn-minwidth-sm ml-2">
                                    <span>Rastreo</span>
                                    <i className="icon-long-arrow-right"></i>
                                </a>
                            </div>
                        </div>

                        <hr className="mt-5 mb-5" />
                    </div>
                </div>
            </div>

        </main>
    )
}

