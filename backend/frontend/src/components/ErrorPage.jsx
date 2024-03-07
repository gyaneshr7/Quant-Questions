import React from 'react'
import { Link } from 'react-router-dom'
import error from '../images/404 page.jpg'

export default function ErrorPage() {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'20px'}}>
      <img style={{height:'600px',width:'1000px',alignItems:'center'}} src={error} alt="" />
      <Link to='/'><button className='add'>Go Home</button></Link>
    </div>
  )
}
