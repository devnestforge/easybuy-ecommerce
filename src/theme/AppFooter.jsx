import React from 'react'
import t from '../translations/i18n'

const AppFooter = () => {
  const currentYear = new Date().getFullYear();
  const copyrightText = `Copyright © ${currentYear} ${t('page_name')}. Todos los derechos reservados.`;
  const termsOfUseText = t('use_term');
  const privacyPolicyText = t('privacy_policy');
  const socialLabel = t('social_icons');

  return (
    <>
      <footer className="footer footer-2">
        <div className="footer-middle">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-lg-4">
                <div className="widget widget-about">
                  <img src="/assets/images/logo.png" className="footer-logo" alt="Footer Logo" width="105" height="25" />
                  <div>
                    {t('about_page')}
                  </div>
                </div>
              </div>

              <div className="col-sm-4 col-lg-2">
                <div className="widget">
                  <h4 className="widget-title">Information</h4>

                  <ul className="widget-list">
                    <li><a href={global.ABOUT}>{t('about_easybuy')}</a></li>
                    <li><a href={global.CONTACT}>{t('contact_easybuy')}</a></li>
                    <li><a href="#signin-modal" data-toggle="modal">{t('login_easybuy')}</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-4 col-lg-2">
                <div className="widget">
                  <h4 className="widget-title">Customer Service</h4>

                  <ul className="widget-list">
                    <li><a href={global.METODOPAGO}>{t('PM_easybuy')}</a></li>
                    <li><a href={global.GRANTIA}>{t('Guarantee_easybuy')}</a></li>
                    <li><a href={global.ENVIO}>{t('Shipping_easybuy')}</a></li>
                    <li><a href={global.TERMINOS}>{t('use_term')}</a></li>
                    <li><a href={global.POLITICA}>{t('privacy_policy')}</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-4 col-lg-2">
                <div className="widget">
                  <h4 className="widget-title">My Account</h4>

                  <ul className="widget-list">
                    <li><a href="#signin-modal" data-toggle="modal">{t('sign_easybuy')}</a></li>
                    <li><a href={global.VIEWCART}>{t('cart_easybuy')}</a></li>
                    <li><a href={global.RASTREAPEDIDOS}>{t('Tmyo_easybuy')}</a></li>
                    <li><a href={global.AYUDA}>{t('Help_easybuy')}</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container-fluid">
            <div className="footer-copyright">{copyrightText}</div>
            <ul className="footer-menu">
              <li><a href="!#">{termsOfUseText}</a></li>
              <li><a href="!#">{privacyPolicyText}</a></li>
            </ul>

            <div className="social-icons social-icons-color">
              <span className="social-label">{socialLabel}</span>
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
