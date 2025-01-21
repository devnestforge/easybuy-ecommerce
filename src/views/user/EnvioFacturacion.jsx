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
        if(response.success) {
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
        if(response.success) {
            setShowModal(false)
            window.location.reload();
        }
        setSpiner(false)
    }

    const handleTabClick = (tabId) => {
        setActiveTab(tabId)
        console.log(`Tab seleccionada: ${tabId}`)
    }


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
                        <li className="breadcrumb-item">Envío y Facturación</li>
                    </ol>
                </div>
            </nav>
            <div className="page-content">
                <div className="container">
                    <div className="col-md-12">
                        <ul className="nav nav-tabs nav-tabs-bg justify-content-center" id="tabs-3" role="tablist">
                            <li className="nav-item">
                                <a  href="!#"
                                    className={`nav-link ${activeTab === 'tab-9' ? 'active' : ''}`}
                                    id="tab-9-tab"
                                    onClick={() => handleTabClick('tab-9')}
                                    role="tab"
                                    aria-controls="tab-9"
                                    aria-selected={activeTab === 'tab-9'}
                                >
                                    Direcciones de envío
                                </a>
                            </li>
                            <li className="nav-item">
                                <a  href="!#"
                                    className={`nav-link ${activeTab === 'tab-10' ? 'active' : ''}`}
                                    id="tab-10-tab"
                                    onClick={() => handleTabClick('tab-10')}
                                    role="tab"
                                    aria-controls="tab-10"
                                    aria-selected={activeTab === 'tab-10'}
                                >
                                    Direcciones de facturación
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content tab-content-border" id="tab-content-3">
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
                                                    <p><strong>Ciudad:</strong> {address.ciudad}</p>
                                                    <p><strong>Provincia:</strong> {address.provincia}</p>
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
                            <div className={`tab-pane fade ${activeTab === 'tab-10' ? 'show active' : ''}`} id="tab-10" role="tabpanel" aria-labelledby="tab-10-tab">
                                <p>Nobis perspiciatis natus cum, sint dolore earum rerum tempora aspernatur numquam velit tempore omnis, delectus repellat facere voluptatibus nemo non fugiat consequatur repellendus! Enim, commodi, veniam ipsa voluptates quis amet.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
