import React from 'react'

function Footer() {
  return (
    <div>
        <div className="footer web-footer">
        <div className="all-foots">
          <a href="/">&copy;Quant Questions</a>
          <a href="/">Contact Us</a>
          <a href="/">Terms</a>
          <a href="/">Privacy Policy</a>
          <a href="/team">Our Team</a>
          <a href="/faq">FAQs</a>
        </div>
      </div>

      <div className="footer mobile-footer">
        <div className="all-foots">
          <a href='/'>Home</a>
          <a href="/">Contact</a>
          <a href="/">Terms</a>
          <a href="/">Privacy</a>
          <a href="/team">Our Team</a>
          <a href="/faq">FAQs</a>
        </div>
      </div>

    </div>
  )
}

export default Footer
