import React, { useState, useEffect } from 'react'
import generalLogic from '../../functions/logic/generalLogic'

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
    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [filteredCities, setFilteredCities] = useState([])

    useEffect(() => {
        const getRegions = async () => {
            try {
                const combos = await generalLogic.getRegionsLogic()
                if (combos.success && combos.data) {
                    setProvinces(combos.data.provincias || [])
                    setCities(combos.data.canton || [])
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
        if (props.formData) {
            const datForm = props.formData
            setIdAddress(datForm.id)
            setNombres(datForm.nombres)
            setApellidos(datForm.apellidos)
            setProvincia(datForm.provincia)
            setCiudad(datForm.ciudad)
            setDireccion(datForm.direccion)
            setReferencia(datForm.referencia)
            setCodigoPostal(datForm.codigoPostal)
            setTelefono(datForm.telefono_contacto)
            setIsPrincipal(datForm.es_principal === 'true')
        } else {
            setIdAddress(localStorage.getItem('idAddress') || 0)
            setNombres(localStorage.getItem('nombres') || '')
            setApellidos(localStorage.getItem('apellidos') || '')
            setProvincia(localStorage.getItem('provincia') || '')
            setCiudad(localStorage.getItem('ciudad') || '')
            setDireccion(localStorage.getItem('direccion') || '')
            setReferencia(localStorage.getItem('referencia') || '')
            setCodigoPostal(localStorage.getItem('codigoPostal') || '')
            setTelefono(localStorage.getItem('telefono') || '')
            setIsPrincipal(localStorage.getItem('isPrincipal') === 'true')
        }
    }, [props.formData])

    const handleCheckboxChange = e => {
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
                            {provinces.map(province => (
                                <option key={province.id} value={province.id}>
                                    {province.name}
                                </option>
                            ))}
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
