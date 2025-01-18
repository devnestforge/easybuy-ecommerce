import React from 'react';

export default function MetodosDePago() {
    return (
        <>
            <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Inicio</a></li>
                        <li className="breadcrumb-item"><a href="!#">Páginas</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Métodos de Pago</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <hr className="mt-3 mb-5 mt-md-1" />
                    <div className="row justify-content-center">
                        <div className="col-md-9 col-lg-7">
                            {/* Titulo de la Página */}
                            <div className="card">
                                <div className="card-header text-center">
                                    <h3 className="card-title">Métodos de Pago Disponibles</h3>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <h5>Tarjetas de Crédito/Débito</h5>
                                            <p>Utiliza tu tarjeta de crédito o débito para realizar pagos de manera segura.</p>
                                        </li>
                                        <li className="list-group-item">
                                            <h5>Transferencia Bancaria</h5>
                                            <p>Realiza una transferencia directa desde tu banco.</p>
                                        </li>
                                        <li className="list-group-item">
                                            <h5>PayPal</h5>
                                            <p>Paga a través de PayPal, un servicio de pago en línea seguro y rápido.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
