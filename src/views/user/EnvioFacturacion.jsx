import React from 'react';

export default function EnvioFacturacion() {
    return (
        <>
            <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Inicio</a></li>
                        <li className="breadcrumb-item"><a href="!#">Páginas</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Envío y Facturación</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <hr className="mt-3 mb-5 mt-md-1" />
                    <div className="touch-container row justify-content-center">
                        <div className="col-md-9 col-lg-7">
                            <div className="text-center">
                                <h2 className="title mb-1">Dirección de Envío</h2>
                                <form action="#" className="contact-form mb-2">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label htmlFor="shipping-name" className="sr-only">Nombre</label>
                                            <input type="text" className="form-control" id="shipping-name" placeholder="Nombre *" required />
                                        </div>

                                        <div className="col-sm-6">
                                            <label htmlFor="shipping-phone" className="sr-only">Teléfono</label>
                                            <input type="tel" className="form-control" id="shipping-phone" placeholder="Teléfono" />
                                        </div>
                                    </div>

                                    <label htmlFor="shipping-address" className="sr-only">Dirección</label>
                                    <input type="text" className="form-control" id="shipping-address" placeholder="Dirección *" required />

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label htmlFor="shipping-city" className="sr-only">Ciudad</label>
                                            <input type="text" className="form-control" id="shipping-city" placeholder="Ciudad *" required />
                                        </div>

                                        <div className="col-sm-6">
                                            <label htmlFor="shipping-zip" className="sr-only">Código Postal</label>
                                            <input type="text" className="form-control" id="shipping-zip" placeholder="Código Postal" />
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-outline-primary-2 btn-minwidth-sm">
                                            <span>GUARDAR DIRECCIÓN DE ENVÍO</span>
                                            <i className="icon-long-arrow-right"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="text-center mt-5">
                                <h2 className="title mb-1">Dirección de Facturación</h2>
                                <form action="#" className="contact-form mb-2">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label htmlFor="billing-name" className="sr-only">Nombre</label>
                                            <input type="text" className="form-control" id="billing-name" placeholder="Nombre *" required />
                                        </div>

                                        <div className="col-sm-6">
                                            <label htmlFor="billing-phone" className="sr-only">Teléfono</label>
                                            <input type="tel" className="form-control" id="billing-phone" placeholder="Teléfono" />
                                        </div>
                                    </div>

                                    <label htmlFor="billing-address" className="sr-only">Dirección</label>
                                    <input type="text" className="form-control" id="billing-address" placeholder="Dirección *" required />

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label htmlFor="billing-city" className="sr-only">Ciudad</label>
                                            <input type="text" className="form-control" id="billing-city" placeholder="Ciudad *" required />
                                        </div>

                                        <div className="col-sm-6">
                                            <label htmlFor="billing-zip" className="sr-only">Código Postal</label>
                                            <input type="text" className="form-control" id="billing-zip" placeholder="Código Postal" />
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-outline-success-2 btn-minwidth-sm">
                                            <span>GUARDAR DIRECCIÓN DE FACTURACIÓN</span>
                                            <i className="icon-long-arrow-right"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
