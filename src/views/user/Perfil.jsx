import React, { useState, useEffect } from 'react'
import Spiner from '../../components/modals/Spiner'
import userLogic from '../../functions/logic/userLogic'
import generalLogic from '../../functions/logic/generalLogic'
import { useSnackbar } from 'notistack'

export default function PerfilUsuario() {
    const [spiner, setSpiner] = useState(false)
    const [userData, setUserData] = useState([])
    const [activeTab, setActiveTab] = useState('info')
    const { enqueueSnackbar } = useSnackbar()
    const [identificacion, setIdentificacion] = useState('')
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [direccion, setDireccion] = useState('')
    const [cellPhone, setCellPhone] = useState('')
    const [gender, setGender] = useState(1)
    const [provincia, setProvincia] = useState(1)
    const [ciudad, setCiudad] = useState(1)
    const [email, setEmail] = useState('')
    const [fechaNaci, setFechaNaci] = useState('')
    const [filteredCities, setFilteredCities] = useState([])
    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])

    useEffect(() => {
        const getRegions = async () => {
            try {
                const combos = await generalLogic.getRegionsLogic()
                if (combos.success && combos.data) {
                    setProvinces(combos.data.provincias || [])
                    setCities(combos.data.canton || [])
                    setFilteredCities(combos.data.canton || [])
                } else {
                    console.error('Error: No se pudieron cargar los combos')
                }
            } catch (error) {
                console.error('Error en getRegions:', error)
            }
        }
        getRegions()
    }, [])

    useEffect(() => {
        if (provincia) {
            const filtered = cities.filter(
                city => String(city.provincia_id) === String(provincia)
            )
            setFilteredCities(filtered)
        } else {
            setFilteredCities([])
        }
        setCiudad('')
    }, [provincia, cities])

    useEffect(() => {
        setSpiner(true);
        const token = localStorage.getItem('authToken');
        const isLoggedIn = !!token;

        if (isLoggedIn) {
            getUserProfileInfo(token);
        }

        setSpiner(false);
    }, []);

    const getUserProfileInfo = async (token) => {
        try {
            const userInfo = await userLogic.getUserProfileInfoLogic(token);
            if (userInfo?.success && Array.isArray(userInfo?.data?.data) && userInfo.data.data.length > 0) {
                const userData = userInfo.data.data[0];

                setIdentificacion(userData.identification || '');
                setNombres(userData.nombres || '');
                setApellidos(userData.apellidos || '');
                setDireccion(userData.direction || '');
                setCellPhone(userData.phone || '');
                setGender(userData.gender || '');
                setProvincia(userData.provincia_id || '');
                setCiudad(userData.parroquia_id ? userData.parroquia_id.toString() : '');
                setEmail(userData.email || '');

                if (userData.fecha_nacimiento) {
                    const fechaFormateada = userData.fecha_nacimiento.split(' ')[0];
                    setFechaNaci(fechaFormateada);
                }
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmitProfile = async (e) => {
        e.preventDefault()
        setSpiner(true)
        const data = {
            "identification": identificacion,
            "nombres": nombres,
            "apellidos": apellidos,
            "direction": direccion,
            "phone": cellPhone,
            "gender": gender,
            "provincia_id": provincia,
            "parroquia_id": ciudad,
            "fecha_nacimiento": fechaNaci,
            "ip": localStorage.getItem('ip')
        }

        const response = await userLogic.saveProfileLogic(data)
        enqueueSnackbar(response.data.message, {
            variant: response.variant,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        })
        setSpiner(false)
    }

    const handleSubmitPass = async (e) => {
        e.preventDefault()
        setSpiner(true)
        const response = await userLogic.updatePasswordLogic(userData)
        enqueueSnackbar(response.message, {
            variant: response.variant,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        })
        setSpiner(false)
        if (response.success) {
            setTimeout(function () {
                localStorage.clear()
                window.location.href = "/home"
            }, global.DELAY)
        }
    }

    return (
        <>
            <br />
            <Spiner opt={spiner} />
            <div className="page-content">
                <div className="col-md-12">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card summary">
                                {/* Pestañas */}
                                <div className="card-header text-center">
                                    <ul className="nav nav-tabs">
                                        <li className="nav-item">
                                            <a href="!#"
                                                className={`nav-link ${activeTab === 'info' ? 'active' : ''}`}
                                                onClick={(e) => {
                                                    e.preventDefault(); // Evita el envío del formulario
                                                    setActiveTab('info');
                                                }}
                                            >
                                                Información del Usuario
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="!#"
                                                className={`nav-link ${activeTab === 'password' ? 'active' : ''}`}
                                                onClick={(e) => {
                                                    e.preventDefault(); // Evita el envío del formulario
                                                    setActiveTab('password');
                                                }}
                                            >
                                                Cambiar Contraseña
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                {/* Contenido de las Pestañas */}
                                <div className="card-body">
                                    <br />
                                    {activeTab === 'info' && (
                                        <form onSubmit={handleSubmitProfile} className="contact-form mb-2">
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <label htmlFor="nombre">Identificación</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="identificacion"
                                                        maxLength="13"
                                                        name="identificacion"
                                                        value={identificacion}
                                                        onChange={e => {
                                                            setIdentificacion(e.target.value.replace(/\D/g, ''))
                                                            localStorage.setItem('identificacion', e.target.value.replace(/\D/g, ''))
                                                        }}
                                                        placeholder="identificacion *"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-sm-4">
                                                    <label htmlFor="nombre">Nombres Completos</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="nombre"
                                                        name="nombre"
                                                        maxLength={50}
                                                        value={nombres}
                                                        onChange={e => {
                                                            setNombres(e.target.value.replace(/[^a-z\s]/gi, ''))
                                                            localStorage.setItem('nombres', e.target.value.replace(/[^a-z\s]/gi, ''))
                                                        }}
                                                        placeholder="Nombre Completo *"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-sm-4">
                                                    <label htmlFor="nombre">Apellidos Completos</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="apellidos"
                                                        name="apellidos"
                                                        maxLength={50}
                                                        value={apellidos}
                                                        onChange={e => {
                                                            setApellidos(e.target.value.replace(/[^a-z\s]/gi, ''))
                                                            localStorage.setItem('apellidos', e.target.value.replace(/[^a-z\s]/gi, ''))
                                                        }}
                                                        placeholder="Apellidos Completos *"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-sm-12">
                                                    <label htmlFor="email">Dirección</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="direccion"
                                                        name="direccion"
                                                        value={direccion}
                                                        maxLength={1000}
                                                        onChange={e => {
                                                            setDireccion(e.target.value)
                                                            localStorage.setItem('direccion', e.target.value)
                                                        }}
                                                        placeholder="Dirección *"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label htmlFor="email">Correo Electrónico</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="email"
                                                        name="email"
                                                        value={email}
                                                        maxLength={20}
                                                        placeholder="Correo Electrónico *"
                                                        readOnly
                                                        disabled
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label htmlFor="telefono">Teléfono</label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        id="telefono"
                                                        name="telefono"
                                                        value={cellPhone}
                                                        maxLength={20}
                                                        onChange={e => {
                                                            setCellPhone(e.target.value.replace(/\D/g, ''))
                                                            localStorage.setItem('telefono', e.target.value.replace(/\D/g, ''))
                                                        }}
                                                        placeholder="Teléfono *"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="fechaNacimiento"
                                                        name="fechaNacimiento"
                                                        value={fechaNaci}
                                                        onChange={e => {
                                                            setFechaNaci(e.target.value)
                                                            localStorage.setItem('fechaNaci', e.target.value)
                                                        }}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label htmlFor="genero">Género</label>
                                                    <select
                                                        className="form-control"
                                                        id="genero"
                                                        name="genero"
                                                        value={gender}
                                                        onChange={e => {
                                                            setGender(e.target.value)
                                                            localStorage.setItem('gender', e.target.value)
                                                        }}
                                                        required
                                                    >
                                                        <option value="">Seleccionar Género</option>
                                                        <option value="1">Masculino</option>
                                                        <option value="2">Femenino</option>
                                                    </select>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label>Provincia</label>
                                                        <select
                                                            className="form-control"
                                                            id="provincia"
                                                            name="provincia"
                                                            value={provincia}
                                                            onChange={e => setProvincia(e.target.value)}
                                                        >
                                                            <option value="">Selecciona una provincia</option>
                                                            {
                                                                provinces && (
                                                                    provinces.map(province => (
                                                                        <option key={province.id} value={province.id}>
                                                                            {province.name}
                                                                        </option>
                                                                    )))}
                                                        </select>
                                                    </div>
                                                </div>

                                                {/* Combo de Ciudades */}
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label>Ciudad</label>
                                                        <select
                                                            className="form-control"
                                                            id="ciudad"
                                                            name="ciudad"
                                                            value={ciudad}
                                                            onChange={e => setCiudad(e.target.value)}
                                                            disabled={!provincia}
                                                        >
                                                            <option value="">Selecciona una ciudad</option>
                                                            {filteredCities.map(city => (
                                                                <option key={city.id} value={city.id}>
                                                                    {city.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-outline-primary-2 btn-minwidth-sm">
                                                    <span>Actualizar información</span>
                                                    <i className="icon-long-arrow-right"></i>
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {activeTab === 'password' && (
                                        <form onSubmit={handleSubmitPass}>
                                            <div className="form-group">
                                                <label htmlFor="password">Contraseña actual</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="passwordOld"
                                                    name="passwordOld"
                                                    value={userData.passwordOld}
                                                    onChange={handleInputChange}
                                                    placeholder="Contraseña actual *"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Nueva Contraseña</label>
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
                                                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
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
                                                <button type="submit" className="btn btn-outline-primary-2 btn-minwidth-sm">
                                                    <span>Actualizar contraseña</span>
                                                    <i className="icon-long-arrow-right"></i>
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
