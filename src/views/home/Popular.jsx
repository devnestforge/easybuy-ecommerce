import React from 'react'

export default function Popular({ t, data }) {

    return (
        <>
            <div className="container-fluid">
                <h2 className="title text-center mb-4">{t('products.category')}</h2>

                <div className="cat-blocks-container">
                    <div className="row">
                        {data.map((item) => (
                            <div key={item.id} className="col-6 col-sm-4 col-lg-3">
                                <a href="category.html" className="cat-block">
                                    <figure>
                                        <span>
                                            <img src={item.img_path} alt={item.nombre} />
                                        </span>
                                    </figure>
                                    <h3 className="cat-block-title">{item.nombre}</h3>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
