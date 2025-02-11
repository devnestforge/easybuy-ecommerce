import React, { useState, useEffect } from "react"
import Spiner from '../../components/modals/Spiner'
import userLogic from '../../functions/logic/userLogic'
import generalLogic from "../../functions/logic/generalLogic"
import { useSearchParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

export default function OrderDtail() {
    const [searchParams] = useSearchParams();
    const [spiner, setSpiner] = useState(false)
    const [defaultAddress, setDefaultAddress] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [discountAmount, setDiscountAmount] = useState(0)
    const [shippings, setShippings] = useState([])
    const [checkoutPago, setCheckoutpago] = useState([])
    const [selectedShipping, setSelectedShipping] = useState("")
    const [ship, setEnvio] = useState(0)
    const order = searchParams.get('orden');
    const [comprobanteUrl, setComprobanteUrl] = useState(checkoutPago?.archivo_adjunto || '')
    const baseUrl = global.IMGProd
    const { enqueueSnackbar } = useSnackbar()
    const [fechaPago, setFechaPago] = useState('')
    //const [shippingCost, setShippingCost] = useState(0)

    useEffect(() => {
        setSpiner(true)
        const token = localStorage.getItem('authToken')
        const isLoggedIn = !!token
        if (!isLoggedIn) {
            window.location.href = global.HOME;
        }
        getAddress()
        getViewCartByCode()
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
        } else {
            console.error('Error: No se pudieron cargar los métodos de pago.')
        }
    }

    const getViewCartByCode = async () => {
        const viewcartDetail = await userLogic.getWiewcartByCodeLogic(order)

        if (viewcartDetail.data.checkout_det) {
            const parsedCartItems = viewcartDetail.data.checkout_det
            const envio = viewcartDetail?.data?.checkout?.[0]?.["envio"];
            setEnvio(envio ? parseInt(envio, 10) || 0 : 0);
            setCartItems(parsedCartItems)
            setCheckoutpago(viewcartDetail.data.checkoutPago[0])
            setComprobanteUrl(viewcartDetail.data.checkoutPago[0].archivo_adjunto)
            if (viewcartDetail?.data?.checkoutPago?.[0]?.fecha_pago) {
                const split = viewcartDetail.data.checkoutPago[0].fecha_pago.split(" ")
                setFechaPago(split[0])
            } else {
                setFechaPago("")
            }

            getShippingMethods(viewcartDetail.data.checkout[0]["envio_id"])

        }
        const storedDiscountAmount = localStorage.getItem("discountAmount")
        if (storedDiscountAmount) {
            setDiscountAmount(parseFloat(storedDiscountAmount))
        }
    }

    const getShippingMethods = async (envioDef) => {
        const shipping = await generalLogic.getShippingMethods()
        if (shipping.success && shipping.data.length > 0) {
            setShippings(shipping.data)
            let defaultShippingCost = envioDef
            const defaultShipping = shipping.data.find(
                (method) => method.nemonicoTiposEnvio === defaultShippingCost
            )
            setSelectedShipping(defaultShipping || null)
            setEnvio(parseFloat(defaultShipping?.costo || 0))
        }
    }

    const getUnitPrice = (item) => {
        return parseFloat(item.precio_descuento) > 0 ? parseFloat(item.precio_descuento) : item.price
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

    const handleFileChange = async (event) => {
        setSpiner(true)
        if (!fechaPago) {
            enqueueSnackbar('Selecciona una fecha de pago', {
                variant: 'warning',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
        } else {
            const selectedFile = event.target.files[0]
            console.log(selectedFile)
            if (!selectedFile) return

            try {
                const response = await userLogic.saveComprobantePagoLogic(selectedFile, fechaPago, order)
                enqueueSnackbar(response.message, {
                    variant: response.variant,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
                if (!response.error) {
                    setComprobanteUrl(response.data.data.url)
                }
            } catch (error) {
                enqueueSnackbar('Hubo un error al enviar el comprobante de pago.', {
                    variant: 'danger',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }
        }
        setSpiner(false)
    }

    const renderPaymentSection = () => {
        console.log(checkoutPago)
        if (checkoutPago && checkoutPago.nemonico_pago === 'METPA0004') {
            return (
                <div>
                    <h3 className="summary-title">
                        Método de Pago
                    </h3>
                    <div className="card-body">
                        {comprobanteUrl ? (
                            <>
                                <div className="row">
                                    {/* Sección para subir el comprobante */}
                                    <div className="col-md-6">
                                        <label>Comprobante(Transferencia)</label>
                                        <input type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="fechaNacimiento">Fecha de pago</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="fechaNacimiento"
                                            name="fechaNacimiento"
                                            value={fechaPago}
                                            onChange={e => {
                                                setFechaPago(e.target.value);
                                                localStorage.setItem('fechaNaci', e.target.value);
                                            }}
                                            required
                                        />
                                    </div>

                                    {/* Sección para mostrar la imagen y botón de descarga */}
                                    <div className="col-md-6 text-center mt-3">
                                        <p><strong>Comprobante de pago:</strong></p>
                                        <a href={baseUrl + comprobanteUrl} target="_blank" rel="noopener noreferrer">
                                            <img src={baseUrl + comprobanteUrl} alt="Comprobante de pago" className="img-fluid rounded border" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                        </a>
                                        <br />
                                        <a target='_blank' rel="noreferrer" href={baseUrl + comprobanteUrl} download className="btn btn-primary mt-2">Descargar Comprobante</a>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Comprobante de pago (Transferencia)</label>
                                        <input type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="fechaNacimiento">Fecha de pago</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="fechaNacimiento"
                                            name="fechaNacimiento"
                                            value={fechaPago}
                                            onChange={e => {
                                                setFechaPago(e.target.value);
                                                localStorage.setItem('fechaNaci', e.target.value);
                                            }}
                                            required
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )
        } else if (checkoutPago && checkoutPago.nemonico_pago === 'METPA0001') {
            return (
                <div className="card mt-3">
                    <div className="card-header">
                        <h5>Método de Pago</h5>
                    </div>
                    <div className="card-body">
                        <p><strong>Efectivo</strong></p>
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            <Spiner opt={spiner} />
            <main className="main">
                <div className="page-content">
                    <div className="checkout">
                        <div className="container summary">
                            <div className="row gx-4 gy-4">
                                {/* Panel Izquierdo */}
                                <div className="col-12 col-md-8">

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
                                    <div className="summary">
                                        {renderPaymentSection()}
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
                                                    {checkoutPago.envio}
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


                                    <div className="summary mb-1">
                                        <h3 className="summary-title">Dirección de Envío</h3>
                                        {defaultAddress ? (
                                            <div>
                                                <p>
                                                    <strong>{defaultAddress.nombres} {defaultAddress.apellidos}</strong>
                                                </p>
                                                <p>{defaultAddress.direccion}, {defaultAddress.codigo_postal || "Sin código postal"}</p>
                                                <p>Provincia {defaultAddress.provincia_name}, Ciudad {defaultAddress.canton_name}</p>
                                                <p>{defaultAddress.telefono_contacto || "Sin teléfono de contacto"}</p>
                                                <p>{defaultAddress.referencia || "Sin teléfono de contacto"}</p>
                                                <p>Esta es tu dirección de envío por defecto</p>
                                            </div>
                                        ) : (
                                            <p>No tienes una dirección principal configurada.</p>
                                        )}
                                        <br />
                                        <hr class="linea" />
                                    </div>


                                    {selectedShipping && shippings.some(shipping => shipping.id === selectedShipping.id) && (
                                        <>
                                            <div className="summary mb-1">
                                                <h3 className="summary-title">Método de envío</h3>
                                                <div className="shipping-methods">
                                                    {shippings.map((shipping) => (
                                                        selectedShipping.id === shipping.id && (
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
                                                                        selectedShipping?.id === shipping.id ? "#f8f9fa" : "white",
                                                                }}
                                                            >
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
                                                        )
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
