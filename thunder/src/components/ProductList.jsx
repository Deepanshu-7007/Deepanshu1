import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import '../components/styles/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => {
        const matchesSearch = product.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory = category
          ? product.category === category
          : true;
        const matchesPrice =
          product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
      })
    );
  }, [searchTerm, category, priceRange, products]);

  const handleAddToCart = (product) => {
    setAddedProduct(product);
    setIsPopupVisible(true);

    setTimeout(() => {
      setIsPopupVisible(false);
      setAddedProduct(null);
    }, 2000);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-list">
      <div className="filters">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search products"
        />
        <select
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">Fragrances</option>
          <option value="groceries">Groceries</option>
          <option value="furniture">Furniture</option>
        </select>
        <select
          onChange={(e) => setPriceRange(JSON.parse(e.target.value))}
          aria-label="Filter by price range"
        >
          <option value="[0, Infinity]">All Prices</option>
          <option value="[1, 100]">$1-$100</option>
          <option value="[100, 200]">$100-$200</option>
          <option value="[200, 500]">$200-$500</option>
          <option value="[500, 1000]">$500-$1000</option>
          <option value="[1000, 100000]">$1000+</option>
        </select>
      </div>

      {isPopupVisible && addedProduct && (
        <div className="popup">
          <div className="popup-content">
            <p>Added to cart: {addedProduct.title}</p>
          </div>
        </div>
      )}

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart} // Pass the function here
            />
          ))
        ) : (
          <p>No products found matching the criteria.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
