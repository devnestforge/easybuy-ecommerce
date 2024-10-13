import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default function PerfilUser() {
    const param = useParams();

    useEffect(() => {
       
    }, [param]);


    return (
        <div className="content-wrapper">
        <section className="content-header">
        </section>
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">{global.SU_TITLE}</h3>
                            </div>
                            <div className="card-body">
                                <div className="col-md-12">
                                    pefil usuario
                                </div>
                            </div>
                        </div >
                    </div >
                </div >
            </div >
        </section >
    </div >
    )

}






