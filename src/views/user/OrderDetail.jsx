import React, { useState, useEffect } from "react"
import Spiner from '../../components/modals/Spiner'
import userLogic from '../../functions/logic/userLogic'
import generalLogic from "../../functions/logic/generalLogic"
import { useSearchParams } from 'react-router-dom';

export default function OrderDtail() {
    const [searchParams] = useSearchParams();
    const [spiner, setSpiner] = useState(false)
    const [defaultAddress, setDefaultAddress] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [discountAmount, setDiscountAmount] = useState(0)
    const [shippings, setShippings] = useState([])
    const [selectedShipping, setSelectedShipping] = useState("")
    const [ship, setEnvio] = useState(0)
    const order = searchParams.get('orden');
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
        getShippingMethods()
        getPayMethod()
        setSpiner(false)
    }, [])

    const getAddress = async () => {
        const address = await userLogic.getAddressLogic(0, "")
        if (address.success && address.data.length > 0) {
            const mainAddress = address.data.find(addr => addr.es_principal === "t")
            console.log(mainAddress)
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

    const getShippingMethods = async () => {
        const shipping = await generalLogic.getShippingMethods()
        if (shipping.success && shipping.data.length > 0) {
            setShippings(shipping.data)
            const storedShippingCost = localStorage.getItem('shippingCost')
            let defaultShippingCost = ""
            if (storedShippingCost) {
                defaultShippingCost = storedShippingCost
            } else {
                defaultShippingCost = "TIPENV0001"
            }
            const defaultShipping = shipping.data.find(
                (method) => method.nemonicoTiposEnvio === defaultShippingCost
            )
            setSelectedShipping(defaultShipping || null)
            setEnvio(parseFloat(defaultShipping?.costo || 0))
        }
    }

    const getViewCartByCode = async () => {
        const viewcartDetail = await userLogic.getWiewcartByCodeLogic(order)
        console.log(viewcartDetail.data.checkout_det)
        //const storedCartItems = localStorage.getItem("cartItems")
        if (viewcartDetail.data.checkout_det) {
            const parsedCartItems = viewcartDetail.data.checkout_det
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

                                    <div className="summary mb-1">
                                        {selectedShipping && shippings.some(shipping => shipping.id === selectedShipping.id) && (
                                            <>
                                                <h3 className="summary-title">Métodos de  y pago</h3>
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
                                            </>
                                        )}
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
