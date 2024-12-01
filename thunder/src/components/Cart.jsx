import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import './styles/Cart.css';

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);

  if (items.length === 0)
    return (
      <div className="cart-empty">
        <h2>Your cart is empty!</h2>
        <p>Explore products and add items to your cart.</p>
      </div>
    );

  return (
    <div className="cart">
      <h2>Cart Items</h2>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <div>
              <h3>{item.title}</h3>
              <p>Price: {formatPrice(item.price)}</p>
              <div className="cart-quantity">
                <button
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                  }
                >
                  +
                </button>
              </div>
              <button
                className="cart-remove-btn"
                onClick={() => {
                  if (window.confirm(`Remove ${item.title} from the cart?`)) {
                    dispatch(removeFromCart(item));
                  }
                }}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <h3>Total Price: {formatPrice(totalPrice)}</h3>
      </div>
      <div className="cart-actions">
        <button
          className="checkout-btn"
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
