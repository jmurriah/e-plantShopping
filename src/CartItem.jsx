import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0
    {cart.map(function(item) {
      total = total + item.cost.substring(1) * item.quantity;
    })};
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    console.log("Entering handleContinueShopping in CartItem")
    onContinueShopping();
  };
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    console.log("Entering handleIncrement in CartItem")
    const updatedItem = { ...item };
    updatedItem.quantity++;
    dispatch(updateQuantity(updatedItem));    
  };

  const handleDecrement = (item) => {
    console.log("Entering handleDecrement in CartItem")
    const updatedItem = { ...item };
    updatedItem.quantity--;
    dispatch(updateQuantity(updatedItem));    
  };

  const handleRemove = (item) => {
    console.log("Entering handleRemove in CartItem: ", item.name)
    const updatedItem = { ...item };
    console.log("Item:", updatedItem.name);
    dispatch(removeItem(updatedItem));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (item.cost.substring(1) * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


