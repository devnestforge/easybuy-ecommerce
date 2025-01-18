import React from 'react';

export default function TerminosDeUso() {
    return (
        <>
            <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Inicio</a></li>
                        <li className="breadcrumb-item"><a href="!#">Páginas</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Términos de Uso</li>
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
                                    <h3 className="card-title">Términos y Condiciones de Uso</h3>
                                </div>
                                <div className="card-body">
                                    <p>
                                        Al utilizar nuestro sitio web, aceptas cumplir con los términos y condiciones establecidos en esta página.
                                    </p>
                                    <p>
                                        Nos reservamos el derecho de modificar estos términos en cualquier momento sin previo aviso. Te recomendamos revisar esta página regularmente para estar al tanto de cualquier cambio.
                                    </p>
                                    <p>
                                        No está permitido el uso de nuestro sitio para actividades ilegales o que puedan dañar el funcionamiento del mismo. Al realizar una compra, aceptas nuestras políticas de pago y devolución.
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
