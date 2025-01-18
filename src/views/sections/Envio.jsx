import React from 'react';

export default function Envio() {
    return (
        <>
            <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Inicio</a></li>
                        <li className="breadcrumb-item"><a href="!#">Páginas</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Envío</li>
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
                                    <h3 className="card-title">Información de Envío</h3>
                                </div>
                                <div className="card-body">
                                    <p>
                                        Realizamos envíos a todo el país. Los plazos de entrega varían según la ubicación, pero normalmente se entregan en un plazo de 3 a 5 días hábiles.
                                    </p>
                                    <p>
                                        Los costos de envío se calculan en base a la dirección de destino. Ofrecemos envío gratuito en compras superiores a $50.
                                    </p>
                                    <p>
                                        Si tienes alguna pregunta sobre tu envío, no dudes en ponerte en contacto con nuestro equipo de atención al cliente.
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
