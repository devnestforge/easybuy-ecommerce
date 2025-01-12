import React, { useState, useEffect } from 'react';

export default function Checkout () {
    const [billingDetails, setBillingDetails] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        country: '',
        streetAddress: '',
        apartment: '',
        city: '',
        state: '',
        postcode: '',
        phone: '',
        email: '',
        orderNotes: '',
    });

    useEffect(() => {
        // Obtener los valores guardados del localStorage si existen
        const storedDetails = JSON.parse(localStorage.getItem('billingDetails'));
        if (storedDetails) {
            setBillingDetails(storedDetails);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Guardar los datos en localStorage
        localStorage.setItem('billingDetails', JSON.stringify(billingDetails));
        // Aquí puedes continuar con el procesamiento de la orden
    };

    return (
        <main className="main">
            <div className="page-header text-center" style={{ backgroundImage: "url('assets/images/page-header-bg.jpg')" }}>
                <div className="container">
                    <h1 className="page-title">Checkout<span>Shop</span></h1>
                </div>
            </div>
            <nav aria-label="breadcrumb" className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="!#">Home</a></li>
                        <li className="breadcrumb-item"><a href="!#">Shop</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="checkout">
                    <div className="container">
                        <div className="checkout-discount">
                            <form action="#">
                                <input type="text" className="form-control" id="checkout-discount-input" />
                                <label htmlFor="checkout-discount-input" className="text-truncate">Have a coupon? <span>Click here to enter your code</span></label>
                            </form>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-9">
                                    <h2 className="checkout-title">Billing Details</h2>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label>First Name *</label>
                                            <input type="text" className="form-control" name="firstName" value={billingDetails.firstName} onChange={handleChange} required />
                                        </div>
                                        <div className="col-sm-6">
                                            <label>Last Name *</label>
                                            <input type="text" className="form-control" name="lastName" value={billingDetails.lastName} onChange={handleChange} required />
                                        </div>
                                    </div>

                                    <label>Company Name (Optional)</label>
                                    <input type="text" className="form-control" name="companyName" value={billingDetails.companyName} onChange={handleChange} />

                                    <label>Country *</label>
                                    <input type="text" className="form-control" name="country" value={billingDetails.country} onChange={handleChange} required />

                                    <label>Street address *</label>
                                    <input type="text" className="form-control" placeholder="House number and Street name" name="streetAddress" value={billingDetails.streetAddress} onChange={handleChange} required />
                                    <input type="text" className="form-control" placeholder="Appartments, suite, unit etc ..." name="apartment" value={billingDetails.apartment} onChange={handleChange} required />

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label>Town / City *</label>
                                            <input type="text" className="form-control" name="city" value={billingDetails.city} onChange={handleChange} required />
                                        </div>
                                        <div className="col-sm-6">
                                            <label>State / County *</label>
                                            <input type="text" className="form-control" name="state" value={billingDetails.state} onChange={handleChange} required />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <label>Postcode / ZIP *</label>
                                            <input type="text" className="form-control" name="postcode" value={billingDetails.postcode} onChange={handleChange} required />
                                        </div>
                                        <div className="col-sm-6">
                                            <label>Phone *</label>
                                            <input type="tel" className="form-control" name="phone" value={billingDetails.phone} onChange={handleChange} required />
                                        </div>
                                    </div>

                                    <label>Email address *</label>
                                    <input type="email" className="form-control" name="email" value={billingDetails.email} onChange={handleChange} required />

                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="checkout-create-acc" />
                                        <label className="custom-control-label" htmlFor="checkout-create-acc">Create an account?</label>
                                    </div>

                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="checkout-diff-address" />
                                        <label className="custom-control-label" htmlFor="checkout-diff-address">Ship to a different address?</label>
                                    </div>

                                    <label>Order notes (optional)</label>
                                    <textarea className="form-control" name="orderNotes" value={billingDetails.orderNotes} onChange={handleChange} cols="30" rows="4" placeholder="Notes about your order, e.g. special notes for delivery"></textarea>
                                </div>
                                <aside className="col-lg-3">
                                    <div className="summary">
                                        <h3 className="summary-title">Your Order</h3>
                                        <table className="table table-summary">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><a href="!#">Beige knitted elastic runner shoes</a></td>
                                                    <td>$84.00</td>
                                                </tr>
                                                <tr>
                                                    <td><a href="!#">Blue utility pinafore denimdress</a></td>
                                                    <td>$76.00</td>
                                                </tr>
                                                <tr className="summary-subtotal">
                                                    <td>Subtotal:</td>
                                                    <td>$160.00</td>
                                                </tr>
                                                <tr>
                                                    <td>Shipping:</td>
                                                    <td>Free shipping</td>
                                                </tr>
                                                <tr className="summary-total">
                                                    <td>Total:</td>
                                                    <td>$160.00</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className="accordion-summary" id="accordion-payment">
                                            <div className="card">
                                                <div className="card-header" id="heading-1">
                                                    <h2 className="card-title">
                                                        <a role="button" data-toggle="collapse" href="#collapse-1" aria-expanded="true" aria-controls="collapse-1">
                                                            Direct bank transfer
                                                        </a>
                                                    </h2>
                                                </div>
                                                <div id="collapse-1" className="collapse show" aria-labelledby="heading-1" data-parent="#accordion-payment">
                                                    <div className="card-body">
                                                        Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card">
                                                <div className="card-header" id="heading-2">
                                                    <h2 className="card-title">
                                                        <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
                                                            Check payments
                                                        </a>
                                                    </h2>
                                                </div>
                                                <div id="collapse-2" className="collapse" aria-labelledby="heading-2" data-parent="#accordion-payment">
                                                    <div className="card-body">
                                                        Ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Add other payment options here */}
                                        </div>

                                        <button type="submit" className="btn btn-outline-primary-2 btn-order btn-block">
                                            <span className="btn-text">Place Order</span>
                                            <span className="btn-hover-text">Proceed to Checkout</span>
                                        </button>
                                    </div>
                                </aside>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
