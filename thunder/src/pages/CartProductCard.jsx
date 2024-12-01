import React from 'react';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../redux/cartSlice';
import './CartProductCard.css';

const CartProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const incrementQuantity = () => {
    if (product.quantity < product.stock) {
      dispatch(increaseQuantity({ id: product.id }));
    }
  };

  const decrementQuantity = () => {
    if (product.quantity > 1) {
      dispatch(decreaseQuantity({ id: product.id }));
    }
  };

  const removeItem = () => {
    dispatch(removeFromCart({ id: product.id }));
  };

  const productTotal = (product.price * product.quantity).toFixed(2);
  return (
    <div className="cart-product-card">
      <div className="cart-product-image">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="cart-product-thumbnail"
        />
      </div>
      <div className="cart-product-details">
        <h3 className="cart-product-title">{product.title}</h3>
        <p className="cart-product-price">${product.price.toFixed(2)}</p>
        <p className="cart-product-total">
          Total: ${productTotal} 
        </p>
        <p className="cart-product-stock">
          Stock: <span>{product.stock}</span>
        </p>
        <div className="cart-quantity-controls">
          <button
            className="cart-quantity-btn"
            onClick={decrementQuantity}
            disabled={product.quantity <= 1}
          >
            -
          </button>
          <span className="cart-quantity-display">{product.quantity}</span>
          <button
            className="cart-quantity-btn"
            onClick={incrementQuantity}
            disabled={product.quantity >= product.stock}
          >
            +
          </button>
        </div>
        <button className="remove-item-btn" onClick={removeItem}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartProductCard;
