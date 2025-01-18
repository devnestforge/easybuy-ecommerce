import React, { useState } from 'react';

export default function HistorialPedidos() {
    
const pedidos = [
    {
        id: '12345',
        fecha: '2025-01-15',
        direccionEnvio: 'Calle Falsa 123, Ciudad, CP 12345',
        direccionFacturacion: 'Calle Real 456, Ciudad, CP 54321',
        productos: [
            { nombre: 'Producto 1', cantidad: 2, precio: 100 },
            { nombre: 'Producto 2', cantidad: 1, precio: 200 }
        ]
    },
    {
        id: '67890',
        fecha: '2025-01-10',
        direccionEnvio: 'Avenida Libertad 789, Ciudad, CP 67890',
        direccionFacturacion: 'Avenida Central 101, Ciudad, CP 98765',
        productos: [
            { nombre: 'Producto 3', cantidad: 1, precio: 150 }
        ]
    }
];

    // Número de pedidos por página
    const pedidosPorPagina = 5;

    const [paginaActual, setPaginaActual] = useState(1);

    // Calcular los pedidos que se deben mostrar en la página actual
    const indiceUltimoPedido = paginaActual * pedidosPorPagina;
    const indicePrimerPedido = indiceUltimoPedido - pedidosPorPagina;
    const pedidosPaginados = pedidos.slice(indicePrimerPedido, indiceUltimoPedido);

    // Función para cambiar la página
    const cambiarPagina = (pagina) => {
        setPaginaActual(pagina);
    };

    return (
        <div className="container">
            <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Inicio</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Historial de Pedidos</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content mt-5">
                <h2 className="text-center mb-4">Historial de Pedidos</h2>

                {pedidosPaginados.map((pedido) => (
                    <div className="card mb-4" key={pedido.id}>
                        <div className="card-header">
                            <h5>Pedido #{pedido.id} - {pedido.fecha}</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6><strong>Dirección de Envío:</strong></h6>
                                    <p>{pedido.direccionEnvio}</p>
                                </div>
                                <div className="col-md-6">
                                    <h6><strong>Dirección de Facturación:</strong></h6>
                                    <p>{pedido.direccionFacturacion}</p>
                                </div>
                            </div>

                            <h6><strong>Productos:</strong></h6>
                            <ul>
                                {pedido.productos.map((producto, index) => (
                                    <li key={index}>
                                        {producto.nombre} - {producto.cantidad} x ${producto.precio} = ${producto.cantidad * producto.precio}
                                    </li>
                                ))}
                            </ul>

                            <hr />
                            <div className="d-flex justify-content-between">
                                <span><strong>Total:</strong> ${pedido.productos.reduce((total, producto) => total + producto.cantidad * producto.precio, 0)}</span>
                                <button className="btn btn-outline-primary btn-sm">Ver detalles</button>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="d-flex justify-content-center mt-4">
                    <nav>
                        <ul className="pagination">
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
                                <button
                                    className="page-link"
                                    onClick={() => cambiarPagina(paginaActual + 1)}
                                    disabled={paginaActual * pedidosPorPagina >= pedidos.length}
                                >
                                    Siguiente
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
