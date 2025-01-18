import React from 'react';

export default function Garantia() {
    return (
        <>
            <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Inicio</a></li>
                        <li className="breadcrumb-item"><a href="!#">Páginas</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Garantía</li>
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
                                    <h3 className="card-title">Información sobre Garantía</h3>
                                </div>
                                <div className="card-body">
                                    <p>
                                        Ofrecemos una garantía de 1 año en todos nuestros productos, cubriendo cualquier defecto de fabricación.
                                    </p>
                                    <p>
                                        Si encuentras algún problema con el producto, por favor contáctanos dentro del período de garantía para realizar una reclamación.
                                    </p>
                                    <p>
                                        La garantía no cubre daños causados por mal uso del producto. Asegúrate de seguir las instrucciones de uso y cuidado proporcionadas.
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
