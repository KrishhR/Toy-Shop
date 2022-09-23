import React, { useContext, useEffect } from 'react'
import { Context } from '../App';
import './Checkout.css';
import { Link } from 'react-router-dom';
import products from '../Products.json';

const Checkout = () => {
    const pro = useContext(Context);
    useEffect(()=>{
        pro.setCart([]);
        pro.setCartQuan(0);
        pro.setWishList(0);
        products.forEach((val) => {
            if(val.cart === 1){
                val.cart = 0
            }
        })

    }, [])
  return (
    <div className='checkout'>
    <div className='checkMsg'>
    <span id='checkOutMsg'>Thanks for shopping with us..</span>
    <br /><br />
    <Link to={'/toys'}><button id='landingBtn' style={{marginLeft:'-1vw', backgroundColor:'#89d300d8', border:'2px solid white'}}>Continue Shopping..</button></Link>
    </div>
</div>
  )
}

export default Checkout