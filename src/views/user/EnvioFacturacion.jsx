import React, { useState, useEffect } from 'react'
import FormModal from '../../components/modals/FormModal'
import Spiner from '../../components/modals/Spiner'
import userLogic from '../../functions/logic/userLogic'
import { useSnackbar } from 'notistack'

export default function EnvioFacturacion() {
    const { enqueueSnackbar } = useSnackbar()
    const [showModal, setShowModal] = useState(false)
    const [spiner, setSpiner] = useState(false)
    const [tittle, setTittle] = useState('')
    const [defaultAddress, setDefaultAddress] = useState([])

    useEffect(() => {
        setSpiner(true)
        getAddress()
        setSpiner(false)
    }, [])

    const getAddress = async () => {
        const address = await userLogic.getAddressLogic(0, '')
        if (address.success && address.data.length > 0) {
            setDefaultAddress(address.data)
        }
    }

    const [newAddress, setNewAddress] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        province: '',
        zip: '',
    })

    const handleModalClose = () => setShowModal(false)
    const handleModalShow = () => {
        setSpiner(true)
        setTittle('Actualizar dirección de envío')
        setShowModal(true)
        setSpiner(false)
    }

    const handledSaveParam = async (event) => {
        setSpiner(true)
        event.preventDefault()
        const response = await userLogic.saveAddressLogic(event.target)
        console.log(response)
        enqueueSnackbar(response.message, {
            variant: response.variant,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        })
        setSpiner(false)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewAddress({ ...newAddress, [name]: value })
    }

    const hasAddresses = defaultAddress.name !== '' && defaultAddress.phone !== ''

    return (
        <>
            <Spiner opt={spiner} />
            <FormModal
                isOpen={showModal}
                handleCloseModal={handleModalClose}
                header={tittle}
                button={'Guardar'}
                formData={[]}
                handledSave={handledSaveParam}
                opt={'addressInvoice'}
            />
            <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Usuario</li>
                        <li className="breadcrumb-item">Envío y Facturación</li>
                    </ol>
                </div>
            </nav>
            <div className="page-content">
                <div className="container">
                    <div className="addresses">
                        {hasAddresses ? (
                            <>
                                <div className="address-card">
                                    <h3>Dirección Envío Predeterminada</h3>
                                    <div className="address-details">
                                        <p><strong>Nombre:</strong> {defaultAddress.name}</p>
                                        <p><strong>Teléfono:</strong> {defaultAddress.phone}</p>
                                        <p><strong>Dirección:</strong> {defaultAddress.address}</p>
                                        <p><strong>Ciudad:</strong> {defaultAddress.city}</p>
                                        <p><strong>Provincia:</strong> {defaultAddress.province}</p>
                                        <p><strong>Código Postal:</strong> {defaultAddress.zip}</p>
                                    </div>
                                    <button className="custom-btn edit-btn" onClick={handleModalShow}>Editar Dirección</button>
                                </div>

                                <div className="address-card">
                                    <h3>Dirección Facturación Predeterminada</h3>
                                    <div className="address-details">
                                        <p><strong>Nombre:</strong> {defaultAddress.name}</p>
                                        <p><strong>Teléfono:</strong> {defaultAddress.phone}</p>
                                        <p><strong>Dirección:</strong> {defaultAddress.address}</p>
                                        <p><strong>Ciudad:</strong> {defaultAddress.city}</p>
                                        <p><strong>Provincia:</strong> {defaultAddress.province}</p>
                                        <p><strong>Código Postal:</strong> {defaultAddress.zip}</p>
                                    </div>
                                    <button className="custom-btn edit-btn" onClick={handleModalShow}>Editar Dirección</button>
                                </div>
                            </>
                        ) : (
                            <button className="custom-btn" onClick={handleModalShow}>Agregar Dirección</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
