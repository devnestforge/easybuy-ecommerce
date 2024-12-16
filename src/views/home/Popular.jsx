import React from 'react';

export default function Popular() {

    return (
        <>


            <div className="container-fluid">
                <h2 className="title text-center mb-4">Explore Popular Categories</h2>

                <div className="cat-blocks-container">
                    <div className="row">
                        <div className="col-6 col-sm-4 col-lg-2">
                            <a href="category.html" className="cat-block">
                                <figure>
                                    <span>
                                        <img src="assets/images/demos/demo-4/cats/1.png" alt="Category" />
                                    </span>
                                </figure>

                                <h3 className="cat-block-title">Computer & Laptop</h3>
                            </a>
                        </div>

                        <div className="col-6 col-sm-4 col-lg-2">
                            <a href="category.html" className="cat-block">
                                <figure>
                                    <span>
                                        <img src="assets/images/demos/demo-4/cats/2.png" alt="Category" />
                                    </span>
                                </figure>

                                <h3 className="cat-block-title">Digital Cameras</h3>
                            </a>
                        </div>

                        <div className="col-6 col-sm-4 col-lg-2">
                            <a href="category.html" className="cat-block">
                                <figure>
                                    <span>
                                        <img src="assets/images/demos/demo-4/cats/3.png" alt="Category" />
                                    </span>
                                </figure>

                                <h3 className="cat-block-title">Smart Phones</h3>
                            </a>
                        </div>

                        <div className="col-6 col-sm-4 col-lg-2">
                            <a href="category.html" className="cat-block">
                                <figure>
                                    <span>
                                        <img src="assets/images/demos/demo-4/cats/4.png" alt="Category" />
                                    </span>
                                </figure>

                                <h3 className="cat-block-title">Televisions</h3>
                            </a>
                        </div>

                        <div className="col-6 col-sm-4 col-lg-2">
                            <a href="category.html" className="cat-block">
                                <figure>
                                    <span>
                                        <img src="assets/images/demos/demo-4/cats/5.png" alt="Category" />
                                    </span>
                                </figure>

                                <h3 className="cat-block-title">Audio</h3>
                            </a>
                        </div>

                        <div className="col-6 col-sm-4 col-lg-2">
                            <a href="category.html" className="cat-block">
                                <figure>
                                    <span>
                                        <img src="assets/images/demos/demo-4/cats/6.png" alt="Category" />
                                    </span>
                                </figure>

                                <h3 className="cat-block-title">Smart Watches</h3>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}