import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increaseQuantity, decreaseQuantity } from '../redux/cartSlice';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const incrementQuantity = () => {
    if (cartItem) {
      dispatch(increaseQuantity({ id: product.id }));
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      dispatch(decreaseQuantity({ id: product.id }));
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-img"
          loading="lazy"
        />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price}</p>
        <p className="product-stock">
          {product.stock > 0 
            ? `Only ${product.stock} item${product.stock > 1 ? 's' : ''} left in stock!`
            : 'Out of stock'}
        </p>
        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="view-details-btn">
            View Details
          </Link>
          <div className="quantity-controls">
            <button
              className="quantity-btn"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="quantity-display">{quantity}</span>
            <button className="quantity-btn" onClick={incrementQuantity}>
              +
            </button>
          </div>
          <button className="add-to-cart-btn" onClick={incrementQuantity}>
            <AddShoppingCartIcon style={{ marginRight: '8px' }} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
