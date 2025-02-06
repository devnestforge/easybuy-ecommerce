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
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [activeTab, setActiveTab] = useState("tab-9")

    useEffect(() => {
        setSpiner(true)
        getAddress()
        setSpiner(false)
    }, [])

    const getAddress = async () => {
        const address = await userLogic.getAddressLogic(0, '')
        if (address.success && address.data.length > 0) {
            // Ordenar las direcciones para mostrar primero la principal
            const sortedAddresses = address.data.sort((a, b) => b.es_principal.localeCompare(a.es_principal))
            setDefaultAddress(sortedAddresses)
        }
    }

    const handleModalClose = () => {
        setShowModal(false)
        setSelectedAddress(null)
    }

    const handleModalShow = (address) => {
        setSpiner(true)
        setTittle('Actualizar dirección de envío')
        setSelectedAddress(address)
        setShowModal(true)
        setSpiner(false)
    }

    const handledSaveParam = async (event) => {
        setSpiner(true)
        event.preventDefault()
        const response = await userLogic.saveAddressLogic(event.target)
        enqueueSnackbar(response.message, {
            variant: response.variant,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        })
        if (response.success) {
            setShowModal(false)
            window.location.reload();
        }
        setSpiner(false)
    }

    const togglePrincipal = async (id) => {
        // Actualizar el estado para marcar el seleccionado como principal
        const updatedAddresses = defaultAddress.map((address) => ({
            ...address,
            es_principal: address.id === id ? 't' : 'f',
        }))
        // Reordenar para asegurar que el principal aparezca primero
        const sortedAddresses = updatedAddresses.sort((a, b) => b.es_principal.localeCompare(a.es_principal))
        setDefaultAddress(sortedAddresses)
        const selectedAddress = defaultAddress.find(address => address.id === id)
        setSpiner(true)
        const response = await userLogic.savePrincipalLogic(selectedAddress)
        enqueueSnackbar(response.message, {
            variant: response.variant,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        })
        if (response.success) {
            setShowModal(false)
            window.location.reload();
        }
        setSpiner(false)
    }

    /*const handleTabClick = (tabId) => {
        setActiveTab(tabId)
        console.log(`Tab seleccionada: ${tabId}`)
    }*/


    const hasAddresses = defaultAddress.length > 0

    return (
        <>
            <Spiner opt={spiner} />
            <FormModal
                isOpen={showModal}
                handleCloseModal={handleModalClose}
                header={tittle}
                button={'Guardar'}
                formData={selectedAddress || {}}
                handledSave={handledSaveParam}
                opt={'addressInvoice'}
            />
            <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Usuario</li>
                    </ol>
                </div>
            </nav>
            <div className="page-content">
                <div className="container summary">
                    <div className="col-md-12">
                    <button className="custom-btn" onClick={() => handleModalShow({})}>Agregar Dirección</button>
                        <div className={`tab-pane fade ${activeTab === 'tab-9' ? 'show active' : ''}`} id="tab-9" role="tabpanel" aria-labelledby="tab-9-tab">
                            <div className="addresses">
                                {hasAddresses ? (
                                    defaultAddress.map((address) => (
                                        <div key={address.id} className="address-card">
                                            <h3>Dirección Envío</h3>
                                            <div className="address-details">
                                                {address.es_principal === 't' && (
                                                    <p className="label-principal"><strong>Principal</strong></p>
                                                )}
                                                <p><strong>Nombre:</strong> {address.nombres}</p>
                                                <p><strong>Teléfono:</strong> {address.telefono_contacto}</p>
                                                <p><strong>Dirección:</strong> {address.direccion}</p>
                                                <p><strong>Ciudad:</strong> {address.canton_name}</p>
                                                <p><strong>Provincia:</strong> {address.provincia_name}</p>
                                                <p><strong>Código Postal:</strong> {address.codigo_postal}</p>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={address.es_principal === 't'}
                                                        onChange={() => togglePrincipal(address.id)}
                                                    />
                                                    Seleccionar como principal
                                                </label>
                                            </div>
                                            <button
                                                className="custom-btn edit-btn"
                                                onClick={() => handleModalShow(address)}
                                            >
                                                Editar Dirección
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <button className="custom-btn" onClick={() => handleModalShow({})}>Agregar Dirección</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
