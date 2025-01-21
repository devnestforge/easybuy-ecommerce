import React, { useState } from "react"

export default function Checkout() {
    const [step, setStep] = useState("envio")

    const goToStep = (newStep) => {
        setStep(newStep)
    }

    return (
        <main className="main">
            <div className="page-content">
                <div className="checkout">
                    <div className="container">
                        {/* Tabs Navigation */}
                        <div className="checkout-tabs mb-1">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${step === "envio" ? "active" : ""}`}
                                        onClick={() => goToStep("envio")}
                                    >
                                        1. Envío{" "}
                                        {step === "pago" && <span className="check-icon">✔</span>}
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${step === "pago" ? "active" : ""}`}
                                        onClick={() => goToStep("pago")}
                                        disabled={step === "envio"}
                                    >
                                        2. Pago
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {step === "envio" && (
                            <div className="row gx-4 gy-4">
                                {/* Panel Izquierdo */}
                                <div className="col-12 col-md-8">
                                    <div className="summary mb-1">
                                        <h3 className="summary-title">Dirección de Envío</h3>
                                        <div>
                                            <p>
                                                <strong>Gabriel new test</strong>
                                            </p>
                                            <p>123 123, 25718</p>
                                            <p>Coahuila de Zaragoza, Monclova, PEMEX</p>
                                            <p>+52 1231231231</p>
                                            <p>Esta es tu dirección de envío por defecto</p>
                                        </div>
                                        <br/>
                                        <hr class="linea" />
                                        <button
                                            className="btn btn-outline-primary mt-1"
                                            onClick={() => goToStep("pago")}
                                        >
                                            Nueva Dirección
                                        </button>
                                    </div>
                                    <div className="summary mb-1">
                                        <h3 className="summary-title">Métodos de Envío</h3>
                                        <div>
                                            <div className="payment-methods">
                                                <div className="accordion-summary" id="accordion-payment">
                                                    <div className="">
                                                        <div className="">
                                                            <div className="payment-methods">
                                                                <div className="accordion-summary" id="accordion-payment">
                                                                    <div className="">
                                                                        <div className="" id="heading-1">
                                                                            <h2 className="card-title">
                                                                                <a
                                                                                    role="button"
                                                                                    data-toggle="collapse"
                                                                                    href="#collapse-1"
                                                                                    aria-expanded="true"
                                                                                    aria-controls="collapse-1"
                                                                                >
                                                                                    Transferencia Bancaria
                                                                                </a>
                                                                            </h2>
                                                                        </div>
                                                                        <div
                                                                            id="collapse-1"
                                                                            className="collapse show"
                                                                            aria-labelledby="heading-1"
                                                                            data-parent="#accordion-payment"
                                                                        >
                                                                            <div className="card-body">
                                                                                Realiza tu pago directamente en nuestra cuenta bancaria.
                                                                                Por favor usa tu ID de pedido como referencia. No se enviará
                                                                                tu pedido hasta que se confirme el pago.
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card">
                                                                        <div className="card-header" id="heading-2">
                                                                            <h2 className="card-title">
                                                                                <a
                                                                                    className="collapsed"
                                                                                    role="button"
                                                                                    data-toggle="collapse"
                                                                                    href="#collapse-2"
                                                                                    aria-expanded="false"
                                                                                    aria-controls="collapse-2"
                                                                                >
                                                                                    Pago con tarjeta de crédito o débito
                                                                                </a>
                                                                            </h2>
                                                                        </div>
                                                                        <div
                                                                            id="collapse-2"
                                                                            className="collapse"
                                                                            aria-labelledby="heading-2"
                                                                            data-parent="#accordion-payment"
                                                                        >
                                                                            <div className="card-body">
                                                                                Introduce los datos de tu tarjeta para procesar el pago de
                                                                                forma segura.
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* Otros métodos de pago */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Panel Derecho */}
                                <div className="col-12 col-md-4">
                                    <div className="summary">
                                        <h3 className="summary-title">Resumen de tu pedido</h3>
                                        <ul className="order-items">
                                            <li>Macstack Mascara / Mini MAC - $369.00</li>
                                            <li>Gloss Transparente Lip Glass - $349.00</li>
                                        </ul>
                                        <p>
                                            <strong>Envío estándar:</strong> $150.00
                                        </p>
                                        <br/>
                                        <hr class="linea" />
                                        <p>
                                            <strong>Total:</strong> $868.00
                                        </p>
                                    </div>
                                </div>

                                <div className="col-12 col-md-4">
                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={() => goToStep("pago")}
                                    >
                                        Continuar a Pago
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === "pago" && (
                            <div className="row gx-4 gy-4">
                                <div className="col-12 col-md-8">
                                    <div className="payment-methods">
                                        <div className="accordion-summary" id="accordion-payment">
                                            <div className="summary">
                                                <h3 className="summary-title">Método de Pago</h3>
                                                <div className="card-body">
                                                    <div className="payment-methods">
                                                        <div className="accordion-summary" id="accordion-payment">
                                                            <div className="card">
                                                                <div className="card-header" id="heading-1">
                                                                    <h2 className="card-title">
                                                                        <a
                                                                            role="button"
                                                                            data-toggle="collapse"
                                                                            href="#collapse-1"
                                                                            aria-expanded="true"
                                                                            aria-controls="collapse-1"
                                                                        >
                                                                            Transferencia Bancaria
                                                                        </a>
                                                                    </h2>
                                                                </div>
                                                                <div
                                                                    id="collapse-1"
                                                                    className="collapse show"
                                                                    aria-labelledby="heading-1"
                                                                    data-parent="#accordion-payment"
                                                                >
                                                                    <div className="card-body">
                                                                        Realiza tu pago directamente en nuestra cuenta bancaria.
                                                                        Por favor usa tu ID de pedido como referencia. No se enviará
                                                                        tu pedido hasta que se confirme el pago.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card">
                                                                <div className="card-header" id="heading-2">
                                                                    <h2 className="card-title">
                                                                        <a
                                                                            className="collapsed"
                                                                            role="button"
                                                                            data-toggle="collapse"
                                                                            href="#collapse-2"
                                                                            aria-expanded="false"
                                                                            aria-controls="collapse-2"
                                                                        >
                                                                            Pago con tarjeta de crédito o débito
                                                                        </a>
                                                                    </h2>
                                                                </div>
                                                                <div
                                                                    id="collapse-2"
                                                                    className="collapse"
                                                                    aria-labelledby="heading-2"
                                                                    data-parent="#accordion-payment"
                                                                >
                                                                    <div className="card-body">
                                                                        Introduce los datos de tu tarjeta para procesar el pago de
                                                                        forma segura.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* Otros métodos de pago */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <div className="summary">
                                        <h3 className="summary-title">Resumen de tu pedido</h3>
                                        <ul className="order-items">
                                            <li>Macstack Mascara / Mini MAC - $369.00</li>
                                            <li>Gloss Transparente Lip Glass - $349.00</li>
                                        </ul>
                                        <p>
                                            <strong>Envío estándar:</strong> $150.00
                                        </p>
                                        <p>
                                            <strong>Total:</strong> $868.00
                                        </p>
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100 mt-1"
                                        >
                                            Realizar Pedido
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
