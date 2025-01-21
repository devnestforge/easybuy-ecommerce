import React, { useState, useEffect } from 'react'

export default function EnvioFacturacionForm(props) {
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [provincia, setProvincia] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [direccion, setDireccion] = useState('')
    const [referencia, setReferencia] = useState('')
    const [codigoPostal, setCodigoPostal] = useState('')
    const [telefono, setTelefono] = useState('')
    const [idAddress, setIdAddress] = useState(0)
    const [isPrincipal, setIsPrincipal] = useState(false)

    useEffect(() => {
        console.log(props.formData )
        if (props.formData) {
            const datForm = props.formData
            setIdAddress(datForm["id"])
            setNombres(datForm["nombres"])
            setApellidos(datForm["apellidos"])
            setProvincia(datForm["provincia"])
            setCiudad(datForm["ciudad"])
            setDireccion(datForm["direccion"])
            setReferencia(datForm["telefono_contacto"])
            setCodigoPostal(datForm["referencia"])
            setTelefono(datForm["telefono_contacto"])
            setIsPrincipal(datForm["es_principal"] === 'true')
        } else {
            setIdAddress(localStorage.getItem("idAddress"))
            setNombres(localStorage.getItem("nombres"))
            setApellidos(localStorage.getItem("nombres"))
            setProvincia(localStorage.getItem("apellidos"))
            setCiudad(localStorage.getItem("ciudad"))
            setDireccion(localStorage.getItem("direccion"))
            setReferencia(localStorage.getItem("referencia"))
            setCodigoPostal(localStorage.getItem("codigoPostal"))
            setTelefono(localStorage.getItem("telefono"))
            setIsPrincipal(localStorage.getItem("isPrincipal") === 'true')
        }
    }, [props])

    const [defaultAddress, setDefaultAddress] = useState({
        name: 'Juan Pérez',
        phone: '555-1234',
        address: 'Calle Falsa 123',
        city: 'Ciudad de México',
        province: 'Ciudad de México',
        zip: '12345',
    })

    const [newAddress, setNewAddress] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        province: '',
        zip: '',
    })

    const provinces = [
        { id: '1', name: 'Pichincha' },
        { id: '2', name: 'Guayas' },
        { id: '3', name: 'Azuay' },
        { id: '4', name: 'Manabí' }
    ];

    const cities = [
        { id: '1', name: 'Pichincha' },
        { id: '2', name: 'Guayas' },
        { id: '3', name: 'Azuay' },
        { id: '4', name: 'Manabí' }
    ];


    const handleCheckboxChange = (e) => {
        setIsPrincipal(e.target.checked)
    }

    return (
        <>
            <input
                type="hidden"
                className="form-control"
                id="idAddress"
                name="idAddress"
                value={idAddress}
            />
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Nombres</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombres"
                            placeholder="Ingresar nombres"
                            name="nombres"
                            maxLength={50}
                            value={nombres}
                            onChange={e => {
                                setNombres(e.target.value.replace(/[^a-z\s]/gi, ''))
                                localStorage.setItem('nombres', e.target.value.replace(/[^a-z\s]/gi, ''))
                            }}
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Apellidos</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ingresar apellidos"
                            id="apellidos"
                            name="apellidos"
                            maxLength={50}
                            value={apellidos}
                            onChange={e => {
                                setApellidos(e.target.value.replace(/[^a-z\s]/gi, ''))
                                localStorage.setItem('apellidos', e.target.value.replace(/[^a-z\s]/gi, ''))
                            }}
                        />
                    </div>
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
                            {provinces.map((province) => (
                                <option key={province.id} value={province.id}>
                                    {province.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Ciudad</label>
                        <select
                            className="form-control"
                            id="ciudad"
                            name="ciudad"
                            value={ciudad}
                            onChange={e => setCiudad(e.target.value)}
                        >
                            <option value="">Selecciona una ciudad</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="col-sm-12">
                    <div className="form-group">
                        <label>Dirección</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ingresar dirección"
                            id="direccion"
                            name="direccion"
                            maxLength={50}
                            value={direccion}
                            onChange={e => {
                                setDireccion(e.target.value)
                                localStorage.setItem('direccion', e.target.value.replace(/[^a-z\s]/gi, ''))
                            }}
                        />
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="form-group">
                        <label>Referencia</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ingresar referencia"
                            id="referencia"
                            name="referencia"
                            maxLength={50}
                            value={referencia}
                            onChange={e => {
                                setReferencia(e.target.value)
                                localStorage.setItem('referencia', e.target.value.replace(/[^a-z\s]/gi, ''))
                            }}
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Código Postal</label>
                        <input
                            type="text"
                            className="form-control"
                            id="codigoPostal"
                            placeholder="Ingresar código postal"
                            name="codigoPostal"
                            maxLength={50}
                            value={codigoPostal}
                            onChange={e => {
                                setCodigoPostal(e.target.value)
                                localStorage.setItem('codigoPostal', e.target.value.replace(/[^a-z\s]/gi, ''))
                            }}
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Teléfono</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ingresar teléfono"
                            id="telefono"
                            name="telefono"
                            maxLength={50}
                            value={telefono}
                            onChange={e => {
                                setTelefono(e.target.value.replace(/\D/g, ''))
                                localStorage.setItem('telefono', e.target.value.replace(/[^a-z\s]/gi, ''))
                            }}
                        />
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                id="esPrincipal"
                                name="esPrincipal"
                                checked={isPrincipal}
                                onChange={handleCheckboxChange}
                            />
                            ¿Es principal?
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}
