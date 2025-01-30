import React, { useState } from 'react'
import t from '../../translations/i18n'

export default function RastrearPedido() {
    const [trackingNumber, setTrackingNumber] = useState('')
    const handleTrackOrder = (e) => {
        e.preventDefault();
        if (trackingNumber) {
            window.location.href = global.ORDERCRASTREO + '?orden='  + trackingNumber
        } else {
            alert('Por favor ingrese un número de orden.');
        }
    }
    return (
        <>
            <br />
            <div className="page-content">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-9 col-lg-7">

                            <div className="card-header text-center">
                                <h3 className="card-title">{t("rastreo.tittle")}</h3>
                            </div>
                            <br />
                            <div className="card-body">
                                <p>
                                    {t("rastreo.p_1")}
                                </p>
                                <br />
                                <form onSubmit={handleTrackOrder} className="contact-form mb-2">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <label htmlFor="tracking-number" className="sr-only">{t("rastreo.p_2")}</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="tracking-number"
                                                onChange={(e) => setTrackingNumber(e.target.value)}
                                                placeholder={t("rastreo.p_2")}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-outline-primary-2 btn-minwidth-sm">
                                            <span>{t("rastreo.p_3")}</span>
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
