import React from 'react';

export default function PoliticaDePrivacidad() {
    return (
        <>
            <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Inicio</a></li>
                        <li className="breadcrumb-item"><a href="!#">Páginas</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Política de Privacidad</li>
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
                                    <h3 className="card-title">Política de Privacidad</h3>
                                </div>
                                <div className="card-body">
                                    <p>
                                        Tu privacidad es muy importante para nosotros. En esta página te explicamos cómo recolectamos, usamos y protegemos tu información personal.
                                    </p>
                                    <p>
                                        Recopilamos información personal solo cuando es necesario para procesar pedidos y mejorar la experiencia de compra. Esta información no será compartida con terceros, excepto en los casos necesarios para completar tu compra.
                                    </p>
                                    <p>
                                        Si tienes alguna pregunta sobre nuestra política de privacidad, no dudes en contactarnos.
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
