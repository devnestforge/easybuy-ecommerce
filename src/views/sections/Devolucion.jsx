import React from 'react';

export default function Devolucion() {
    return (
        <>
            <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Inicio</a></li>
                        <li className="breadcrumb-item"><a href="!#">Páginas</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Devolución</li>
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
                                    <h3 className="card-title">Política de Devolución</h3>
                                </div>
                                <div className="card-body">
                                    <p>
                                        Si no estás completamente satisfecho con tu compra, puedes devolver el producto dentro de los 30 días posteriores a la compra para obtener un reembolso completo.
                                    </p>
                                    <p>
                                        El producto debe estar en su estado original, sin usar y con el embalaje intacto. Los productos que no cumplen con estas condiciones no serán aceptados para devolución.
                                    </p>
                                    <p>
                                        Para iniciar el proceso de devolución, por favor contacta con nuestro servicio al cliente proporcionando tu número de pedido.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
