import React, { useState, useEffect } from 'react';
import Spiner from '../../components/modals/Spiner';
import userLogic from '../../functions/logic/userLogic';

export default function HistorialPedidos() {
    const [spiner, setSpiner] = useState(false);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setSpiner(true);
        const token = localStorage.getItem('authToken');
        const isLoggedIn = !!token;
        if (!isLoggedIn) {
            window.location.href = global.HOME;
        }
        getHistoryOrders();
        setSpiner(false);
    }, []);

    const getHistoryOrders = async () => {
        const orderResp = await userLogic.getHistoryOrdersLogic();
        if (orderResp.success && orderResp.data.data.length > 0) {
            setOrders(orderResp.data.data); // Guardar los pedidos en el estado
        }
    };

    // Número de pedidos por página
    const pedidosPorPagina = 5;
    const [paginaActual, setPaginaActual] = useState(1);

    // Calcular los pedidos que se deben mostrar en la página actual
    const indiceUltimoPedido = paginaActual * pedidosPorPagina;
    const indicePrimerPedido = indiceUltimoPedido - pedidosPorPagina;
    const pedidosPaginados = orders.slice(indicePrimerPedido, indiceUltimoPedido);

    // Función para cambiar la página
    const cambiarPagina = (pagina) => {
        setPaginaActual(pagina);
    };

    // Estado para controlar el acordeón
    const [acordeonActivo, setAcordeonActivo] = useState(orders[0]?.id || null); // El primer pedido siempre está abierto

    const toggleAcordeon = (id) => {
        // Alterna el estado del acordeón. Si el mismo id es clickeado, se cierra el acordeón
        setAcordeonActivo(acordeonActivo === id ? null : id);
    };

    return (
        <div className="container">
            <Spiner opt={spiner} />
            <div className="page-content mt-5">
                <h2 className="text-center mb-4">Historial de Pedidos</h2>
                {pedidosPaginados.length === 0 ? (
                    <p className="text-center">No tienes pedidos en tu historial.</p>
                ) : (
                    pedidosPaginados.map((pedido) => (
                        <div className="card mb-4 shadow-sm" key={pedido.id}>
                            <div
                                className="card-header d-flex justify-content-between align-items-center"
                                onClick={() => toggleAcordeon(pedido.id)}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    padding: '10px 15px',
                                    borderRadius: '5px',
                                    marginBottom: '10px',
                                    fontSize: '16px',
                                }}
                            >
                                <h5 className="mb-0">Pedido #{pedido.numero_orden}</h5>
                                <span
                                    style={{
                                        fontSize: '18px',
                                        transition: 'transform 0.3s',
                                        transform: acordeonActivo === pedido.id ? 'rotate(180deg)' : 'rotate(0deg)',
                                    }}
                                >
                                    ▼
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
                                            <p>{pedido.direccionEnvio}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span><strong>Total:</strong> ${pedido.total}</span>
                                        <div className="d-flex">
                                            <a
                                                href={global.ORDERDETAIL + '?orden=' + pedido.numero_orden}
                                                target="_blank"
                                                className="btn btn-outline-primary-2 btn-sm mr-2"
                                                style={{
                                                    backgroundColor: '#28a745',
                                                    color: '#fff',
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
                                                className="btn btn-outline-primary-2 btn-sm"
                                                style={{
                                                    backgroundColor: '#ffc107',
                                                    color: '#fff',
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
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={() => cambiarPagina(paginaActual - 1)}
                                disabled={paginaActual === 1}
                            >
                                Anterior
                            </button>
                        </li>
                        <li className="page-item">
                            <span className="page-link">Página {paginaActual}</span>
                        </li>
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={() => cambiarPagina(paginaActual + 1)}
                                disabled={pedidosPaginados.length < pedidosPorPagina}
                            >
                                Siguiente
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
