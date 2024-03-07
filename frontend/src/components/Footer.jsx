import React from 'react'
import { useLocation } from 'react-router-dom'
function Footer() {
  
  const location = useLocation();
  const loc = window.location.pathname;
  const isQueDetailPage = loc.includes("/quedetail");
  return (
    <div>
        <div className="footer web-footer">
        <div className="all-foots">
        {!isQueDetailPage && <a href="/">&copy;Quant Questions</a>}
          {/* <a href="/">Contact Us</a> */}
          {!isQueDetailPage && <a href="/">Contact Us</a>}
          {!isQueDetailPage && <a href="/">Terms</a>}
          {!isQueDetailPage && <a href="/">Privacy Policy</a>}
          {!isQueDetailPage && <a href="/team">Our Team</a>}
          {!isQueDetailPage && <a href="/faq">FAQs</a>}
        
        </div>
      </div>

      <div className="footer mobile-footer">
        <div className="all-foots">
        {!isQueDetailPage && <a href='/'>Home</a>}
          {!isQueDetailPage && <a href="/">Contact</a>}
          {/* <a href="/">Contact</a> */}
          {!isQueDetailPage && <a href="/">Terms</a>}
          {!isQueDetailPage && <a href="/">Privacy</a>}
          {!isQueDetailPage && <a href="/team">Our Team</a>}
          {!isQueDetailPage && <a href="/faq">FAQs</a>}

          
        </div>
      </div>

    </div>
  )
}

export default Footer
