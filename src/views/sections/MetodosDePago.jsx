import React from 'react'
import t from '../../translations/i18n'

export default function MetodosDePago() {
    const metodoPago = {
        tittle_method_1: t("meotodPago.tittle_method_1"),
        method_1: t("meotodPago.method_1"),
        status_method_1: t("meotodPago.status_method_1"),
        tittle_method_2: t("meotodPago.tittle_method_2"),
        method_2: t("meotodPago.method_2"),
        status_method_2: t("meotodPago.status_method_2"),
        tittle_method_3: t("meotodPago.tittle_method_3"),
        method_3: t("meotodPago.method_3"),
        status_method_3: false,
    }
    return (
        <>
            <div className="page-content">
                <div className="container summary">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <br />
                            <div className="">
                                <div className="card-header text-center">
                                    <h3 className="card-title">{t("meotodPago.tittle")}</h3>
                                </div>
                                <br />
                                <div className="card-body">
                                    <ul className="list-group">
                                        {metodoPago.status_method_1 && (
                                            <li className="list-group-item">
                                                <h5>{metodoPago.tittle_method_1}</h5>
                                                <p>{metodoPago.method_1}</p>
                                            </li>
                                        )}
                                        {metodoPago.status_method_2 && (
                                            <li className="list-group-item">
                                                <h5>{metodoPago.tittle_method_2}</h5>
                                                <p>{metodoPago.method_2}</p>
                                            </li>
                                        )}
                                        {metodoPago.status_method_3 && (
                                            <li className="list-group-item">
                                                <h5>{metodoPago.tittle_method_3}</h5>
                                                <p>{metodoPago.method_3}</p>
                                            </li>
                                        )}
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
