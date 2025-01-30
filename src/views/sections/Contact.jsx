import React from 'react';
import t from '../../translations/i18n'

export default function Contact() {

    return (
        <>
            <div className="page-content">
                <div className="container">
                    <br />
                    <div className="touch-container row justify-content-center">
                        <div className="col-md-9 col-lg-7">
                            <div className="text-center">
                                <h2 className="title mb-1">{t('contact.Tittle')}</h2>
                                <p className="mb-3">
                                    {t('contact.Parrafo')}
                                </p>
                            </div>

                            <form action="#" className="contact-form mb-2">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label for="cname" className="sr-only">{t('general.Name')}</label>
                                        <input type="text" className="form-control" id="cname" placeholder={t('general.Name')} required />
                                    </div>
                                    <div className="col-sm-6">
                                        <label for="cphone" className="sr-only">{t('general.Phone')}</label>
                                        <input type="tel" className="form-control" id="cphone" placeholder={t('general.Phone')} />
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="cemail" className="sr-only">{t('general.Email')}</label>
                                        <input type="email" className="form-control" id="cemail" placeholder={t('general.Email')} required />
                                    </div>
                                </div>

                                <label for="csubject" className="sr-only">{t('general.Subject')}</label>
                                <input type="text" className="form-control" id="csubject" placeholder={t('general.Subject')} />

                                <label for="cmessage" className="sr-only">{t('general.Message')}</label>
                                <textarea className="form-control" cols="30" rows="4" id="cmessage" required placeholder={t('general.Message')}></textarea>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-outline-primary-2 btn-minwidth-sm">
                                        <span>{t('general.Submit')}</span>
                                        <i className="icon-long-arrow-right"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="contact-box text-center">
                                <h3>{t('Bussiness.Country_City')}</h3>
                                <address>{t('Bussiness.Direction')}</address>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="contact-box text-center">
                                <h3>{t('Bussiness.Conversation')}</h3>

                                <div><a href="mailto:#">{t('Bussiness.Email')}</a></div>
                                <div><a href="tel:#">{t('Bussiness.Phone')}</a></div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="contact-box text-center">
                                <h3>{t('social.social_icons')}</h3>
                                <div className="social-icons social-icons-color justify-content-center">
                                    <a href={t('social.social_face_url')} without rel="noreferrer" className="social-icon social-facebook" title="Facebook" target="_blank"><i className={t('social.social_face')}></i></a>
                                    <a href={t('social.social_x_url')} without rel="noreferrer" className="social-icon social-twitter" title="Twitter" target="_blank"><i className={t('social.social_x')}></i></a>
                                    <a href={t('social.social_ins_url')} without rel="noreferrer" className="social-icon social-instagram" title="Instagram" target="_blank"><i className={t('social.social_ins')}></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}




