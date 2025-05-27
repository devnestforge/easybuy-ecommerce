import React, { useState, useEffect } from "react"
import Spiner from '../../components/modals/Spiner'
import userLogic from '../../functions/logic/userLogic'
import generalLogic from "../../functions/logic/generalLogic"
import FormModal from '../../components/modals/FormModal'
import { useSnackbar } from 'notistack'

export default function Checkout() {
    const [step, setStep] = useState("envio")
    const { enqueueSnackbar } = useSnackbar()
    const [spiner, setSpiner] = useState(false)
    const [defaultAddress, setDefaultAddress] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [discountAmount, setDiscountAmount] = useState(0)
    const [shippings, setShippings] = useState([])
    const [payMethods, setPayMethods] = useState([])
    const [bankAccounts, setBankAccounts] = useState([])
    const [selectedShipping, setSelectedShipping] = useState("")
    const [ship, setEnvio] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [tittle, setTittle] = useState('')
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [payMethod, setPayMethod] = useState(null)
    //const [shippingCost, setShippingCost] = useState(0)

    useEffect(() => {
        setSpiner(true)
        getAddress()
        getViewCart()
        getShippingMethods()
        getPayMethod()
        setSpiner(false)
    }, [])

    const getAddress = async () => {
        const address = await userLogic.getAddressLogic(0, "")
        if (address.success && address.data.length > 0) {
            const mainAddress = address.data.find(addr => addr.es_principal === "t")
            setDefaultAddress(mainAddress || null)
        }
    }

    const getPayMethod = async () => {
        const poyMethod = await generalLogic.getPayMethodLogic()
        if (poyMethod.success && poyMethod.data) {
            setPayMethods(poyMethod.data.metodoPago || [])
            setPayMethod(poyMethod.data.metodoPago[0])
            setBankAccounts(poyMethod.data.cta || [])
        } else {
            console.error('Error: No se pudieron cargar los métodos de pago.')
        }
    }

    const getShippingMethods = async () => {
        const shipping = await generalLogic.getShippingMethods()
    
        if (shipping.success && Array.isArray(shipping.data) && shipping.data.length > 0) {
            setShippings(shipping.data)
    
            const storedShippingCode = localStorage.getItem('shippingCost') || "TIPENV0001"
    
            const defaultShipping = shipping.data.find(
                (method) => method.nemonicoTiposEnvio === storedShippingCode
            ) || shipping.data[0]
    
            setSelectedShipping(defaultShipping)
            setEnvio(parseFloat(defaultShipping.costo))
            localStorage.setItem('shippingCost', defaultShipping.nemonicoTiposEnvio)
    
            const updatedCartItems = localStorage.getItem('cartItems')
            userLogic.saveViewCartLogic(updatedCartItems)
        } else {
            setShippings([])
            setSelectedShipping(null)
            setEnvio(0)
        }
    }    
    
    const getViewCart = async () => {
        const storedCartItems = localStorage.getItem("cartItems")
        if (storedCartItems) {
            const parsedCartItems = JSON.parse(storedCartItems)
            setCartItems(parsedCartItems)
            //const total = parsedCartItems.reduce((acc, item) => acc + item.quantity, 0)
            //setTotalProducts(total)
        }
        const storedDiscountAmount = localStorage.getItem("discountAmount")
        if (storedDiscountAmount) {
            setDiscountAmount(parseFloat(storedDiscountAmount))
        }
    }

    const getUnitPrice = (item) => {
        return parseFloat(item.precio_descuento) > 0 ? parseFloat(item.precio_descuento) : item.price
    }

    const goToStep = (newStep) => {
        setStep(newStep)
    }

    const calculateTotals = () => {
        let subtotalIva15 = 0
        let subtotalIva0 = 0
        let totalIva = 0
        let totalIvaDescuento = 0

        cartItems.forEach((item) => {
            const unitPrice = getUnitPrice(item)
            const subtotal = unitPrice * item.quantity

            // Si el producto tiene tarifa (IVA 15%)
            if (item.tarifa > 0) {
                subtotalIva15 += subtotal
                totalIva += ((unitPrice * parseFloat(item.tarifa) / 100) * item.quantity)

                // Aplicar el IVA de descuento si hay
                if (parseFloat(item.iva_descuento) > 0) {
                    totalIvaDescuento += (parseFloat(item.iva_descuento) * item.quantity)
                }
            } else {
                subtotalIva0 += subtotal
            }
        })

        return { subtotalIva15, subtotalIva0, totalIva, totalIvaDescuento }
    }


    const { subtotalIva15, subtotalIva0, totalIva, totalIvaDescuento } = calculateTotals()

    const envio = ship
    const totalIvaFinal = totalIva
    const totalGeneral = subtotalIva15 + subtotalIva0 + totalIvaFinal + envio - discountAmount

    const handleShippingChange = (event) => {
        const selectedId = event.target.value
        const selected = shippings.find((method) => method.id === selectedId)
        if (selected) {
            setSelectedShipping(selected)
            setEnvio(parseFloat(selected.costo))
            //setShippingCost(selected.costo)
            localStorage.setItem('shippingCost', selected.nemonicoTiposEnvio)
            const updatedCartItems = localStorage.getItem('cartItems')
            userLogic.saveViewCartLogic(updatedCartItems)
        }
    }

    const handlePaymentMethodSelect = (method) => {
        //console.log(method)
        setPayMethod(method)
    }

    const handleModalClose = () => {
        setShowModal(false)
        setSelectedAddress(null)
    }

    const handleModalShow = (address) => {
        setSpiner(true)
        setTittle('Actualizar dirección de envío')
        setSelectedAddress(address.defaultAddress)
        setShowModal(true)
        setSpiner(false)
        getAddress()
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

    const saveOrder = async (event) => {
        setSpiner(true)
        event.preventDefault()
        const linkRastreo = window.location.origin + '' + global.ORDERCRASTREO;
        const linkOrderDetail = window.location.origin + '' + global.ORDERDETAIL;
        const linkOrderConfirm = window.location.origin + '' + global.ORDERCONFIRM;
        const response = await userLogic.saveOrderLogic(payMethod, linkRastreo, linkOrderDetail, linkOrderConfirm)
        enqueueSnackbar(response.data.message, {
            variant: response.variant,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        })
        if (response.success) {
            window.location.href = response.data.url;
            localStorage.removeItem('cartItems');
            localStorage.removeItem('discountAmount');
            localStorage.removeItem('discountCode');
            localStorage.removeItem('envio');
            localStorage.removeItem('shippingCost');
        }
        setSpiner(false)
    }

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
            <main className="main">
                <div className="page-content">
                    <div className="checkout">
                        <div className="container summary">
                            {/* Tabs Navigation */}
                            <div className="checkout-tabs mb-1">
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${step === "envio" ? "active" : ""}`}
                                            onClick={() => goToStep("envio")}
                                        >
                                            1. Envío{" "}
                                            {step === "pago" && <span className="check-icon">✔</span>}
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${step === "pago" ? "active" : ""}`}
                                            onClick={() => goToStep("pago")}
                                            disabled={step === "envio"}
                                        >
                                            2. Pago
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {step === "envio" && (
                                <div className="row gx-4 gy-4">
                                    {/* Panel Izquierdo */}
                                    <div className="col-12 col-md-8">
                                        <div className="summary mb-1">
                                            <h3 className="summary-title">Dirección de Envío</h3>
                                            {defaultAddress && defaultAddress.id ? (
                                                <div>
                                                    <p><strong>{defaultAddress.nombres} {defaultAddress.apellidos}</strong></p>
                                                    <p>{defaultAddress.direccion}, {defaultAddress.codigo_postal || "Sin código postal"}</p>
                                                    <p>Provincia {defaultAddress.provincia_name}, Ciudad {defaultAddress.canton_name}</p>
                                                    <p>{defaultAddress.telefono_contacto || "Sin teléfono de contacto"}</p>
                                                    <p>{defaultAddress.referencia || "Sin referencia"}</p>
                                                    <p>Esta es tu dirección de envío por defecto</p>
                                                </div>
                                            ) : (
                                                <p>No tienes una dirección principal configurada, para continuar con la compra ingresa una</p>
                                            )}

                                            <br />
                                            <hr className="linea" />
                                            <div className="row gx-4 gy-4">
                                                {defaultAddress && defaultAddress.id && (
                                                    <div className="col-12 col-md-3">
                                                        <button
                                                            className="btn btn-primary mt-1"
                                                            onClick={() => handleModalShow({ defaultAddress })}
                                                        >
                                                            Editar dirección
                                                        </button>
                                                    </div>
                                                )
                                                }
                                                < div className="col-12 col-md-6">
                                                    <button
                                                        className="btn btn-info mt-1"
                                                        onClick={() => handleModalShow({})}
                                                    >
                                                        Nueva dirección
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="summary mb-1">
                                            <h3 className="summary-title">Métodos de Envío</h3>
                                            <div className="shipping-methods">
                                                {shippings.map((shipping) => (
                                                    <div
                                                        key={shipping.id}
                                                        className="shipping-option"
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            padding: "10px",
                                                            marginBottom: "10px",
                                                            border: "1px solid #ddd",
                                                            borderRadius: "5px",
                                                            backgroundColor:
                                                                selectedShipping?.id === shipping.id
                                                                    ? "#f8f9fa"
                                                                    : "white",
                                                        }}
                                                    >
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="shippingMethod"
                                                            id={`shipping-${shipping.id}`}
                                                            value={shipping.id}
                                                            onChange={handleShippingChange}
                                                            checked={selectedShipping?.id === shipping.id}
                                                            style={{ marginRight: "10px" }}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`shipping-${shipping.id}`}
                                                            style={{ fontSize: "14px", fontWeight: "500" }}
                                                        >
                                                            <strong>{shipping.nombre}</strong> - ${shipping.costo} ({parseInt(shipping.dias)} días)
                                                            <br />
                                                            <span style={{ fontSize: "12px", color: "#6c757d" }}>
                                                                {shipping.descripcion}
                                                            </span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Panel Derecho */}
                                    <div className="col-12 col-md-4">
                                        <div className="summary order-summary">
                                            <h3 className="summary-title">Resumen de tu pedido</h3>
                                            <div className="order-summary-totals">
                                                <p>
                                                    <span>Subtotal IVA 15%:</span>
                                                    <span>${subtotalIva15.toFixed(2)}</span>
                                                </p>
                                                <p>
                                                    <span>Subtotal IVA 0%:</span>
                                                    <span>${subtotalIva0.toFixed(2)}</span>
                                                </p>
                                                <p>
                                                    <span>IVA Total:</span>
                                                    <span>${totalIva.toFixed(2)}</span>
                                                </p>
                                                <p>
                                                    <span>
                                                        Envío:{" "}
                                                        {selectedShipping ? selectedShipping.nombre : "No seleccionado"}
                                                    </span>
                                                    <span>${ship.toFixed(2)}</span>
                                                </p>
                                                {discountAmount > 0 && (
                                                    <p>
                                                        <span>Descuento aplicado:</span>
                                                        <span>-${discountAmount.toFixed(2)}</span>
                                                    </p>
                                                )}
                                                <hr className="order-summary-line" />
                                                <p className="order-summary-total">
                                                    <span>Total:</span>
                                                    <span>${totalGeneral.toFixed(2)}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="summary">
                                            <h3 className="summary-title">Carrito ({cartItems.length} productos)</h3>
                                            <ul className="order-items">
                                                {cartItems.map((item) => {
                                                    const unitPrice = parseFloat(item.precio_descuento) > 0 ? parseFloat(item.precio_descuento) : item.price
                                                    const originalPrice = parseFloat(item.price) // Precio original

                                                    return (
                                                        <li key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                                            <img
                                                                src={`${global.IMGProd}${item.imageUrl}`}
                                                                alt={item.name}
                                                                style={{ width: "50px", height: "50px", marginRight: "10px", objectFit: "cover" }}
                                                            />
                                                            <div>
                                                                <p>
                                                                    <strong>{item.name}</strong>
                                                                </p>
                                                                <p>Cantidad: {item.quantity}</p>
                                                                <p>
                                                                    {unitPrice < originalPrice ? (
                                                                        <>
                                                                            <span
                                                                                style={{
                                                                                    textDecoration: "line-through",
                                                                                    color: "red",
                                                                                    marginRight: "10px"
                                                                                }}
                                                                            >
                                                                                ${originalPrice.toFixed(2)}
                                                                            </span>
                                                                            <span>Descuento: ${unitPrice.toFixed(2)}</span>
                                                                        </>
                                                                    ) : (
                                                                        <span>Precio: ${originalPrice.toFixed(2)}</span>
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                            <hr className="linea" />
                                        </div>
                                    </div>

                                    {defaultAddress && defaultAddress.id && (
                                        <div className="col-12 col-md-4">
                                            <button
                                                className="btn btn-primary w-100"
                                                onClick={() => goToStep("pago")}
                                            >
                                                Continuar a Pago
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {step === "pago" && (
                                <div className="row gx-4 gy-4">
                                    <div className="col-12 col-md-8">
                                        <div className="payment-methods">
                                            <div className="accordion-summary" id="accordion-payment">
                                                <div className="summary">
                                                    <h3 className="summary-title">Método de Pago</h3>
                                                    <div className="card-body">
                                                        <div className="payment-methods">
                                                            <div className="accordion-summary" id="accordion-payment">
                                                                {payMethods.map((method, index) => (
                                                                    <div className="card" key={method.nemonico_metodos_pago}>
                                                                        <div className="card-header" id={`heading-${index + 1}`}>
                                                                            <h2 className="card-title">
                                                                                <a
                                                                                    role="button"
                                                                                    data-toggle="collapse"
                                                                                    href={`#collapse-${index + 1}`}
                                                                                    aria-expanded={index === 0}
                                                                                    aria-controls={`collapse-${index + 1}`}
                                                                                    onClick={() => handlePaymentMethodSelect(method)}
                                                                                    className={index === 0 ? "" : "collapsed"}
                                                                                >
                                                                                    {method.nombre}
                                                                                </a>
                                                                            </h2>
                                                                        </div>
                                                                        <div
                                                                            id={`collapse-${index + 1}`}
                                                                            className={`collapse ${index === 0 ? "show" : ""}`}
                                                                            aria-labelledby={`heading-${index + 1}`}
                                                                            data-parent="#accordion-payment"
                                                                        >
                                                                            <div className="card-body">
                                                                                <p>{method.descripcion}</p>
                                                                                {method.nombre === "Transferencia bancaria" && bankAccounts.length > 0 && (
                                                                                    <div>
                                                                                        <div className="bank-accounts">
                                                                                            {bankAccounts.map((account) => (
                                                                                                <div className="bank-account-card" key={account.nemonico_cta_bank}>
                                                                                                    <div className="bank-account-header">
                                                                                                        <h5>{account.banco}</h5>
                                                                                                        <span>{account.tipo_cta}</span>
                                                                                                    </div>
                                                                                                    <div className="bank-account-details">
                                                                                                        <p><strong>Número de cuenta:</strong> {account.num_cta}</p>
                                                                                                        <p><strong>Titular:</strong> {account.nombres}</p>
                                                                                                        <p><strong>Identificación:</strong> {account.identificacion}</p>
                                                                                                        <p><strong>Correo:</strong> {account.correo}</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            ))}
                                                                                        </div>

                                                                                        <br />
                                                                                        <h5>Cuando generes la orden dirígete a tus ordenes pendientes y podrás subir tu comprobante de trasnferencia</h5>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <h3 className="summary-title">Finaliza tu pedido</h3>
                                                        <div className="col-12 col-md-4">
                                                            <button
                                                                className="btn btn-primary w-100"
                                                                onClick={(e) => saveOrder(e)}
                                                            >
                                                                Finalizar pedido
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="summary order-summary">
                                            <h3 className="summary-title">Resumen de tu pedido</h3>
                                            <div className="order-summary-totals">
                                                <p>
                                                    <span>Subtotal IVA 15%:</span>
                                                    <span>${subtotalIva15.toFixed(2)}</span>
                                                </p>
                                                <p>
                                                    <span>Subtotal IVA 0%:</span>
                                                    <span>${subtotalIva0.toFixed(2)}</span>
                                                </p>
                                                <p>
                                                    <span>IVA Total:</span>
                                                    <span>${totalIva.toFixed(2)}</span>
                                                </p>
                                                <p>
                                                    <span>
                                                        Envío:{" "}
                                                        {selectedShipping ? selectedShipping.nombre : "No seleccionado"}
                                                    </span>
                                                    <span>${ship.toFixed(2)}</span>
                                                </p>
                                                {discountAmount > 0 && (
                                                    <p>
                                                        <span>Descuento aplicado:</span>
                                                        <span>-${discountAmount.toFixed(2)}</span>
                                                    </p>
                                                )}
                                                <hr className="order-summary-line" />
                                                <p className="order-summary-total">
                                                    <span>Total:</span>
                                                    <span>${totalGeneral.toFixed(2)}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main >
        </>
    )
}
