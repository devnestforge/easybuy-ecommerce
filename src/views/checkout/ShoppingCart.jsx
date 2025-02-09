import React, { useState, useEffect } from 'react'
import Recomendations from '../home/Recomendations'
import Spiner from '../../components/modals/Spiner'
import productsLogic from '../../functions/logic/productsLogic'
import t from '../../translations/i18n'
import generalLogic from '../../functions/logic/generalLogic'
import { useSnackbar } from 'notistack'
import userLogic from '../../functions/logic/userLogic'

export default function ShoppingCart() {

    const [cartItems, setCartItems] = useState([])
    const [load, setLoad] = useState(false)
    const [prod, setProd] = useState(true)
    const [prodInfo, setProdInfo] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [shippingCost, setShippingCost] = useState(0)
    const [discountCode, setDiscountCode] = useState('')
    const [discountApplied, setDiscountApplied] = useState(false)
    const [discountAmount, setDiscountAmount] = useState(0)
    const [shippings, setShippings] = useState([])
    const [selectedShipping, setSelectedShipping] = useState("")
    const [ship, setEnvio] = useState(0)
    const { enqueueSnackbar } = useSnackbar()

    const getProducts = async () => {
        const products = await productsLogic.getProductsLogic(0, '')
        if (products.success && products.data.length > 0) {
            setProd(true)
            setProdInfo(products.data)
        }
    }

    useEffect(() => {
        setLoad(true)
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || []
        const validatedCartItems = storedCartItems.map(item => ({
            ...item,
            price: parseFloat(item.price) || 0,
            quantity: parseInt(item.quantity) || 1,
            tarifa: parseFloat(item.tarifa) || 0,
        }))
        setCartItems(validatedCartItems)

        const storedDiscountCode = localStorage.getItem('discountCode')
        const storedDiscountAmount = localStorage.getItem('discountAmount')

        if (storedDiscountCode && storedDiscountAmount) {
            setDiscountCode(storedDiscountCode)
            setDiscountApplied(true)
            setDiscountAmount(parseFloat(storedDiscountAmount))
        }

        const storedShippingCost = localStorage.getItem('shippingCost')
        if (storedShippingCost) {
            setShippingCost(parseFloat(storedShippingCost))
        }

        getProducts()
        getShippingMethods()
        const token = localStorage.getItem('authToken')
        setIsLoggedIn(!!token)
        setLoad(false)
    }, [])

    const getShippingMethods = async () => {
        setLoad(true)
        const shipping = await generalLogic.getShippingMethods()
        if (shipping.success && shipping.data.length > 0) {
            setShippings(shipping.data)
            const storedShippingCost = localStorage.getItem('shippingCost')
            let defaultShippingCost = "";
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
            setShippingCost(defaultShipping.costo)
        }
        setLoad(false)
    }

    const handleQuantityChange = async (index, newQuantity) => {
        setLoad(true)
        const updatedCartItems = [...cartItems]
        updatedCartItems[index].quantity = newQuantity
        const ivaRate = updatedCartItems[index].tarifa
        let iva = 0
        if (ivaRate !== 0) {
            iva = (updatedCartItems[index].price * ivaRate / 100 * newQuantity).toFixed(2)
        }
        const total = (updatedCartItems[index].price * newQuantity + parseFloat(iva)).toFixed(2)

        updatedCartItems[index].iva = parseFloat(iva)
        updatedCartItems[index].total = parseFloat(total)
        if (isLoggedIn) {
            const response = await userLogic.saveViewCartLogic(updatedCartItems)
            setLoad(false)
            enqueueSnackbar(response.data.message, {
                variant: response.variant,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
            if (response.success) {
                setCartItems(updatedCartItems)
                localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
                //userLogic.saveViewCartLogic(updatedCartItems)
            }
        } else {
            setCartItems(updatedCartItems)
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
        }
        setLoad(false)
    }

    const handleRemoveItem = (index) => {
        setLoad(true)
        const updatedCartItems = cartItems.filter((_, i) => i !== index)
        setCartItems(updatedCartItems)
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
        userLogic.saveViewCartLogic(updatedCartItems)
        setLoad(false)
    }

    const calculateSubtotals = () => {
        let subtotalIVA15 = 0
        let subtotalIVA12 = 0
        let subtotalIVA0 = 0
        let totalIVA = 0

        if (Array.isArray(cartItems)) {
            cartItems.forEach(item => {
                const itemPrice = parseFloat(item.precio_descuento) > 0
                    ? parseFloat(item.precio_descuento)
                    : parseFloat(item.price)
                const itemQuantity = parseInt(item.quantity) || 0
                const itemTarifa = parseFloat(item.tarifa) || 0
                const itemIVA = parseFloat(item.iva) || 0

                const subtotal = itemPrice * itemQuantity

                if (itemTarifa === 15) {
                    subtotalIVA15 += subtotal
                } else if (itemTarifa === 12) {
                    subtotalIVA12 += subtotal
                } else {
                    subtotalIVA0 += subtotal
                }

                // Acumular el total de IVA
                totalIVA += itemIVA * itemQuantity
            })
        }

        return {
            subtotalIVA15: subtotalIVA15.toFixed(2),
            subtotalIVA12: subtotalIVA12.toFixed(2),
            subtotalIVA0: subtotalIVA0.toFixed(2),
            totalIVA: totalIVA.toFixed(2),
        }
    }

    const calculateTax = () => {
        let totalTax = 0

        if (Array.isArray(cartItems)) {
            cartItems.forEach(item => {
                // Usar el precio con descuento si está disponible, de lo contrario usar el precio original
                const itemPrice = parseFloat(item.precio_descuento) > 0
                    ? parseFloat(item.precio_descuento)
                    : parseFloat(item.price) || 0

                const itemQuantity = parseInt(item.quantity) || 0
                const itemTarifa = parseFloat(item.tarifa) || 0 // Tarifa del producto (porcentaje de IVA)

                // Calcular el impuesto solo para productos gravados
                if (itemTarifa > 0) {
                    totalTax += itemPrice * itemQuantity * itemTarifa / 100
                }
            })
        }

        return totalTax.toFixed(2)
    }

    const calculateTotal = () => {
        const { subtotalIVA15, subtotalIVA12, subtotalIVA0 } = calculateSubtotals()
        const tax = parseFloat(calculateTax()) || 0
        const shipping = parseFloat(shippingCost) || 0
        const discount = parseFloat(discountAmount) || 0

        return (
            parseFloat(subtotalIVA15) +
            parseFloat(subtotalIVA12) +
            parseFloat(subtotalIVA0) +
            tax +
            shipping -
            discount
        ).toFixed(2)
    }

    /*const handleShippingChange2 = (event) => {
        const selectedShipping = event.target.id
        let newShippingCost = 0

        if (selectedShipping === "standart-shipping") {
            newShippingCost = 10
        } else if (selectedShipping === "express-shipping") {
            newShippingCost = 20
        } else {
            newShippingCost = 0
        }
        setShippingCost(newShippingCost)
        localStorage.setItem('shippingCost', newShippingCost)

    }*/

    const handleShippingChange = (event) => {
        setLoad(true)
        const selectedId = event.target.value;
        const selected = shippings.find((method) => method.id === selectedId);
        if (selected) {
            setSelectedShipping(selected);
            setEnvio(parseFloat(selected.costo));
            setShippingCost(selected.costo)
            localStorage.setItem('shippingCost', selected.nemonicoTiposEnvio)
            const updatedCartItems = localStorage.getItem('cartItems')
            userLogic.saveViewCartLogic(updatedCartItems)
        }
        setLoad(false)
    }

    const applyDiscount = async (code) => {
        setLoad(true)
        let discountPercentage = 0
        const discount = await generalLogic.getDiscountLogic(code)
        if (discount.success && discount.data.length > 0) {
            discountPercentage = parseFloat(discount.data[0]["descuento"])
            if (discountPercentage > 0) {
                const updatedCartItems = cartItems.map(item => {
                    const itemPrice = parseFloat(item.price) || 0
                    const itemTarifa = parseFloat(item.tarifa) || 0
                    const itemQuantity = parseInt(item.quantity) || 0
                    const discountedPrice = itemPrice - (itemPrice * discountPercentage / 100)
                    const itemIVA = itemTarifa > 0 ? discountedPrice * (itemTarifa / 100) : 0
                    const total = (discountedPrice + itemIVA) * itemQuantity
                    return {
                        ...item,
                        discountedPrice: discountedPrice.toFixed(2),
                        iva: itemIVA.toFixed(2),
                        total: total.toFixed(2)
                    }
                })

                // Actualizar el carrito con los nuevos precios
                setCartItems(updatedCartItems)
                setDiscountCode(code)
                setDiscountApplied(true)
                setDiscountAmount(discountPercentage)
                localStorage.setItem('discountCode', code)
                localStorage.setItem('discountAmount', discountPercentage.toString())
            } else {
                setDiscountApplied(false)
                setDiscountAmount(0)
                localStorage.removeItem('discountCode')
                localStorage.removeItem('discountAmount')
            }
        } else {
            enqueueSnackbar('No existe el código de oferta ingresado', {
                variant: "warning",
                anchorOrigin: {
                    vertical: global.SNACKBARVER,
                    horizontal: global.SNACKBARHOR
                }
            })
        }
        setLoad(false)
    }


    const handleDiscountChange = (e) => {
        const code = e.target.value
        setDiscountCode(code)
    }

    const handleApplyDiscount = () => {
        applyDiscount(discountCode)
    }

    if (cartItems.length === 0) {
        return (
            <>
                <div className="container text-center mt-5">
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        No tienes productos en tu carrito, pero aquí tenemos algunas opciones
                    </h2>
                    {prod && <Recomendations t={t} data={prodInfo} />}
                </div>
            </>
        )
    }

    return (
        <main className="main">
            <Spiner opt={load} />
            <br />
            <div className="page-content">
                <div className="cart">
                    <div className="container summary">
                        <div className="row">
                            <div className='col-lg-9'>

                                {discountApplied && (
                                    <div className="alert alert-info mt-3">
                                        <strong>¡Descuento Aplicado!</strong> Has utilizado el código de descuento <span style={{ color: 'black' }}>{discountCode}</span>.
                                    </div>
                                )}
                            </div>
                            <div className="col-lg-9">
                                <table className="table table-cart table-mobile">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Cantidad</th>
                                            <th>Subtotal</th>
                                            <th>IVA</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => {
                                            const itemPrice = parseFloat(item.price) || 0
                                            const discountPrice = parseFloat(item.precio_descuento) || itemPrice // Precio con descuento o precio base
                                            const totalDiscountPrice = (discountPrice * item.quantity).toFixed(2)
                                            const iva = (totalDiscountPrice * (parseFloat(item.tarifa) / 100)).toFixed(2) // IVA ajustado al descuento
                                            const totalWithTax = (parseFloat(totalDiscountPrice) + parseFloat(iva)).toFixed(2) // Total con IVA

                                            // Validar si el producto tiene promoción
                                            const hasPromotion =
                                                item.valor_descuento &&
                                                item.tarifa_descuento &&
                                                item.precio_descuento &&
                                                Number(item.valor_descuento) > 0 &&
                                                Number(item.tarifa_descuento) > 0 &&
                                                Number(item.precio_descuento) > 0

                                            return (
                                                <tr key={index}>
                                                    <td className="product-col">
                                                        <div className="product">
                                                            <figure className="product-media">
                                                                <a href="!#">
                                                                    <img src={`${global.IMGProd}${item.imageUrl}`} alt={item.name} />
                                                                </a>
                                                            </figure>
                                                            <h3 className="product-title">
                                                                <a href="!#">{item.name}</a>
                                                            </h3>
                                                        </div>
                                                    </td>
                                                    {/* Mostrar precio tachado solo si hay promoción */}
                                                    <td className="price-col">
                                                        {hasPromotion ? (
                                                            <>
                                                                <span style={{ textDecoration: "line-through", color: "red" }}>
                                                                    ${itemPrice.toFixed(2)}
                                                                </span>
                                                                <br />
                                                                <span>${discountPrice.toFixed(2)}</span>
                                                            </>
                                                        ) : <span>${itemPrice.toFixed(2)}</span>}
                                                    </td>
                                                    {/* Cantidad */}
                                                    <td className="quantity-col">
                                                        <div className="cart-product-quantity">
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                value={item.quantity}
                                                                min="1"
                                                                max="10"
                                                                step="1"
                                                                required
                                                                onChange={(e) =>
                                                                    handleQuantityChange(index, parseInt(e.target.value))
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                    {/* Total descuento (sin IVA) */}
                                                    <td className="total-col">${totalDiscountPrice}</td>
                                                    {/* IVA calculado */}
                                                    <td className="tax-col">${iva}</td>
                                                    {/* Total con IVA */}
                                                    <td className="total-with-tax-col">${totalWithTax}</td>
                                                    {/* Botón de eliminación */}
                                                    <td className="remove-col">
                                                        <button className="btn-remove" onClick={() => handleRemoveItem(index)}>
                                                            <i className="icon-close"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>


                                </table>
                                <div className="cart-bottom">
                                    <div className="cart-discount">
                                        <form action="#">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={discountCode}
                                                    onChange={handleDiscountChange}
                                                    placeholder="coupon code"
                                                />
                                                <div className="input-group-append">
                                                    <button
                                                        className="btn btn-outline-primary-2"
                                                        type="button"
                                                        onClick={handleApplyDiscount}
                                                    >
                                                        <i className="icon-long-arrow-right"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <aside className="col-lg-3">
                                <div className="summary summary-cart">
                                    <h3 className="summary-title">Cart Total</h3>
                                    <table className="table table-summary">
                                        <tbody>
                                            <tr>
                                                <td>Subtotal IVA 15%:</td>
                                                <td>${calculateSubtotals().subtotalIVA15}</td>
                                            </tr>
                                            <tr>
                                                <td>Subtotal IVA 0%:</td>
                                                <td>${calculateSubtotals().subtotalIVA0}</td>
                                            </tr>
                                            <tr>
                                                <td>Total IVA:</td>
                                                <td>${calculateTax()}</td>
                                            </tr>
                                            {/* Título de Shipping */}
                                            <tr className="summary-subtotal">
                                                <td colSpan="2">
                                                    <strong>
                                                        <label>Envío</label>
                                                    </strong>
                                                    {shippings.map((method) => (
                                                        <div className="custom-control custom-radio" key={method.id}>
                                                            <input
                                                                type="radio"
                                                                id={`shipping-${method.id}`}
                                                                name="shipping"
                                                                className="custom-control-input"
                                                                value={method.id}
                                                                onChange={handleShippingChange}
                                                                checked={selectedShipping?.id === method.id}
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor={`shipping-${method.id}`}
                                                            >
                                                                {method.nombre} - ${parseFloat(method.costo).toFixed(2)} ({method.dias} días)
                                                            </label>
                                                        </div>
                                                    ))}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Shipping:</td>
                                                <td>${ship.toFixed(2)}</td>
                                            </tr>
                                            {discountApplied && (
                                                <tr>
                                                    <td>Discount:</td>
                                                    <td>-${discountAmount.toFixed(2)}</td>
                                                </tr>
                                            )}
                                            <tr className="summary-total">
                                                <td>Total:</td>
                                                <td>${calculateTotal()}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {isLoggedIn && (
                                        <button
                                            className="btn btn-outline-primary-2 btn-order btn-block"
                                            disabled={!isLoggedIn} // Deshabilitado si no hay sesión
                                            onClick={() => {
                                                if (isLoggedIn) {
                                                    window.location.href = global.CHECKOUT
                                                }
                                            }}
                                        >
                                            Continuar con el pago

                                        </button>
                                    )}
                                    {!isLoggedIn && (
                                        <p className="text-danger text-center mt-2">
                                            Por favor, inicia sesión para proceder con el pago.
                                        </p>
                                    )}
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

