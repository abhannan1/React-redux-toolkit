import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../CartItem'
import cart, { actions, clearCart, getTotals } from '../features/cart/cartSlice'
import { openModal } from '../features/model/modalSlice'

const CartContainer = () => {
  const {cartItems, amount, total} = useSelector((state)=>state.cart)
  const dispatch = useDispatch()



if(amount < 1){
    return(
        <section className='cart'>
            <header>
                <h2>YOUR CART</h2>
                <h4 className='empty-cart'>is currently empty</h4>
            </header>
        </section>
    )
}
  return (
    <section className='cart'>
      <header>
        <h2>YOUR CART</h2>
      </header>
      <div>
        {cartItems.map((item)=>{
           return <CartItem key={item.id} {...item}/>
        })}
      </div>
      <footer>
        <hr/>
        <div className='cart-total'>
            <h4>
                total <span>${total}</span>
            </h4>
        </div>
        <button 
        className='btn clear-btn' 
        onClick={()=>dispatch(openModal())}>
          CLEAR CART
        </button>
        
      </footer>
    </section>
  )
}

export default CartContainer
