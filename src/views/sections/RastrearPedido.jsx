import React from 'react';

export default function RastrearPedido() {
    return (
        <>
            <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Inicio</a></li>
                        <li className="breadcrumb-item"><a href="!#">Páginas</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Rastrear mi Pedido</li>
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
                                    <h3 className="card-title">Rastrear Pedido</h3>
                                </div>
                                <div className="card-body">
                                    <p>
                                        Para rastrear el estado de tu pedido, por favor ingresa el número de seguimiento proporcionado al momento de realizar tu compra.
                                    </p>

                                    <form action="#" className="contact-form mb-2">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <label htmlFor="tracking-number" className="sr-only">Número de seguimiento</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="tracking-number" 
                                                    placeholder="Número de seguimiento *" 
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        <div className="text-center mt-3">
                                            <button type="submit" className="btn btn-outline-primary-2 btn-minwidth-sm">
                                                <span>Rastrear Pedido</span>
                                            </button>
                                        </div>
                                    </form>

                                    <p className="mt-3">Si no tienes el número de seguimiento, por favor contacta con nuestro soporte.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
