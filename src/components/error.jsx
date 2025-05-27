import React from 'react'

export default function ErrorPage() {
  return (
    <main className="main">
      <div
        className="error-content text-center"
        style={{
          backgroundImage: 'url(../assets/images/backgrounds/error-bg.jpg)',
        }}
      >
        <div className="container">
          <h1 className="error-title">Error 404</h1>
          <p>We are sorry, the page you've requested is not available.</p>
          <a
            href="/home"
            className="btn btn btn-primary btn-minwidth-lg"
          >
            <span>BACK TO HOMEPAGE</span>
            <i className="icon-long-arrow-right"></i>
          </a>
        </div>
      </div>
    </main>
  )
}

