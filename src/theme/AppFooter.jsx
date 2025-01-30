import React from 'react'
import t from '../translations/i18n'

const AppFooter = () => {
  const currentYear = new Date().getFullYear();
  const copyrightText = `Copyright © ${currentYear} ${t('page_name')}. Todos los derechos reservados.`;

  return (
    <>
      <footer className="footer footer-2">
        <div className="footer-middle">
          <div className="container-fluid">
            <div className="row">

              <div className="col-sm-4 col-lg-2">
                <div className="widget">
                  <h4 className="widget-title">{t('about.information')}</h4>

                  <ul className="widget-list">
                    <li><a href={global.ABOUT}>{t('about.about_easybuy')}</a></li>
                    <li><a href={global.CONTACT}>{t('about.contact_easybuy')}</a></li>
                    <li><a href="#signin-modal" data-toggle="modal">{t('auth.login_easybuy')}</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-4 col-lg-2">
                <div className="widget">
                  <h4 className="widget-title">{t('about.Custom_Service')}</h4>

                  <ul className="widget-list">
                    <li><a href={global.METODOPAGO}>{t('shopping.PM_easybuy')}</a></li>
                    <li><a href={global.GRANTIA}>{t('shopping.Guarantee_easybuy')}</a></li>
                    <li><a href={global.ENVIO}>{t('shopping.Shipping_easybuy')}</a></li>
                    <li><a href={global.TERMINOS}>{t('legal.use_term')}</a></li>
                    <li><a href={global.POLITICA}>{t('legal.privacy_policy')}</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-4 col-lg-2">
                <div className="widget">
                  <h4 className="widget-title">{t('about.My_account')}</h4>

                  <ul className="widget-list">
                    <li><a href="#signin-modal" data-toggle="modal">{t('auth.sign_easybuy')}</a></li>
                    <li><a href={global.VIEWCART}>{t('shopping.cart_easybuy')}</a></li>
                    <li><a href={global.RASTREAPEDIDOS}>{t('shopping.Tmyo_easybuy')}</a></li>
                    {/*<li><a href={global.AYUDA}>{t('shopping.Help_easybuy')}</a></li>*/}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container-fluid">
            <div className="footer-copyright">{copyrightText}</div>

            <div className="social-icons social-icons-color">
              <span className="social-label">{t('social.social_icons')}</span>
              <div className="social-icons social-icons-color justify-content-center">
                <a href={t('social.social_face_url')} without rel="noreferrer" className="social-icon social-facebook" title="Facebook" target="_blank"><i className={t('social.social_face')}></i></a>
                <a href={t('social.social_x_url')} without rel="noreferrer" className="social-icon social-twitter" title="Twitter" target="_blank"><i className={t('social.social_x')}></i></a>
                <a href={t('social.social_ins_url')} without rel="noreferrer" className="social-icon social-instagram" title="Instagram" target="_blank"><i className={t('social.social_ins')}></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default AppFooter
