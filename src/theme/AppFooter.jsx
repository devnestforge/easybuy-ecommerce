import React from 'react'

const AppFooter = () => {

  return (
    <>
      <footer className="footer footer-2">
        <div className="footer-middle">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-lg-4">
                <div className="widget widget-about">
                  <img src="assets/images/logo.png" className="footer-logo" alt="Footer Logo" width="105" height="25"/>
                    <div>Praesent dapibus, neque id cursus ucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. </div>
                </div>
              </div>

              <div className="col-sm-4 col-lg-2">
                <div className="widget">
                  <h4 className="widget-title">Information</h4>

                  <ul className="widget-list">
                    <li><a href="about.html">About Molla</a></li>
                    <li><a href="!#">How to shop on Molla</a></li>
                    <li><a href="faq.html">FAQ</a></li>
                    <li><a href="contact.html">Contact us</a></li>
                    <li><a href="login.html">Log in</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-4 col-lg-2">
                <div className="widget">
                  <h4 className="widget-title">Customer Service</h4>

                  <ul className="widget-list">
                    <li><a href="!#">Payment Methods</a></li>
                    <li><a href="!#">Money-back guarantee!</a></li>
                    <li><a href="!#">Returns</a></li>
                    <li><a href="!#">Shipping</a></li>
                    <li><a href="!#">Terms and conditions</a></li>
                    <li><a href="!#">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-4 col-lg-2">
                <div className="widget">
                  <h4 className="widget-title">My Account</h4>

                  <ul className="widget-list">
                    <li><a href="!#">Sign In</a></li>
                    <li><a href="cart.html">View Cart</a></li>
                    <li><a href="!#">My Wishlist</a></li>
                    <li><a href="!#">Track My Order</a></li>
                    <li><a href="!#">Help</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container-fluid">
            <div className="footer-copyright">Copyright © 2019 Molla Store. All Rights Reserved.</div>
            <ul className="footer-menu">
              <li><a href="!#">Terms Of Use</a></li>
              <li><a href="!#">Privacy Policy</a></li>
            </ul>

            <div className="social-icons social-icons-color">
              <span className="social-label">Social Icons</span>
              <a href="!#" className="social-icon social-facebook" title="Facebook" target="_blank"><i className="icon-facebook-f"></i></a>
              <a href="!#" className="social-icon social-twitter" title="Twitter" target="_blank"><i className="icon-twitter"></i></a>
              <a href="!#" className="social-icon social-instagram" title="Instagram" target="_blank"><i className="icon-instagram"></i></a>
              <a href="!#" className="social-icon social-youtube" title="Youtube" target="_blank"><i className="icon-youtube"></i></a>
              <a href="!#" className="social-icon social-pinterest" title="Pinterest" target="_blank"><i className="icon-pinterest"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default AppFooter
