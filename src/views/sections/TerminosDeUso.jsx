import React from 'react';
import t from '../../translations/i18n'

export default function Terminos() {
    return (
        <>
            <br />
            <div className="page-content">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-9 col-lg-7">
                            <div className="card-header text-center">
                                <h3 className="card-title">{t("terminos.tittle")}</h3>
                            </div>
                            <br/>
                            <div className="card-body">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <p>
                                            {t("terminos.p_1")}
                                        </p>
                                    </li>
                                    <li className="list-group-item">
                                        <p>
                                            {t("terminos.p_2")}
                                        </p>
                                    </li>
                                    <li className="list-group-item">
                                        <p>
                                            {t("terminos.p_3")}
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
