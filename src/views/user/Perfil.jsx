import React, { useState } from 'react';

export default function PerfilUsuario() {
    const [userData, setUserData] = useState({
        nombre: 'Juan Pérez',
        email: 'juanperez@email.com',
        cedula: '123456789',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userData.password === userData.confirmPassword) {
            alert('Contraseña cambiada con éxito!');
        } else {
            alert('Las contraseñas no coinciden');
        }
    };

    return (
        <>
            <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Inicio</a></li>
                        <li className="breadcrumb-item"><a href="!#">Páginas</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Perfil de Usuario</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <hr className="mt-3 mb-5 mt-md-1" />
                    <div className="row justify-content-center">
                        <div className="col-md-9 col-lg-7">
                            {/* Información del perfil */}
                            <div className="card">
                                <div className="card-header text-center">
                                    <h3 className="card-title">Información del Usuario</h3>
                                </div>
                                <div className="card-body">
                                    <form action="#" className="contact-form mb-2">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label htmlFor="nombre" className="sr-only">Nombre Completo</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="nombre"
                                                    name="nombre"
                                                    value={userData.nombre}
                                                    onChange={handleInputChange}
                                                    placeholder="Nombre Completo *"
                                                    required
                                                />
                                            </div>

                                            <div className="col-sm-6">
                                                <label htmlFor="email" className="sr-only">Correo Electrónico</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    value={userData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="Correo Electrónico *"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cedula" className="sr-only">Cédula</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="cedula"
                                                name="cedula"
                                                value={userData.cedula}
                                                onChange={handleInputChange}
                                                placeholder="Cédula *"
                                                required
                                            />
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn btn-outline-primary-2 btn-minwidth-sm">
                                                <span>GUARDAR INFORMACIÓN</span>
                                                <i className="icon-long-arrow-right"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Cambiar Contraseña */}
                            <div className="card mt-4">
                                <div className="card-header text-center">
                                    <h3 className="card-title">Cambiar Contraseña</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="password" className="sr-only">Nueva Contraseña</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                value={userData.password}
                                                onChange={handleInputChange}
                                                placeholder="Nueva Contraseña *"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="confirmPassword" className="sr-only">Confirmar Contraseña</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={userData.confirmPassword}
                                                onChange={handleInputChange}
                                                placeholder="Confirmar Contraseña *"
                                                required
                                            />
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn btn-outline-success-2 btn-minwidth-sm mb-2">
                                                <span>Cambiar Contraseña</span>
                                                <i className="icon-long-arrow-right"></i>
                                            </button>
                                            <button type="button" className="btn btn-outline-danger-2 btn-minwidth-sm">
                                                <span>Cancelar</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
