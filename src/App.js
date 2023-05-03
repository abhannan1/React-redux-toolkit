import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { getCartItems, getTotals } from "./features/cart/cartSlice";
import { Loading, Testing } from "./icons";

function App() {
  const {isOpen} = useSelector((state)=>state.modal)
  const {isLoading, cartItems} = useSelector((state)=>state.cart)
  const dispatch = useDispatch() 

// const clearCart = () =>{
//   dispatch(actions.clearCart())
// }

// useEffect(()=>{
//   const getTotal = () =>{
//     dispatch(getTotals())
//   }
//   getTotal()
// }, [cartItems])
useEffect(()=>{
  dispatch(getCartItems())
},[])

useEffect(()=>{
  dispatch(getTotals())
}, [cartItems])


  if(isLoading){
    return(
      <main>
        <Navbar/>
      <div className="loading">
        <h1>Loading...</h1>
        <div className="loading-icon">
        <Loading/>
        </div>
      </div>
      </main>
    )
  }
  return (
    <main>
      {isOpen &&
      <Modal/>
      }
      <Navbar/>
      <CartContainer/>
    </main>
  )
}
export default App;
