import React, { useState, useEffect } from 'react'
import Spiner from '../../components/modals/Spiner'
import userLogic from '../../functions/logic/userLogic'

export default function HistorialPedidos() {
    const [spiner, setSpiner] = useState(false)
    const [orders, setOrders] = useState([])
    const [totalPaginas, setTotalPaginas] = useState([])

    useEffect(() => {

        const token = localStorage.getItem('authToken')
        const isLoggedIn = !!token
        if (!isLoggedIn) {
            window.location.href = global.HOME
        }
        getHistoryOrders()
    }, [])

    const getHistoryOrders = async () => {
        setSpiner(true)
        const orderResp = await userLogic.getHistoryOrdersLogic()
        if (orderResp.success && orderResp.data.data.length > 0) {
            setOrders(orderResp.data.data)
        }
        setSpiner(false)
    }

    const pedidosPorPagina = 5
    const [paginaActual, setPaginaActual] = useState(1)

    const indiceUltimoPedido = paginaActual * pedidosPorPagina
    const indicePrimerPedido = indiceUltimoPedido - pedidosPorPagina
    const pedidosPaginados = orders.slice(indicePrimerPedido, indiceUltimoPedido)

    useEffect(() => {
        setTotalPaginas(Math.ceil(orders.length / pedidosPorPagina));
    }, [orders.length])

    const cambiarPagina = (pagina) => {
        setPaginaActual(pagina)
    }

    const [acordeonActivo, setAcordeonActivo] = useState(orders[0]?.id || null)

    const toggleAcordeon = (id) => {
        setAcordeonActivo(acordeonActivo === id ? null : id)
    }

    return (
        <div className="container">
            <Spiner opt={spiner} />
            <div className="page-content mt-2 summary">
                <h4 className="text-center mb-4">Historial de Pedidos</h4>
                {pedidosPaginados.length === 0 ? (
                    <p className="text-center">No tienes pedidos en tu historial.</p>
                ) : (
                    pedidosPaginados.map((pedido) => (
                        <div className="card mb-4 shadow-sm summary" key={pedido.id}
                            onClick={() => toggleAcordeon(pedido.id)} style={{
                                cursor: 'pointer',
                                color: '#1C1B22',
                            }} >
                            <div
                                className="card-header d-flex justify-content-between align-items-center"
                                onClick={() => toggleAcordeon(pedido.id)}
                            >
                                <p style={{
                                    color: '#1C1B22',
                                }} className="mb-0">Pedido #{pedido.numero_orden}</p>
                                <span
                                    style={{
                                        fontSize: '18px',
                                        transition: 'transform 0.3s',
                                        transform: acordeonActivo === pedido.id ? 'rotate(180deg)' : 'rotate(0deg)',
                                    }}
                                >
                                </span>
                            </div>
                            {acordeonActivo === pedido.id && (
                                <div className="card-body" style={{ padding: '20px' }}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h6><strong>Productos:</strong></h6>
                                            <ul className="list-unstyled">
                                                {pedido.details.map((producto) => (
                                                    <li key={producto.id} className="d-flex align-items-center mb-3">
                                                        <img
                                                            src={`${global.IMGProd}${producto.imageUrl}`}
                                                            alt={producto.name}
                                                            width="50"
                                                            height="50"
                                                            className="mr-3"
                                                            style={{ borderRadius: '5px' }}
                                                        />
                                                        <span>{producto.name} - {producto.quantity} x ${producto.price} = ${producto.total}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <h6><strong>Dirección de Envío:</strong></h6>
                                            {pedido.address ? (
                                                <>
                                                    <p><strong>Nombre:</strong> {pedido.address.nombres} {pedido.address.apellidos}</p>
                                                    <p><strong>Dirección:</strong> {pedido.address.direccion} / <strong>Calle:</strong> {pedido.address.calle}</p>
                                                    <p><strong>Referencia:</strong> {pedido.address.referencia}</p>
                                                    <p><strong>Provincia:</strong> {pedido.address.provincia_name} / <strong>Ciudad:</strong> {pedido.address.canton_name}</p>
                                                    <p><strong>Código Postal:</strong> {pedido.address.codigo_postal}</p>
                                                    <p><strong>Teléfono:</strong> {pedido.address.telefono_contacto}</p>
                                                </>
                                            ) : (
                                                <p>No hay dirección de envío disponible.</p>
                                            )}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span><strong>Total:</strong> ${pedido.total}</span>
                                        <div className="d-flex">
                                            <a
                                                href={global.ORDERDETAIL + '?orden=' + pedido.numero_orden}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="btn btn-outline-primary-2 btn-sm mr-2"
                                                style={{
                                                    backgroundColor: '#D9DADF',
                                                    color: '#1C1B22',
                                                    padding: '8px 16px',
                                                    borderRadius: '5px',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                <span>Detalle de la orden</span>
                                                <i className="icon-long-arrow-right"></i>
                                            </a>
                                            <a
                                                href={global.ORDERCRASTREO + '?orden=' + pedido.numero_orden}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="btn btn-outline-primary-2 btn-sm"
                                                style={{
                                                    backgroundColor: '#D9DADF',
                                                    color: '#1C1B22',
                                                    padding: '8px 16px',
                                                    borderRadius: '5px',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                <span>Rastreo</span>
                                                <i className="icon-long-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center align-items-center">
                        <li className="page-item">
                            <button
                                style={{
                                    backgroundColor: '#007bff',
                                    color: '#ffffff',
                                    borderRadius: '20px',
                                    padding: '8px 15px',
                                    border: 'none',
                                    marginRight: '5px'
                                }}
                                className="page-link shadow"
                                onClick={() => cambiarPagina(paginaActual - 1)}
                                disabled={paginaActual === 1}
                            >
                                ⬅ Anterior
                            </button>
                        </li>
                        <li className="page-item">
                            <span
                                className="page-link"
                                style={{
                                    backgroundColor: '#f8f9fa',
                                    color: '#333',
                                    padding: '8px 15px',
                                    fontWeight: 'bold',
                                    border: '1px solid #dee2e6'
                                }}
                            >
                                Página {paginaActual} de {totalPaginas}
                            </span>
                        </li>
                        <li className="page-item">
                            <button
                                style={{
                                    backgroundColor: '#007bff',
                                    color: '#ffffff',
                                    borderRadius: '20px',
                                    padding: '8px 15px',
                                    border: 'none',
                                    marginLeft: '5px'
                                }}
                                className="page-link shadow"
                                onClick={() => cambiarPagina(paginaActual + 1)}
                                disabled={paginaActual === totalPaginas}
                            >
                                Siguiente ➡
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
